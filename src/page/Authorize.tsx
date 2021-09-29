import {GetQueryParams} from "../URLQuery";
import {AuthorizeCard} from "../card/AuthorizeCard";
import {JsonService} from "../Service";
import {Grid} from "@material-ui/core";
import {useEffect, useState} from "react";
import {OAuth} from "../Auth";

const AuthorizePage = () => {

    const params = GetQueryParams(decodeURI(window.location.search))
    const [service,setService] = useState<JsonService|undefined|null>(null);

    useEffect(()=>{
        const getService = async ()=>{
            const service = await OAuth.getService(params['client_id']);
            if(service.type === 'success'){
                setService(service.value)
                console.log(service.value)
                return
            }else{
                setService(undefined)
            }

        }
        getService()
    },[])

    if(service === undefined){
        window.location.href = "/"
    }

    console.log(service)

    return <div>
        <Grid container justifyContent="center">
            {
                service != null ? <AuthorizeCard service={service}/> : <></>
            }
        </Grid>
    </div>
}

export default AuthorizePage
