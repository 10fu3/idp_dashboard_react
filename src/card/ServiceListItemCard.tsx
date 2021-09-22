import React from "react";
import {Card, CardContent, Grid} from "@material-ui/core";

export const ServiceListItemCard: React.FC<{
    onClick: () => void,
    icon: React.ReactNode,
    title: string
}> = (props) => {
    return <Card variant="outlined"
                 style={{
                     width: "270px",
                     height: 200,
                     marginLeft: 10,
                     marginRight: 10,
                     marginTop: 20
                 }}
                 onClick={props.onClick}
    >
        <Grid container justifyContent={"center"}>
            {props.icon}
        </Grid>
        <CardContent>
            <Grid container justifyContent={"center"}>
                {props.title}
            </Grid>
        </CardContent>
    </Card>
}
