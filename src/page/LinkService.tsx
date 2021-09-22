import {Bar} from "../component/Bar";
import {Card, CardHeader, Grid} from "@material-ui/core";
import {LinkedServiceItemCard} from "../card/LinkedServiceItemCard";
import {Auth} from "../Auth";
import {useEffect, useState} from "react";
import {Result} from "../Result";
import {JsonLinkedService} from "../Service";

export const LinkService = () => {

    // const linkedService = TestLinkedServiceJSON;

    const [linkedServices, setServices] = useState<Result<JsonLinkedService[], Error> | null>(null);

    useEffect(() => {
        const getServices = async () => {
            setServices(await Auth.getLinkedService());
        }
        getServices();
    }, [])

    if (linkedServices == null || linkedServices.type === 'failure') {
        return <div>
            <Bar/>
            <div style={{marginTop: 30}}/>
            <Grid container justify="center">
                <CardHeader style={{textAlign: "center"}} title={"エラーが発生しました"}/>
            </Grid>
        </div>
    }


    return <div>
        <Bar/>
        <div style={{marginTop: 30}}/>
        <Grid container justify="center">
            <Card variant="outlined" style={{
                width: "calc(100% - 90px)",
                maxWidth: "910px",
                padding: "20px"
            }}>

                <CardHeader style={{textAlign: "center"}} title={"連携サービス一覧"}/>

                {
                    linkedServices.value.length === 0 ?  <CardHeader style={{textAlign: "center", color:"#a3a3a3"}} title={"何も登録されていません"}/> : <div/>
                }

                {
                    linkedServices.value.map(i => {
                        return <LinkedServiceItemCard service={i}/>
                    })
                }

            </Card>
        </Grid>
    </div>
}
