import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/home/Home';
import Login from "../pages/Login";
import Profile from "../pages/userprofile/Profile";
import Register from "../pages/Register";
import EditProfile from "../pages/userprofile/EditProfile";

const Main = () => {
    return (
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/' component={Home}/>
            <Route exact path='/signin' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/profile' component={Profile}/>
            <Route exact path='/edit' component={EditProfile}/>
        </Switch>
    );
}

export default Main;