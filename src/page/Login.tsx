import {Grid} from "@material-ui/core";
import {LoginCard} from "../card/LoginCard";

const LoginPage = () => {

    return <div style={{textAlign: "center", height: "100vh"}}>
        <Grid item container alignContent="center" justifyContent="center" style={{height: "100vh"}}>
            <Grid item container alignContent="center" justifyContent="center" style={{width: "461px", margin: 40}}>
                <Grid item>
                    <img style={{
                        height: 50
                    }} src="http://den3.net/wp-content/themes/den3HP/set/image/logo.png"/>
                </Grid>
            </Grid>
            <Grid item>
                <LoginCard/>
            </Grid>
        </Grid>
    </div>
}

export default LoginPage
