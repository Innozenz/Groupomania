import React, {useState} from 'react';
import {ArrowCircleRightIcon} from "@heroicons/react/solid";

const CommentsForm = () => {

    return (
        <div className="mt-3 p-3 w-full flex">
            <div className="flex-shrink-0 mr-3">
                <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                     src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                     alt=""/>
            </div>
            <form>
                <textarea name="content" rows="1" className="border p-2 rounded w-full"
                          placeholder="Répondre à..."/>
                <button className="w-14 h-14 p-3 w-full flex justify-end" type="button">
                    <ArrowCircleRightIcon/>
                </button>
            </form>
        </div>
    );
};

export default CommentsForm;
