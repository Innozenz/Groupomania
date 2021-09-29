import React from 'react';
import Avatar from "../../images/avatar.png";

const PostForm = () => {
    return (
        <div className="bg-groupomania_dark flex justify-center">
            <div className="w-full md:w-1/3 bg-groupomania_dark px-6 py-4 text-gray-400">
                <div className="border border-groupomania_border p-2 rounded-md flex bg-groupomania_dark-brighter">
                    <div className="rounded-full bg-gray-500 overflow-hidden w-10 h-10">
                        <img className="block" src={Avatar} alt=""/>
                    </div>
                    <form className="flex-grow bg-groupomania_dark-brighter border border-groupomania_border ml-4 mr-2 rounded-md" action="">
                        <input className="bg-groupomania_dark-brightest p-2 px-3 text-sm block w-full rounded-md" placeholder="New post" type="text"/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
