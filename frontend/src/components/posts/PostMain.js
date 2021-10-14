import React, {useState} from 'react';
import {ThumbUpIcon} from "@heroicons/react/outline";
import {ChatAltIcon} from "@heroicons/react/solid";

const PostMain = () => {
    const [DropCommentVisibility, setDropCommentVisibility] = useState("hidden");

    function toggleCommentDropDown() {
        if (DropCommentVisibility === "hidden") {
            setDropCommentVisibility("block");
        } else {
            setDropCommentVisibility("hidden");
        }
    }

    return (
        <div className="relative flex justify-center bg-groupomania_dark text-groupomania_text">
            <div className="w-full lg:w-1/2 px-6 py-4">
                <div className="border border-black bg-groupomania_dark-brighter rounded-md p-4">
                    <h5 className="text-gray-100 text-sm mb-3 ml-4">Posted by u.test123 5 hours ago</h5>
                    <h2 className="text-xl mb-3">I want to make a complete "note" taking app but i'm still a beginner
                        and only know up to vanilla js. What should I learn so I can make this project?</h2>
                    <div className="text-sm leading-6">
                        <p>Hey guys! I'm a beginner, only started first week of September. For my next project, I'm
                            thinking of making a note taking app but it's sorta like a 'wishlist' for items you wanna
                            buy. I'm planning for it to have the following basic features (will add more once i get the
                            basics down):

                            You can add and delete items

                            You can log in and save your notes (im thinking that means i need to learn some kind of
                            database tech but idk what)

                            Each item-note you can also add an image

                            I can probably work out all of those with just html,css and vanilla JavaScript except the
                            part where users can log in and out. So where do I get started?Hey guys! I'm a beginner,
                            only started first week of September. For my next project, I'm
                            thinking of making a note taking app but it's sorta like a 'wishlist' for items you wanna
                            buy. I'm planning for it to have the following basic features (will add more once i get the
                            basics down):

                            You can add and delete items

                            You can log in and save your notes (im thinking that means i need to learn some kind of
                            database tech but idk what)

                            Each item-note you can also add an image

                            I can probably work out all of those with just html,css and vanilla JavaScript except the
                            part where users can log in and out. So where do I get started?Hey guys! I'm a beginner,
                            only started first week of September. For my next project, I'm
                            thinking of making a note taking app but it's sorta like a 'wishlist' for items you wanna
                            buy. I'm planning for it to have the following basic features (will add more once i get the
                            basics down):

                            You can add and delete items

                            You can log in and save your notes (im thinking that means i need to learn some kind of
                            database tech but idk what)

                            Each item-note you can also add an image

                            I can probably work out all of those with just html,css and vanilla JavaScript except the
                            part where users can log in and out. So where do I get started?</p>
                    </div>
                </div>
                <div
                    className="relative bottom-1 flex flex-wrap justify-around items-center rounded-b-2xl bg-white shadow-md text-gray-800 border-t">
                    <div className="w-1/2 inputIcon rounded-none rounded-bl-2xl">
                        <ThumbUpIcon className="h-4"/>
                        <p className="text-xs sm:text-base">Like</p>
                    </div>

                    <div className="w-1/2 inputIcon rounded-none rounded-br-2xl"
                         onClick={() => toggleCommentDropDown()}>
                        <ChatAltIcon className="h-4"/>
                        <p className="text-xs sm:text-base">Comment</p>
                    </div>
                    <div
                        className={"w-full rounded-none rounded-b-2xl bg-white shadow-md text-gray-800 " + DropCommentVisibility}>
                        <hr/>
                        <div className="mt-3 p-3 w-full flex">
                            <div className="flex-shrink-0 mr-3">
                                <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                                     src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                                     alt="" />
                            </div>
                            <textarea rows="1" className="border p-2 rounded w-full"
    placeholder="Write something..."/>
                        </div>
                        <div className="mx-auto w-full p-3">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments</h3>

                            <div className="space-y-4 mb-4">

                                <div className="flex">
                                    <div className="flex-shrink-0 mr-3">
                                        <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                                             src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                                             alt="" />
                                    </div>
                                    <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                        <strong>Nom de l'utilisateur</strong> <span className="text-xs text-gray-400">3:34 PM</span>
                                        <p className="text-sm">
                                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                                            sed diam nonumy eirmod tempor invidunt ut labore et dolore
                                            magna aliquyam erat, sed diam voluptua.
                                        </p>
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

export default PostMain;
