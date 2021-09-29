import {Failure, Result, Success} from "./Result";
import {API_HOST} from "./config";
import {JsonAdminService, JsonLinkedService, JsonService} from "./Service";

export type LoginResult = JsonSuccessLoginResult | JsonFailedLoginResult

type JsonUser = {
    nick: string
    icon: string
    mail: string
};

type JsonSuccessLoginResult = {
    authorization: string
}

type JsonFailedLoginResult = {
    message: string
}

export class Auth {

    public static getAuthHeader(): Result<Headers, Error> {
        let token_header = new Headers();

        if (!window.localStorage.getItem('authorization')) {
            return new Failure<Headers, Error>(new Error("ログインしていません"));
        }

        token_header.set('authorization', window.localStorage.getItem('authorization') ?? "");
        return new Success<Headers, Error>(token_header)
    }

    public static async isLoggedIn(): Promise<boolean> {
        let token_header = Auth.getAuthHeader();

        if (token_header.type === 'failure') {
            return false
        }

        let tokenResponse = await fetch(API_HOST + '/api/v1/account/token', {
            method: `get`,
            headers: token_header.value
        });

        return tokenResponse.ok;

    }

    public static async getLinkedService(): Promise<Result<JsonLinkedService[], Error>> {
        let token_header = Auth.getAuthHeader();

        if (token_header.type === 'failure') {
            return new Failure<JsonLinkedService[], Error>(new Error("ログインしていません"));
        }

        let linkedJSONResponse = await fetch(API_HOST + '/oauth2/v1/token/', {
            method: `get`,
            headers: token_header.value
        });

        if (linkedJSONResponse.status === 200) {
            let linkedJSON: Promise<JsonLinkedService[]> = linkedJSONResponse.json();
            let linkedService = await linkedJSON;
            return new Success<JsonLinkedService[], Error>(linkedService);
        } else {
            return new Failure<JsonLinkedService[], Error>(new Error("エラーが発生しました"));
        }
    }

    public static async getProfile(): Promise<Result<Profile, Error>> {

        let token_header = Auth.getAuthHeader();

        if (token_header.type === 'failure') {
            return new Failure<Profile, Error>(new Error("ログインしていません"));
        }

        let tokenResponse = await fetch(API_HOST + '/api/v1/account', {
            method: `get`,
            headers: token_header.value
        });

        switch (tokenResponse.status) {
            case 401:
                return new Failure<Profile, Error>(new Error("トークンの有効期限を過ぎました"));
            case 404:
                return new Failure<Profile, Error>(new Error("アカウントが存在しません"))
        }

        const toJson = (): Promise<JsonUser> => tokenResponse.json();
        const json = await toJson();
        const profile = new Profile();

        profile.avatar = json.icon;
        profile.name = json.nick;
        profile.mail = json.mail

        return new Success<Profile, Error>(profile);
    }

    public static async uploadPicture(file:File):Promise<Result<string, Error>>{

        const createPictureForm = (file: File) => {
            const formData = new FormData();
            formData.append("file", file);

            const param: RequestInit = {
                method: "post",
                body: formData
            }
            return param
        }

        const res = await fetch(API_HOST + "/api/v1/img", createPictureForm(file));
        if (res.status !== 200) {
            return new Failure(new Error("エラーが発生しました"))
        }
        const _picLink: Promise<{ url: string }> = res.json()
        const picLink = await _picLink
        return new Success(picLink.url)
    }

    public static async updateAccount(data:any):Promise<boolean>{

        const token_header = Auth.getAuthHeader()

        if(token_header.type === "failure"){
            return false
        }

        const result = await fetch(API_HOST+"/api/v1/account/",{
            method:'put',
            mode: 'cors',
            headers: token_header.value,
            body: JSON.stringify(data)
        })

        return result.status === 200
    }

    public static async login(mail: string, pass: string): Promise<string | null> {
        const result = await fetch(API_HOST + "/api/v1/account/login", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({
                mail: mail,
                pass: pass
            })
        })

        if (result.status === 200) {
            const tokenPromise: Promise<JsonSuccessLoginResult> = result.json();
            const token = await tokenPromise;
            return token.authorization;
        }
        return null;

    }

    public static save(session: string) {
        window.localStorage.setItem("authorization", session);
    }
}

export class OAuth{
    public static async getClients(): Promise<Result<JsonService[], Error>> {
        let token_header = Auth.getAuthHeader();

        if (token_header.type === 'failure') {
            return new Failure<JsonService[], Error>(new Error("ログインしていません"));
        }

        let linkedJSONResponse = await fetch(API_HOST + '/api/v1/service/', {
            method: `get`,
            headers: token_header.value
        });

        if (linkedJSONResponse.status === 200) {
            let linkedJSON: Promise<JsonService[]> = linkedJSONResponse.json();
            let linkedService = await linkedJSON;
            return new Success<JsonService[], Error>(linkedService);
        } else {
            return new Failure<JsonService[], Error>(new Error("エラーが発生しました"));
        }
    }

    public static async getClient(id:string): Promise<Result<JsonAdminService, Error>>{
        let token_header = Auth.getAuthHeader();

        if (token_header.type === 'failure') {
            return new Failure<JsonService, Error>(new Error("ログインしていません"));
        }

        const url = new URL(API_HOST + '/api/v1/service');

        url.searchParams.set('id',id);

        let clientSONResponse = await fetch(url.toString(), {
            method: `get`,
            headers: token_header.value
        });

        if (clientSONResponse.status === 200) {
            let linkedJSON: Promise<JsonAdminService> = clientSONResponse.json();
            let linkedService = await linkedJSON;
            return new Success<JsonAdminService, Error>(linkedService);
        } else {
            return new Failure<JsonAdminService, Error>(new Error("エラーが発生しました"));
        }
    }

    public static async createClient(json:any):Promise<boolean>{
        let token_header = Auth.getAuthHeader();

        if (token_header.type === 'failure') {
            return false;
        }

        let result = await fetch(API_HOST + '/api/v1/service/', {
            method: `post`,
            headers: token_header.value,
            body: JSON.stringify(json)
        });

        return result.status === 200;

    }

    public static async getService(id:string):Promise<Result<JsonService,Error>>{
        const result = await fetch(API_HOST+'/api/v1/service/', {
            method: 'get',
            headers: new Headers({
                'client_id': id
            })
        })

        if(result.status !== 200){
            return new Failure(new Error("エラーが発生しました"));
        }

        const service:JsonService = await result.json()
        return new Success(service)
    }
}

export let Account: Profile | null = null;

export class Profile {
    mail: string = "";
    name: string = "";
    avatar: string = "";
}

