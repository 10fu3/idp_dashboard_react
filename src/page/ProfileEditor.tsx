import {Grid} from "@material-ui/core";
import {ProfileEditorCard} from "../card/ProfileEditorCard";
import React from "react";
import {Bar} from "../component/Bar";

export const ProfileEditor = () => {
    return <div>
        <Bar/>
        <Grid container justifyContent="center">
            <ProfileEditorCard/>
        </Grid>
    </div>
}
