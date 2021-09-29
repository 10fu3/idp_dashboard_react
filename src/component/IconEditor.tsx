import React, {CSSProperties, Dispatch, SetStateAction} from "react";
import {Avatar, Box, Button, Divider, Grid, Typography} from "@material-ui/core";
import {Auth} from "../Auth";

export const IconEditor: React.FC<{
    title: string,
    baseIcon: string,
    icon: string | null,
    setIcon: Dispatch<SetStateAction<string | null>>,setUploadedIcon: Dispatch<SetStateAction<string | null>>  }> = (props) => {

    const completeSelectIconHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files == null) {
            return
        }

        const fr = new FileReader();

        fr.onload = (d) => {

            if (d.target != null && typeof d.target.result === 'string' && e.target.files != null) {
                props.setIcon(d.target.result);
            }
        }

        fr.readAsDataURL(e.target.files[0]);

        const sendPicture = async () => {
            if (e.target.files != null && e.target.files.length > 0) {

                const uploadResult = await Auth.uploadPicture(e.target.files[0])

                if(uploadResult.type === 'failure'){
                    alert(uploadResult.value.message)
                    return
                }
                props.setUploadedIcon(uploadResult.value)
            }
        }

        sendPicture()
    }

    const deleteSelectIconHandle = () => {
        props.setIcon(null);
    }

    return <div style={{width: "100%", marginTop: 10}}>
        <Divider style={{width: "100%", marginTop: 10, marginBottom: 10}}/>
        <Typography variant="h6" color="textSecondary" style={{marginTop: 20, marginLeft: 10}}>
            {props.title}
        </Typography>
        <Box mt={1} ml={2}>
            <Grid container alignItems="center">
                <Grid item>
                    <Grid container alignItems="center">
                        <Avatar style={{width: 100, height: 100}} src={props.baseIcon}/>
                        {
                            props.icon != null ? <img style={{
                                    width: 30,
                                    height: 30,
                                    marginLeft: 10,
                                    marginRight: 10}} src="https://cdn0.iconfinder.com/data/icons/feather/96/591276-arrow-right-512.png"/> : <div/>
                        }
                        {
                            props.icon != null ? <Avatar style={{
                                marginLeft: 10,
                                marginRight: 10,
                                width: 100,
                                height: 100}} src={props.icon}/> : <div/>
                        }
                    </Grid>
                </Grid>

                <div style={{flexGrow: 1}}/>

                <div>
                    <Grid container justifyContent="center">
                        <form>
                            {
                                (() => {
                                    const bStyle: CSSProperties = {
                                        color: "#0068ad",
                                        borderColor: "#0068ad",
                                        marginTop: "10px"
                                    };
                                    if (props.icon != null) {
                                        bStyle.width = 90;
                                    }
                                    return <Button style={bStyle} variant="outlined">
                                        編集
                                        <input type="file" style={{
                                            opacity: 0,
                                            appearance: "none",
                                            position: "absolute",
                                        }} onChange={completeSelectIconHandle}/>
                                    </Button>
                                })()
                            }
                        </form>
                    </Grid>
                    {
                        props.icon != null ?
                            <Grid container justifyContent="center">
                                <Button onClick={deleteSelectIconHandle} style={{
                                    color: "#ff0000",
                                    borderColor: "#ff0000",
                                    marginTop: "10px",
                                    width: "90px"
                                }} variant="outlined">
                                    取り消す
                                </Button>
                            </Grid> : <div/>
                    }
                    {
                        props.icon != null
                            ? <Grid container justifyContent="center">
                                <Button style={{color: "#5cad00", borderColor: "#5cad00", marginTop: "10px", width: "90px"}}
                                        variant="outlined">
                                    変更
                                </Button>
                            </Grid>
                            : <div/>
                    }
                </div>
            </Grid>
        </Box>
    </div>
}
