import React, {useState, useContext, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../helpers/AuthContext";

const Login = () => {
    const instance = axios.create({
        baseURL: "http://localhost:8080/",
    });

    let history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const {setAuthState} = useContext(AuthContext);

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            history.push(`/`);
        }
    }, []);

    const login = () => {
        const data = {username: username, password: password};
        instance.post("auth/login", data).then((response) => {
            localStorage.setItem("accessToken", response.data);
            // setAuthState(true);
            history.push(`/`);
        }).catch((error) => {
            console.log(error);
        })
    }

    // axios.interceptors.response.use((response) => {
    //     return response;
    // }, async (error) => {
    //     const originalRequest = error.config;
    //     if (error.config.url !== "/refreshToken" && error.response.status === 401 && !originalRequest._retry !== true) {
    //         axios.defaults.headers.common["authorization"] = `Bearer ${refreshToken}`;
    //         console.log("refresh token");
    //         await axios.post("http://localhost:8080//refreshToken")
    //     }
    // })

    return (
        <div className="bg-groupomania_dark-brighter flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md">
                <form className="bg-groupomania_dark-brightest shadow-lg rounded px-12 pt-6 pb-8 mb-4">
                    <div className="text-2xl flex justify-center border-b-2 py-2 mb-4">
                        Groupomania Login
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-normal mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            name="username"
                            v-model="form.username"
                            type="text"
                            required
                            autoFocus
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-sm font-normal mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            v-model="form.password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                            autoComplete="current-password"
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center mt-3 justify-center">
                            <Link to="/register">
                                <button className="justify-center hover:underline font-bold">
                                    Register
                                </button>
                            </Link>
                        </div>
                        <button
                            onClick={login}
                            className="px-4 py-2 rounded text-white inline-block shadow-lg bg-groupomania_dark-brighter focus:bg-blue-700"
                            type="button">Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
