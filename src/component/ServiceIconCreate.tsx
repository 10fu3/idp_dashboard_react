import React, {Dispatch, SetStateAction} from "react";
import {Avatar, Button, Divider, Grid, Typography} from "@material-ui/core";
import {API_HOST} from "../config";
import {Auth} from "../Auth";

export const ServiceIconCreate: React.FC<{
    icon: string | null,
    setIcon: Dispatch<SetStateAction<string | null>>,
    setUploadedIcon: Dispatch<SetStateAction<string | null>>
}> = (props) => {

    const completeSelectIconHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files == null) {
            return
        }

        const fr = new FileReader();

        fr.onload = (d) => {

            if (d.target != null && typeof d.target.result === 'string') {
                props.setIcon(d.target.result)
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

    return <div>
        <Divider style={{width: "100%", marginTop: 10, marginBottom: 10}}/>

        <Typography variant="h6" color="textSecondary" style={{
            marginTop: 20,
            marginLeft: 10
        }}>
            アイコン
        </Typography>

        <Grid container justifyContent="center" alignItems="center">
            <Grid item>
                {
                    props.icon != null ?
                        <Avatar style={{width: 100, height: 100, marginRight: 30}} src={props.icon}/> :
                        <div/>
                }
            </Grid>
            <Grid item>
                <div style={{width: 105}}>
                    <form>
                        <Button style={{color: "#0068ad", borderColor: "#0068ad", marginTop: "10px", width: "105px"}}
                                variant="outlined">
                            画像選択
                            <input type="file" style={{
                                opacity: 0,
                                appearance: "none",
                                position: "absolute",
                            }} onChange={completeSelectIconHandle}/>
                        </Button>
                    </form>
                    {
                        props.icon != null
                            ? <Grid container justifyContent="center">
                                <Button onClick={deleteSelectIconHandle} style={{
                                    color: "#ff0000",
                                    borderColor: "#ff0000",
                                    marginTop: "10px",
                                    width: "105px"
                                }} variant="outlined">
                                    取り消す
                                </Button>
                            </Grid>
                            : <div/>
                    }
                </div>
            </Grid>
        </Grid>
    </div>
}
