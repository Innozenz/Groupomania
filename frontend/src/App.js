import Header from './components/partials/Header'
import Main from "./components/utils/Main";
import Footer from "./components/partials/Footer";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "./helpers/AuthContext";
import {Route, useHistory} from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Logs from "./components/utils/Logs";

function App() {
    let history = useHistory();
    const [authState, setAuthState] = useState({username: "", userId: 0, status: false});

    useEffect(() => {
        axios.get("http://localhost:8080/auth/authCheck", {headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            }}).then((response) => {
            if (response.data.error) {
                console.log(response.data.error);
                setAuthState({...authState, status: false});
                localStorage.removeItem("accessToken");
                history.push(`/login`);
            } else {
                setAuthState({
                    username: response.data.username,
                    userId: response.data.userId,
                    status: true
                });
            }
        })
    }, []);

    return (
        <div>
            <AuthContext.Provider value={{authState, setAuthState}}>
                {authState.status && (
                    <>
                        <Header/>
                        <Main/>
                    </>
                )}
                <Logs/>
            </AuthContext.Provider>
            <Footer/>
        </div>
    )
        ;
}

export default App;
