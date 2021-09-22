import {Divider, Typography} from "@material-ui/core";
import React from "react";

export const EmptyCardItem:React.FC<{title:string}> = (props)=>{
    return <div>
        <div style={{width: "100%", marginTop: 10}}>
            <Divider style={{width: "100%", marginTop: 10, marginBottom: 10}}/>
            <Typography variant="h6" color="textSecondary" style={{
                marginTop: 20,
                marginLeft: 10
            }}>
                {props.title}
            </Typography>
            {props.children}
            <div style={{marginTop:20}}/>
        </div>
    </div>
}
