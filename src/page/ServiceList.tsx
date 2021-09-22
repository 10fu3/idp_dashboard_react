import {Bar} from "../component/Bar";
import {Grid} from "@material-ui/core";
import {ServiceListCard} from "../card/ServiceListCard";

export const ServiceList = () => {
    return <div>
        <Bar/>
        <div style={{marginTop: "30px"}}/>
        <Grid container justifyContent={"center"}>
            <ServiceListCard/>
        </Grid>
    </div>
}
