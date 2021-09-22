import {JsonService} from "../Service";
import {Avatar, Button, Card, CardActionArea, CardContent, Divider, Grid, Typography} from "@material-ui/core";
import {ServicePermsDescription} from "../Entity/PermsDescriptoion";

export type AuthorizeProps = {
    service: JsonService
}

const acceptHandle = () => {
    // console.log("A");
}

const cancelHandle = () => {
    // console.log("B");
}

export const AuthorizeCard: React.FC<AuthorizeProps> = (props) => {

    return <div>
        <Card style={{width: 500, marginTop: 30, paddingBottom: 20}} variant="outlined">
            <Grid container justifyContent="center">
                <img style={{height: 45, marginTop: 40}}
                     src="http://den3.net/wp-content/themes/den3HP/set/image/logo.png"/>
            </Grid>
            <div style={{marginTop: 40}}/>
            <Grid container justifyContent="center">
                <Avatar style={{width: 100, height: 100}} src={props.service.icon_url}/>
                <img style={{width: 30, height: 30, marginTop: 35, marginLeft: 10, marginRight: 10}}
                     src="https://cdn0.iconfinder.com/data/icons/feather/96/591276-arrow-right-512.png"/>
                <Avatar style={{width: 100, height: 100}} src={props.service.icon_url}/>
            </Grid>
            <CardContent>
                <Grid container justifyContent="center">
                    <Grid container item justifyContent="center">
                        <Typography color="textSecondary" variant="h4">
                            {props.service.service_name} が
                        </Typography>
                    </Grid>
                    <Grid container item justifyContent="center">
                        <Typography color="textSecondary" variant="h6">
                            あなたのアカウントへのアクセスを求めています
                        </Typography>
                    </Grid>
                </Grid>
                <Divider style={{width: "100%", height: 1, marginTop: 10, marginBottom: 10}}/>
                <Grid container item justifyContent="center">
                    <Typography color="textSecondary" variant="h6">
                        説明: {props.service.description}
                    </Typography>
                </Grid>
                <Grid container item justifyContent="center" style={{color: "#747474"}}>
                    あなたのアカウントに対して次の権限を要求しています:
                </Grid>
                <div style={{marginTop: 10, marginBottom: 10}}/>
                <Grid container item>
                    <Typography color="inherit" variant="h6">
                        {
                            props.service
                                .permissions
                                .map(p => ServicePermsDescription[p])
                                .map(m => <Grid container item>
                                    + {m}
                                </Grid>)
                        }
                    </Typography>
                </Grid>
                <Divider style={{width: "100%", height: 1, marginTop: 10, marginBottom: 10}}/>
            </CardContent>
            <CardActionArea>
                <Grid container justifyContent="center">
                    <Button
                        onClick={acceptHandle}
                        style={{
                            color: "white",
                            backgroundColor: "#44a713",
                            width: "calc(100% - 30px)"
                        }}>
                        承認する
                    </Button>
                </Grid>
            </CardActionArea>
            <div style={{marginTop: 10, marginBottom: 10}}/>
            <CardActionArea>
                <Grid container justifyContent="center">
                    <Button
                        onClick={cancelHandle}
                        style={{
                            color: "white",
                            backgroundColor: "#4e4e4e",
                            width: "calc(100% - 30px)"
                        }}>
                        キャンセル
                    </Button>
                </Grid>
            </CardActionArea>
        </Card>
    </div>
}
