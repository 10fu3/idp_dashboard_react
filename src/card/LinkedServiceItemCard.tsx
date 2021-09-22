import React from "react";
import {Avatar, Button, Card, CardContent, CardHeader, Grid, Typography} from "@material-ui/core";
import {ServicePermsDescription} from "../Entity/PermsDescriptoion";
import {JsonLinkedService} from "../Service";

export const LinkedServiceItemCard: React.FC<{ service: JsonLinkedService }> = (props) => {

    const deleteHandle = (id: string) => {
        console.log(id);
    }

    return <Card variant="outlined" style={{margin: 30}}>
        <CardHeader style={{textAlign: "center"}} title={props.service.service_name}/>
        <Grid container alignItems="center">
            <Grid item>
                <CardContent>
                    <Grid container alignItems="center">
                        <Grid item>
                            <Avatar style={{
                                width: 100,
                                height: 100,
                                marginRight: 20
                            }} src={props.service.icon_url}/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                権限
                            </Typography>
                            {
                                props.service.permissions.map(p => {
                                    return <Typography variant="h6">
                                        ･ {ServicePermsDescription[p]}
                                    </Typography>
                                })
                            }
                        </Grid>
                    </Grid>
                </CardContent>
            </Grid>
            <div style={{flexGrow: 1}}/>
            <Grid item style={{margin: 30}}>
                <Button style={{
                    color: "#ffffff",
                    backgroundColor: "#ff3a3a"
                }}
                        onClick={() => {
                            deleteHandle(props.service.service_id)
                        }}
                >
                    停止
                </Button>
            </Grid>
        </Grid>
    </Card>
}
