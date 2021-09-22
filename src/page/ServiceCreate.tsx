import {Bar} from "../component/Bar";
import {Grid} from "@material-ui/core";
import {ServiceCreateCard} from "../card/ServiceCreateCard";

export const ServiceCreate = () => {
    return <div>
        <Bar/>
        <div style={{marginTop: 30}}/>
        <Grid container justifyContent={"center"} style={{
            padding: 20
        }}>
            <ServiceCreateCard/>
        </Grid>
        <div style={{marginTop: 30}}/>
    </div>
}
