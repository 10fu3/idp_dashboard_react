import React, {useState} from "react";
import {Box, Button, Card, CardHeader, Grid} from "@material-ui/core";
import {ServiceIconCreate} from "../component/ServiceIconCreate";
import {ServiceTextCreate} from "../component/ServiceTextCreate";
import {ServicePermission} from "../component/ServicePermission";

export const ServiceCreateCard = () => {
    const [icon, setIcon] = useState<string | null>(null);
    const [uploadedIconURL,setUploadedIconURL] = useState<string|null>(null)
    const [name, setName] = useState<string>("");
    const [redirect, setRedirect] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [openID, setOpenID] = useState<boolean>(false);
    const [profile, setProfile] = useState<boolean>(false);
    const [mail, setMail] = useState<boolean>(false);

    const permissions = [
        {
            title: 'OpenID',
            status: openID,
            setStatus: setOpenID,
        }, {
            title: 'プロフィール情報',
            status: profile,
            setStatus: setProfile,
        }, {
            title: 'メール',
            status: mail,
            setStatus: setMail,
        }
    ];

    const createFilter = () => {
        if (icon == null) {
            return "アイコンが設定されていません";
        }
        if (name.length === 0) {
            return "クライアント名が設定されていません";
        }
        if (redirect.length === 0) {
            return "リダイレクト先URLが設定されていません";
        }
        if (description.length === 0) {
            return "説明文が設定されていません";
        }
        if (!openID && !profile && !mail) {
            return "要求する権限は最低でも1つは必要です";
        }
        return "";
    }

    const createHandle = () => {
        const message = createFilter();
        if (message.length !== 0) {
            alert(message);
            return;
        }
        const iconUrl = "";
        const permissions: string[] = [];

        if (openID) {
            permissions.push('read_uuid');
        }
        if (profile) {
            permissions.push('read_profile');
        }
        if (mail) {
            permissions.push('read_mail');
        }

        const json = {
            'redirect_url': redirect,
            'service_name': name,
            'icon_url': iconUrl,
            'description': description,
            'permissions': permissions
        }

        console.log(json);
    }

    return <div>
        <Card style={{width: 450, padding: 20}} variant="outlined">

            <CardHeader style={{textAlign: "center"}} title="新規OAuth2クライアント作成"/>

            <ServiceIconCreate icon={icon} setIcon={setIcon} setUploadedIcon={setUploadedIconURL}/>

            <Box mt={3}/>

            <ServiceTextCreate title={"クライアント名"} value={name} setBody={setName}/>
            <ServiceTextCreate title={"リダイレクト先URL"} value={redirect} setBody={setRedirect}/>
            <ServiceTextCreate title={"説明"} value={description} setBody={setDescription}/>

            <ServicePermission switches={permissions} changed={null} onChanged={null} onChangeSave={null}/>

            <Box mt={2}>
                <Grid container>
                    <div style={{flexGrow: 1}}/>
                    <Grid item>
                        <Button style={{color: "#5cad00", borderColor: "#5cad00"}} variant="outlined"
                                onClick={createHandle}>
                            作成
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    </div>
}
