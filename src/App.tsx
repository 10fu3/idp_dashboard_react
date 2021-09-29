import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import HomePage from "./page/Home";
import AuthorizePage from "./page/Authorize";
import LoginPage from "./page/Login";
import {ProfileEditor} from "./page/ProfileEditor";
import {LinkService} from "./page/LinkService";
import {ServiceList} from "./page/ServiceList";
import {ServiceDetail} from "./page/ServiceDetail";
import {ServiceCreate} from "./page/ServiceCreate";
import {AuthProvider} from "./context/AuthContext";


const App = () => {
    return (
        <div style={{height: "100vh"}}>
            <BrowserRouter>
                <AuthProvider>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/oauth2/v1/authorize" component={AuthorizePage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/profile" component={ProfileEditor}/>
                    <Route path="/link" component={LinkService}/>
                    <Route path="/service" component={ServiceList}/>
                    <Route path="/service_detail/:id" component={ServiceDetail}/>
                    <Route path="/service_create" component={ServiceCreate}/>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}
export default App;
