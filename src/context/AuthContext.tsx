import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {Auth, Profile} from "../Auth";
import {useHistory} from "react-router";

// Contextの型を用意
interface IAuthContext {
    currentUser: Profile | null | undefined,
    setCurrentUser: Dispatch<SetStateAction<Profile | null | undefined>> | null
}

// Contextを宣言。Contextの中身を {currentUser: undefined} と定義
const AuthContext = createContext<IAuthContext>({
    currentUser: undefined,
    setCurrentUser: null
});

const AuthProvider = (props: any) => {
    // Contextに持たせるcurrentUserは内部的にはuseStateで管理
    const [currentUser, setCurrentUser] = useState<Profile | null | undefined>(undefined);

    const history = useHistory();

    useEffect(() => {
        const getProfile = async () => {
            setCurrentUser(undefined);
            const maybeProfile = await Auth.getProfile();

            if (maybeProfile.type === 'success') {
                setCurrentUser(maybeProfile.value);
            } else {
                setCurrentUser(null);
            }
        }
        getProfile();
    }, []);

    if(currentUser !== null && window.location.toString().includes("login")){
        history.push("/")
    }

    if (currentUser === null && !window.location.toString().includes("login")) {
        if (window.location.search.length === 0) {
            history.push("/login")
        } else {
            history.push("/login?redirect=" + window.location)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser: currentUser,
                setCurrentUser: setCurrentUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};
