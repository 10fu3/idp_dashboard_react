import {HomeCard} from "../card/HomeCard";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import React from "react";

const HomePage = () => {

    return <div>
        <AppBar variant="outlined" style={{backgroundColor: "#ffffff", color: "#000000"}} position="static">
            <Toolbar>
                <Typography variant="h6">
                    電子計算機研究会 アカウントダッシュボード
                </Typography>
            </Toolbar>
        </AppBar>
        <div style={{marginTop: "30px"}}>
            <HomeCard/>
        </div>
    </div>
}

export default HomePage
