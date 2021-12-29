import Header from './components/partials/Header'
import Main from "./components/utils/Main";
import Footer from "./components/partials/Footer";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "./helpers/AuthContext";
import {useHistory} from "react-router-dom";
import Logs from "./components/utils/Logs";

function App() {
    let history = useHistory();
    const [authState, setAuthState] = useState({email: "", username: "", firstName: "", lastName: "", job: "", userId: 0, status: false, isAdmin: false, image: ""});

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
                    email: response.data.email,
                    username: response.data.username,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    job: response.data.job,
                    userId: response.data.userId,
                    status: true,
                    isAdmin: response.data.isAdmin,
                    image: response.data.image
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
