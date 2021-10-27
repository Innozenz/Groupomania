import React, {useState, useEffect} from 'react';
import {ThumbUpIcon} from "@heroicons/react/outline";
import {ArrowCircleRightIcon, ChatAltIcon} from "@heroicons/react/solid";
import PostDataService from "../../../../../services/PostService";


const PostMain = () => {
    const [DropCommentVisibility, setDropCommentVisibility] = useState({});

    function toggleCommentDropDown(index) {
       setDropCommentVisibility({...DropCommentVisibility, [index]:!DropCommentVisibility[index]});
    }

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        retrievePosts();
    }, []);

    const retrievePosts = () => {
        PostDataService.getAll()
            .then(response => {
                setPosts(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="relative flex justify-center items-center bg-groupomania_dark text-groupomania_text flex-col-reverse">
            {posts.map((post, index) => (
            <div className={"w-full lg:w-1/2 px-6 py-4 mb-24"}>
                <div className="border border-black bg-groupomania_dark-brighter rounded-md p-4">
                    <h5 className="text-gray-100 text-sm mb-3 ml-4">Publié par u.test123, il y a 5 heures</h5>
                    <div className="leading-6">
                        <p>{post.content}</p>
                    </div>
                </div>
                <div
                    className="relative bottom-1 flex flex-wrap justify-around items-center rounded-b-2xl bg-white shadow-md text-gray-800 border-t">
                    <div className="w-1/2 inputIcon rounded-none rounded-bl-2xl">
                        <ThumbUpIcon className="h-4"/>
                        <p className="text-xs sm:text-base">Like</p>
                    </div>

                    <div className="w-1/2 inputIcon rounded-none rounded-br-2xl"
                         onClick={() => toggleCommentDropDown(index)} key={index}>
                        <ChatAltIcon className="h-4"/>
                        <p className="text-xs sm:text-base">Commentaires</p>
                    </div>
                    {DropCommentVisibility[index] &&
                    <div
                        className={"w-full rounded-none rounded-b-2xl bg-white shadow-md text-gray-800 "}>
                        <hr/>
                        <form className="mt-3 p-3 w-full flex">
                            <div className="flex-shrink-0 mr-3">
                                <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                                     src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                                     alt=""/>
                            </div>
                            <textarea name="content" rows="1" className="border p-2 rounded w-full"
                                      placeholder="Répondre à..."/>
                        </form>
                        <button className="w-14 h-14 p-3 w-full flex justify-end" type="button">
                            <ArrowCircleRightIcon/>
                        </button>
                        <div className="mx-auto w-full p-3">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Commentaires</h3>
                            <div className="space-y-4 mb-4">
                                <div className="flex">
                                    <div className="flex-shrink-0 mr-3">
                                        <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                                             src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                                             alt=""/>
                                    </div>
                                    <div
                                        className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                        <strong>Nom de l'utilisateur</strong> <span
                                        className="text-xs text-gray-400">3h34</span>
                                        <p>test</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
                ))}
        </div>
    );
};

export default PostMain;