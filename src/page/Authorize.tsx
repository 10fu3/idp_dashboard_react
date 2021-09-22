import {GetQueryParams} from "../URLQuery";
import {AuthorizeCard} from "../card/AuthorizeCard";
import {JsonService} from "../Service";
import {Grid} from "@material-ui/core";

const AuthorizePage = () => {

    const a = GetQueryParams(decodeURI(window.location.search))

    const sample: JsonService = {
        service_id: '8e58cc02-9fbf-4763-82bd-4ea6829246e5',
        service_name: 'テスト',
        icon_url: 'https://www.pikpng.com/pngl/m/430-4307964_docker-and-kubernetes-logos-point-of-sales-icon.png',
        description: '仮の説明です',
        permissions: [
            "read_uuid",
            "read_mail",
            "read_profile"
        ]
    }

    const sampleAuth = "http://localhost:3000/oauth2/v1/authorize?response_type=code&client_id=1234567890&redirect_uri=https://example.com/auth&state=12345abcde&scope=profile openid&nonce=09876xyz";

    // window.location.href = "/login"+"?redirect="+encodeURI(window.location.href);

    return <div>
        <Grid container justifyContent="center">
            <AuthorizeCard service={sample}/>
        </Grid>
    </div>
}

export default AuthorizePage
