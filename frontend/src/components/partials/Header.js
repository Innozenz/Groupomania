import React from "react";
import Icon from "../../images/icon-left-font-monochrome-white.png";
import {BellIcon, ChatIcon, ChevronDownIcon, HomeIcon, PlusIcon, SearchIcon} from '@heroicons/react/solid';
import Avatar from "../../images/avatar.png";
import {Link} from "react-router-dom";

function Header() {
    return (
        <div>
            <header className="w-full bg-groupomania_dark p-2">
                <div className="flex items-center content-around justify-between">
                    <img className="w-11 h-11" src={Icon} alt=""/>
                    {/*<form className="bg-groupomania_dark-brighter px-4 flex rounded-md border border-gray-700 h-10 mx-4"*/}
                    {/*      action="">*/}
                    {/*    <SearchIcon className="text-gray-300 h-6 w-6 mt-1"/>*/}
                    {/*    <input type="text"*/}
                    {/*           className="bg-groupomania_dark-brighter text-sm p-1 pl-2 pr-0 block focus:outline-none text-white"*/}
                    {/*           placeholder="Search"/>*/}
                    {/*</form>*/}
                    <div className="flex">
                        <Link to="/">
                            <button className="px-3 py-1"><HomeIcon className="text-white w-6 h-6"/></button>
                        </Link>
                        <button className="px-3 py-1"><ChatIcon className="text-white w-6 h-6"/></button>
                        <button className="px-3 py-1"><BellIcon className="text-white w-6 h-6"/></button>
                        <button className="px-3 py-1"><PlusIcon className="text-white w-6 h-6"/></button>
                    </div>
                    <div>
                        <Link to="/signup">
                            <button className="bg-gray-600 rounded-2xl flex">
                                <div className="w-8 h-8">
                                    <img className="block" src={Avatar} alt=""/>
                                </div>
                                <ChevronDownIcon className="text-gray-500 w-8 h-8"/>
                            </button>
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
