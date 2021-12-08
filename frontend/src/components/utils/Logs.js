import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/userprofile/Profile";
import EditProfile from "../pages/userprofile/EditProfile";
import Post from "../pages/home/feed/posts/Post";

const Logs = () => {
    return (
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
        </Switch>
    );
};

export default Logs;
