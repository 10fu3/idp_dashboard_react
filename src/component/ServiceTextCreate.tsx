import React, {Dispatch, SetStateAction} from "react";
import {CardContent, Divider, Grid, TextField, Typography} from "@material-ui/core";

export const ServiceTextCreate: React.FC<{
    title: string,
    value: string,
    setBody: Dispatch<SetStateAction<string>>
}> = (props) => {
    return <div style={{width: "100%", marginTop: 10}}>
        <Divider style={{width: "100%", marginTop: 10, marginBottom: 10}}/>
        <Typography variant="h6" color="textSecondary" style={{
            marginTop: 20,
            marginLeft: 10
        }}>
            {props.title}
        </Typography>
        <CardContent>
            <Grid container>
                <TextField size={"small"} variant={"outlined"} style={{width: "100%"}} onChange={(e) => {
                    props.setBody(e.target.value)
                }}/>
            </Grid>
        </CardContent>
    </div>
}
