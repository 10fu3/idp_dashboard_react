import React, {Dispatch, SetStateAction} from "react";
import {Box, Button, Card, CardContent, Divider, Grid, Switch, Typography} from "@material-ui/core";
import {EmptyCardItem} from "./EmptyCardItem";

export interface PermissionSwitch {
    title: string,
    status: boolean,
    setStatus: Dispatch<SetStateAction<boolean>>,
}

export const ServicePermission: React.FC<{
    switches: PermissionSwitch[],
    onChanged: ((id: number) => void) | null,
    changed: boolean | null,
    onChangeSave: (() => void) | null
}> = (props) => {

    return <EmptyCardItem title={"サービスが求める権限"}>
        <Box mt={2}/>
        <Card variant="outlined">
            {
                props.switches.map((v, i) => {
                    return <Box ml={1}>
                        <Grid container>
                            <Grid item>
                                <Typography variant="h6" color="textSecondary" style={{
                                    marginTop: 20,
                                    marginLeft: 10
                                }}>
                                    {v.title}
                                </Typography>
                            </Grid>
                            <div style={{flexGrow: 1}}/>
                            <Grid item>
                                <CardContent>
                                    <Switch
                                        checked={v.status}
                                        onChange={() => {
                                            v.setStatus(!v.status);
                                            if (props.onChanged != null) {
                                                props.onChanged(i)
                                            }
                                        }}
                                        color="primary"
                                    />
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Box>
                })
            }
            {
                (() => {
                    if (props.changed != null && props.changed) {
                        return <Grid container>
                            <div style={{flexGrow: 1}}/>
                            <Grid item>
                                <CardContent>
                                    <Button style={{color: "#5cad00", borderColor: "#5cad00"}} variant="outlined"
                                            onClick={() => {
                                                if (props.onChangeSave != null) {
                                                    props.onChangeSave()
                                                }
                                            }}>
                                        変更
                                    </Button>
                                </CardContent>
                            </Grid>
                        </Grid>
                    }
                    return <div/>
                })()
            }
        </Card>
    </EmptyCardItem>
}
