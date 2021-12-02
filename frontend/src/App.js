import Header from './components/partials/Header'
import Main from "./components/utils/Main";
import Footer from "./components/partials/Footer";
import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {
    // const [authState, setAuthState] = useState(false);
    //
    // useEffect(() => {
    //     axios.get("http://localhost:8080/auth/authCheck", {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) => {
    //         if (response.data.error) {
    //             setAuthState(false);
    //         } else {
    //             setAuthState(true);
    //         }
    //     })
    // }, []);

    return (
        <div>
            <Header/>
            <Main />
            <Footer/>
        </div>
    )
        ;
}

export default App;
