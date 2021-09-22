import {Card, CardHeader} from "@material-ui/core";
import {useEffect, useState} from "react";
import {IconEditor} from "../component/IconEditor";
import {TextEditor} from "../component/TextEditor";
import {Auth} from "../Auth";

export const ProfileEditorCard = () => {

    const [icon, setIcon] = useState<string | null>(null);

    const [uploadedIcon,setUploadedIcon] = useState<string | null>(null);

    const [baseIcon, setBaseIcon] = useState<string>('');

    const [name, setName] = useState<string | null>(null);

    const [baseName, setBaseName] = useState<string>('');

    const [pass, setPass] = useState<string | null>(null);

    const [mail, setMail] = useState<string | null>(null);

    const [baseMail, setBaseMail] = useState<string>('');

    useEffect(() => {
        const getProfile = async () => {
            const profile = await Auth.getProfile();
            if (profile.type === "success") {
                setBaseIcon(profile.value.avatar)
                setBaseName(profile.value.name)
                setBaseMail(profile.value.mail)
            }
        }
        getProfile()
    }, []);

    return <div>
        <Card style={{width: 450, marginTop: 30, padding: 20}} variant="outlined">

            <CardHeader style={{textAlign: "center"}} title="プロフィール編集"/>

            <IconEditor title="アイコン" baseIcon={baseIcon} icon={icon} setIcon={setIcon} setUploadedIcon={setUploadedIcon}/>

            <TextEditor id="mail" title={"メールアドレス"} before={baseMail} after={mail} setBody={setMail}/>

            <TextEditor id="name" title={"名前"} before={baseName} after={name} setBody={setName}/>

            <TextEditor id="newpass" title={"パスワード"} before={""} after={pass} setBody={setPass}/>
        </Card>
    </div>
}
