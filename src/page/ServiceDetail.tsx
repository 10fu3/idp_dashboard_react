import {Bar} from "../component/Bar";
import {Box, Button, Card, CardHeader, Container, Grid, Modal, Typography} from "@material-ui/core";
import {RouteComponentProps} from "react-router";
import React, {useState} from "react";
import {TestServiceJSON} from "../sample/SampleJSON";
import {IconEditor} from "../component/IconEditor";
import {TextEditor} from "../component/TextEditor";
import {ServicePermission} from "../component/ServicePermission";
import {EmptyCardItem} from "../component/EmptyCardItem";

type PageProps = {} & RouteComponentProps<{ id: string }>;

export const ServiceDetail: React.FC<PageProps> = (props) => {

    const list = TestServiceJSON;

    const target = list.filter(i => i.service_id === props.match.params.id)[0];


    const [icon, setIcon] = useState<string | null>(null);
    const [uploadedIcon,setUploadedIcon] = useState<string | null>(null);
    const [name, setName] = useState<string | null>("");
    const [redirect, setRedirect] = useState<string | null>("");
    const [description, setDescription] = useState<string | null>("");
    const [openID, setOpenID] = useState<boolean>(target.permissions.includes("read_uuid"));
    const [profile, setProfile] = useState<boolean>(target.permissions.includes("read_profile"));
    const [mail, setMail] = useState<boolean>(target.permissions.includes("read_mail"));

    const [permissionChanged, setPermissionChanged] = useState(false);

    const [permissionState, setPermissionState] = useState([false, false, false]);

    const [openDeleteModal,setOpenDeleteModal] = useState(false);

    const onChangedSwitch = (id: number) => {
        const state = permissionState;
        state[id] = !state[id];
        for (const i of permissionState) {
            if (i) {
                setPermissionState(state);
                setPermissionChanged(true);
                return
            }
        }
        setPermissionState(state);
        setPermissionChanged(false);
    }

    const permissions = [{
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
    }];

    const updateFilter = () => {
        if (icon == null) {
            return "アイコンが設定されていません";
        }
        if (name == null || name.length === 0) {
            return "クライアント名が設定されていません";
        }
        if (redirect == null || redirect.length === 0) {
            return "リダイレクト先URLが設定されていません";
        }
        if (description == null || description.length === 0) {
            return "説明文が設定されていません";
        }
        if (!openID && !profile && !mail) {
            return "要求する権限は最低でも1つは必要です";
        }
        return "";
    }

    const updateHandle = () => {
        const message = updateFilter();
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

    const closeDeleteModal = ()=>{
        setOpenDeleteModal(false)
    }

    return <div>
        <Bar/>
        <div style={{marginTop: "30px"}}/>
        <Grid container justifyContent={"center"} style={{
            padding: 20
        }}>
            <Card style={{
                width: 450,
                padding: 20
            }} variant="outlined">
                <CardHeader
                    title={target.service_name + "の詳細"}
                    style={{textAlign: "center"}}/>
                <IconEditor
                    title={"アイコン"}
                    baseIcon={target.icon_url}
                    icon={icon}
                    setIcon={setIcon}
                    setUploadedIcon={setUploadedIcon}/>
                <TextEditor
                    id={"name"}
                    title={"プロバイダー名"}
                    before={target.service_name}
                    after={name}
                    setBody={setName}/>
                <TextEditor
                    id={"redirect_url"}
                    title={"リダイレクト先URL"}
                    before={target.redirect_uri}
                    after={redirect}
                    setBody={setRedirect}/>
                <TextEditor
                    id={"description"}
                    title={"説明"}
                    before={target.description}
                    after={description}
                    setBody={setDescription}/>
                <ServicePermission
                    switches={permissions}
                    changed={permissionChanged}
                    onChanged={onChangedSwitch}
                    onChangeSave={() => {
                }}/>

                <div>
                    <Grid container justifyContent="center">
                        <Button onClick={()=>{setOpenDeleteModal(true)}} style={{
                            color: "#ff0000",
                            borderColor: "#ff0000",
                            marginTop: "10px",
                            width: "90px"
                        }} variant="outlined">
                            削除する
                        </Button>
                    </Grid>
                    <Modal
                        open={openDeleteModal}
                        onClose={()=>{setOpenDeleteModal(false)}}
                    >
                        <Grid container justifyContent={"center"} style={{marginTop:100}}>
                            <Card style={{width:400,padding:30}}>
                                <Grid container>
                                    <Grid item>
                                        <Typography variant="h6" component="h2">
                                            本当に削除しますか?
                                        </Typography>
                                    </Grid>
                                    <Grid item style={{marginLeft:"auto",}}>
                                        <Button onClick={()=>{

                                        }} style={{
                                            color: "#ff0000",
                                            borderColor: "#ff0000",
                                            width: "90px"
                                        }} variant="outlined">
                                            削除する
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Modal>
                </div>
            </Card>
        </Grid>
    </div>
}
