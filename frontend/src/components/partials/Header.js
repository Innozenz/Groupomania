import React from "react";
import Icon from "../../images/icon-left-font-monochrome-black.png";
import {
    BellIcon,
    ChatIcon,
    ChevronDownIcon,
    HomeIcon,
    LoginIcon,
    PlusIcon,
    SearchIcon,
    UserIcon
} from '@heroicons/react/solid';
import {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";

function Header() {

    return (
        <div>
            <header className="w-full bg-groupomania_dark p-2">
                <div className="relative flex items-center content-around justify-between">
                    <Link to="/">
                    <img className="w-auto h-11" src={Icon} alt=""/>
                    </Link>
                    <Link to="/profile">
                    <button className="rounded-md flex ml-4 border border-black">
                        <UserIcon className="w-6 h-6 text-black m-1"/>
                        <button className="block flex w-50 py-2 px-3 text-sm">
                                Mon profile
                        </button>
                    </button>
                    </Link>
                    <div
                        className="absolute right-0 top-10 bg-groupomania_dark border border-gray-700 z-10 rounded-md text-groupomania_text overflow-hidden">
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
