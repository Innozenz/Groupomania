import React from 'react';
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <div className="bg-groupomania_dark-brighter flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md">
                <form className="bg-groupomania_dark-brightest shadow-lg rounded px-12 pt-6 pb-8 mb-4">
                    <div className="text-groupomania_text text-2xl flex justify-center border-b-2 py-2 mb-4">
                        Groupomania Login
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-groupomania_text text-sm font-normal mb-2"
                            htmlFor="username"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-groupomania_text leading-tight focus:outline-none focus:shadow-outline"
                            name="email"
                            v-model="form.email"
                            type="email"
                            required
                            autoFocus
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-groupomania_text text-sm font-normal mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-groupomania_text mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            v-model="form.password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="px-4 py-2 rounded text-white inline-block shadow-lg bg-groupomania_dark-brighter focus:bg-blue-700"
                            type="submit">Sign In
                        </button>
                <div className="flex items-center mt-3 justify-center">
                    <Link to="/register">
                        <button className={"justify-center text-groupomania_text hover:underline"}>
                            Register
                        </button>
                    </Link>
                </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
