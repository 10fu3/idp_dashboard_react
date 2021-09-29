import {Avatar, Card, CardHeader, Grid} from "@material-ui/core";
import {TestServiceList} from "../sample/SampleJSON";
import {AddCircle} from "@material-ui/icons";
import {useHistory} from "react-router";
import {ServiceListItemCard} from "./ServiceListItemCard";
import {useEffect, useState} from "react";
import {JsonService} from "../Service";
import {OAuth} from "../Auth";


export const ServiceListCard = () => {

    const history = useHistory();

    //const data = TestServiceList;

    const [data,setData] = useState<JsonService[]|null>(null)

    useEffect(()=>{
        const getOAuth2Clients = async()=>{
            const clients = await OAuth.getClients();
            if(clients.type === 'success'){
                setData(clients.value)
            }
        }
        getOAuth2Clients()
    },[])

    const createServiceHandle = () => {
        history.push("/service_create")
    }

    const detailServiceHandle = (serviceID: string) => {
        history.push("/service_detail/" + serviceID)
    }

    const display = [<ServiceListItemCard
        onClick={createServiceHandle}
        icon={<AddCircle style={{marginTop: 30, color: "#707070", width: 100, height: 100}}/>}
        title="新規サービスを追加"
    />];

    if(data){
        data.forEach(e=>display.push(
            <ServiceListItemCard
                onClick={() => {
                    detailServiceHandle(e.service_id)
                }}
                icon={<Avatar
                    src={e.icon_url}
                    style={{marginTop: 30, color: "#707070", width: 100, height: 100}}/>}
                title={e.service_name}/>
        ))
    }

    return <Grid container justify="center">
        <Card variant="outlined" style={{
            width: "calc(100% - 90px)",
            maxWidth: "910px",
            padding: "20px"
        }}>
            <CardHeader title={"サービス一覧"} style={{textAlign: "center"}}/>
            <Grid container justifyContent={"center"}>
                {
                    data != null ? display : <CardHeader style={{textAlign: "center"}} title={"エラーが発生しました"}/>
                }
            </Grid>
        </Card>
    </Grid>
}
