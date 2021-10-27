import React from 'react';
import {Link} from "react-router-dom";
import {PencilIcon} from "@heroicons/react/solid";

const UserProfile = () => {
    return (
        <div className="container mx-auto my-5 p-5 bg">
            <div className="md:flex no-wrap md:-mx-2 flex-col items-center">
                <div
                    className="w-full md:w-9/12 md:mx-2 mb-3 bg-groupomania_dark-brighter border border-black rounded-md">
                    <div className="p-3 border-t-4 border-groupomania_border m-2">
                        <div className="w-full image overflow-hidden flex">
                            <img className="h-auto md:w-1/3"
                                 src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                 alt=""/>
                            <div
                                className="w-full mx-2 h-auto bg-groupomania_dark-brighter border border-black rounded-md">
                                <div className="p-3 shadow-sm rounded-sm">
                                    <div
                                        className="flex items-center flex-row justify-between space-x-2 font-semibold text-groupomania_text leading-8">
                                                <span className="flex items-center border-groupomania_border">
                                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                              stroke-width="2"
                                                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                                    </svg>
                                                                                                <span
                                                                                                    className="ml-2 tracking-wide text-groupomania_text-darker">A Propos</span>
                                                </span>
                                        <Link to="/edit">
                                            <PencilIcon className="w-6 h-6"/>
                                        </Link>
                                    </div>
                                    <div className="text-groupomania_text">
                                        <div className="grid md:grid-cols-1">
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Prénom</div>
                                                <div className="px-4 py-2">Test</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Nom</div>
                                                <div className="px-4 py-2">Test</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Email.</div>
                                                <div className="px-4 py-2">
                                                    <a className="text-blue-800"
                                                       href="mailto:jane@example.com">test@example.com</a>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Date de naissance</div>
                                                <div className="px-4 py-2">Feb 27, 1994</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Poste</div>
                                                <div className="px-4 py-2">Test</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
