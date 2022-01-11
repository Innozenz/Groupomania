import React, {useContext} from "react";
import Icon from "../../images/icon-left-font-monochrome-black.png";
import {LogoutIcon} from '@heroicons/react/solid';
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../../helpers/AuthContext";

function Header() {
    const {authState, setAuthState} = useContext(AuthContext);
    let history = useHistory();

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({username: "", id: 0, status: false});
        history.push(`/register`);
    }

    const pushToProfile = () => {
        history.push(`/profile/${authState.userId}`);
    }

    return (
        <div>
            <header className="w-full bg-groupomania_dark p-2">
                <div className="relative sm:flex items-center content-around justify-between">
                    <Link to="/">
                        <img className="w-auto h-11" src={Icon} alt=""/>
                    </Link>
                    <div className="flex flex-row mb-6 mt-6">
                        <button className="flex ml-4 items-center rounded-md border border-black" onClick={pushToProfile}>
                            <img className="rounded-full w-6 h-6 sm:w-6 sm:h-6 ml-1"
                                 src={`http://localhost:8080/${authState.image}`} alt=""/>
                            <span className="block flex w-50 py-2 px-2 text-sm">
                                {authState.username}
                            </span>
                        </button>
                        <Link to="/register">
                            <span className="rounded-md flex ml-4 border border-black items-center">
                                <LogoutIcon className="w-6 h-6 text-black m-1"/>
                                <button onClick={logout} className="block flex w-50 py-2 px-2 text-sm">
                                    Déconnexion
                                </button>
                            </span>
                        </Link>
                    </div>
                    <div
                        className="absolute right-0 top-10 bg-groupomania_dark border border-gray-700 z-10 rounded-md text-groupomania_text overflow-hidden">
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
