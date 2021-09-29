import React, {useState} from "react";
import {Box, Button, Card, CardActions, CardHeader, Grid, Modal, Typography} from "@material-ui/core";
import {ServiceIconCreate} from "../component/ServiceIconCreate";
import {ServiceTextCreate} from "../component/ServiceTextCreate";
import {ServicePermission} from "../component/ServicePermission";
import {Auth, OAuth} from "../Auth";
import {useHistory} from "react-router";

export const ServiceCreateCard = () => {
    const [icon, setIcon] = useState<string | null>(null);
    const [uploadedIconURL,setUploadedIconURL] = useState<string|null>(null)
    const [name, setName] = useState<string>("");
    const [redirect, setRedirect] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [openID, setOpenID] = useState<boolean>(false);
    const [profile, setProfile] = useState<boolean>(false);
    const [mail, setMail] = useState<boolean>(false);

    const [resultModal,setOpenResultModal] = useState('');

    const history = useHistory();

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

    const occurredError = ()=>{
        history.push('/service')
    }

    const createHandle = async () => {
        const message = createFilter();
        if (message.length !== 0 || uploadedIconURL == null) {
            alert(message);
            return;
        }

        const iconUrl = uploadedIconURL;

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

        const send = async ()=>{
            const result = await OAuth.createClient(json)
            setOpenResultModal(result ? '成功しました' : 'エラーが発生しました')
        }
        send()
    }

    return <div>
        <Modal
            open={resultModal.length !== 0}
            onClose={occurredError}
        >
            <Grid container justifyContent={"center"} style={{marginTop:100}}>
                <Card style={{width:400,padding:30}}>
                    <Typography variant="h6" component="h2">
                        {resultModal}
                    </Typography>
                    <CardActions>
                        <Button onClick={occurredError} style={{
                            color: "#ff0000",
                            marginLeft:"auto",
                            borderColor: "#ff0000",
                            width: "90px"
                        }} variant="outlined">
                            閉じる
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Modal>
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
