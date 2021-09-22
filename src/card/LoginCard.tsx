import {Button, Card, CardContent, Grid, TextField, Typography} from "@material-ui/core";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {Auth} from "../Auth";

export const LoginCard: React.FC = () => {

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const [isFailed, setFailed] = useState(false);

    const loginHandle = async (mail: string, password: string) => {

        const session = await Auth.login(mail, password);

        if (session === null) {
            setFailed(true);
        } else {
            Auth.save(session);
            setFailed(false);
            if (window.location.search.includes("redirect")) {
                let perm = window.location.search.slice(1)
                    .split('?redirect=')
                    .filter(e => e.includes("redirect"))
                    [0].replace("redirect=", "");
                window.location.href = decodeURIComponent(perm);
            } else {
                window.location.href = decodeURIComponent("");
            }
        }
    }

    useContext(AuthContext)

    return <div>
        <Card style={{width: 370, padding: 10}} elevation={3}>
            <CardContent>
                <Grid container justifyContent="center">
                    <TextField label="メールアドレス:" onChange={(event) => setMail(event.target.value)} variant="outlined"
                               style={{width: "100%"}}/>
                </Grid>
                {
                    isFailed ? <div>
                        <div style={{marginTop: 20}}/>
                        <p style={{color: "red"}}>入力されたメールアドレスまたはパスワードが間違っています</p>
                    </div> : <div/>
                }
                <div style={{marginTop: 20}}/>
                <Grid container justifyContent="center">
                    <TextField label="パスワード:" onChange={(event) => setPassword(event.target.value)} variant="outlined"
                               type="password" style={{width: "100%"}}/>
                </Grid>
                <div style={{marginTop: 20}}/>
                <Grid container>
                    <Button
                        onClick={() => {
                            loginHandle(mail, password)
                        }}
                        style={{
                            color: "white",
                            backgroundColor: "#007bff",
                            width: "100%"
                        }}>
                        <Typography variant="h6">
                            ログイン
                        </Typography>
                    </Button>
                </Grid>
                <div style={{marginTop: 10}}>
                    <a href="/aa" style={{color: "#007bff", textDecoration: "none"}}>ログインできませんか?</a>
                </div>
            </CardContent>
        </Card>
    </div>
}
