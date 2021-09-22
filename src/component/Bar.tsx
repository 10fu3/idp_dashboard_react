import {AppBar, Toolbar, Typography} from "@material-ui/core";
import React from "react";
import {Link} from "react-router-dom";

export const Bar = () => {
    return <AppBar variant="outlined" style={{backgroundColor: "#ffffff", color: "#000000"}} position="static">
        <Toolbar>
            <Typography variant="h6">
                <Link to={'/'} style={{color: "#000000", textDecoration: 'none'}}>電子計算機研究会 アカウントダッシュボード</Link>
            </Typography>
        </Toolbar>
    </AppBar>
}
