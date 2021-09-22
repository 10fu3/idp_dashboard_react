import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import {AccountBox, AccountTree, Storage} from "@material-ui/icons";
import {useHistory} from "react-router";

class Display {
    title: string = '';
    description: string = '';
    icon: JSX.Element = <AccountBox/>;
    path: string = ''

    constructor(title: string, description: string, icon: JSX.Element, path: string) {
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.path = path;
    }
}

const displayData = [
    new Display('プロフィールの編集',
        'あなたのプロフィールの表示と編集ができます.',
        <AccountBox style={{color: "#757575", width: 100, height: 100}}/>,
        '/profile'
    ),
    new Display('連携ログインの管理',
        '連携ログインしたサービスの表示と削除ができます.',
        <AccountTree style={{color: "#757575", width: 100, height: 100}}/>,
        '/link'
    ),
    new Display('OAuth2クライアント管理',
        'OAuth2クライアントの管理ができます.',
        <Storage style={{color: "#757575", width: 100, height: 100}}/>,
        '/service'
    )
]

export const HomeCard = () => {

    const history = useHistory();

    return <div>
        <Grid item container justifyContent="center">
            <Card style={{width: "calc(100% - 90px)", maxWidth: "910px", paddingBottom: "20px"}} variant="outlined">
                <Grid item container justifyContent="center">
                    <img style={{maxWidth: "calc(100% - 40px)", margin: 20}}
                         src="http://den3.net/wp-content/themes/den3HP/set/image/logo.png"/>
                </Grid>
                <div style={{marginTop: "50px"}}/>
                <Grid item container justifyContent="center">
                    <Typography style={{margin: 20}} variant="h4" color="textSecondary">
                        ダッシュボードへようこそ
                    </Typography>
                </Grid>
                <Grid item container justifyContent="center">
                    <Typography variant="h6" color="textSecondary">
                        次の操作ができます
                    </Typography>
                </Grid>
                <div style={{marginTop: "50px"}}/>
                <Grid item container justifyContent="center">
                    {
                        displayData.map(i => {
                            return <Grid style={{width: "270px", margin: 10}} onClick={() => {
                                history.push(i.path)
                            }}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography style={{textAlign: "center"}} variant="h6">
                                            {i.title}
                                        </Typography>
                                        <Grid item container justifyContent="center">
                                            {i.icon}
                                        </Grid>
                                        <Grid item container justifyContent="center">
                                            <p style={{textAlign: "center", color: "#757575"}}>
                                                {i.description}
                                            </p>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        })
                    }
                </Grid>
            </Card>
        </Grid>
    </div>
}
