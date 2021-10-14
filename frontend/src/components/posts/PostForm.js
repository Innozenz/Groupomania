import React, {useEffect, useRef, useState} from 'react';
import Avatar from "../../images/avatar.png";
import {Check, FileUpload, UploadFile} from "@mui/icons-material";
import {Button} from "@mui/material";

const useForceUpdate = () => useState()[1];

const PostForm = () => {
    const fileInput = useRef(null);
    const forceUpdate = useForceUpdate();

    useEffect(e => {
        window.addEventListener("keyup", clickFileInput);
        return () => window.removeEventListener("keyup", clickFileInput);
    });

    function clickFileInput(e) {
        if (fileInput.current.nextSibling.contains(document.activeElement)) {
            // Bind space to trigger clicking of the button when focused
            if (e.keyCode === 32) {
                fileInput.current.click();
            }
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        const data = new FormData(fileInput.current.files);
    }

    function fileNames() {
        const {current} = fileInput;

        if (current && current.files.length > 0) {
            let messages = [];
            for (let file of current.files) {
                messages = messages.concat(<p key={file.name}>{file.name}</p>);
            }
            return messages;
        }
        return null;
    }

    return (
        <div className="bg-groupomania_dark flex justify-center">
            <div className="w-full lg:w-1/2 bg-groupomania_dark px-6 py-4 text-gray-400">
                <div className="border border-black p-2 rounded-md flex bg-groupomania_dark-brighter">
                    <div className="flex-shrink-0 mr-3">
                        <img className="mt-2 rounded-full w-8 h-8 sm:w-14 sm:h-14"
                             src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                             alt="" />
                    </div>
                    <form onSubmit={onSubmit}
                          className="flex flex-grow border border-gray-300 ml-4 mr-2 rounded-md"
                          action="">
                        <textarea className="bg-gray-300 p-2 px-3 text-sm block w-full rounded-md placeholder-gray-800"
                                  placeholder="New post"/>
                        <input className="hidden"
                               id="file"
                               type="file"
                               ref={fileInput}
                            // The onChange should trigger updates whenever
                            // the value changes?
                            // Try to select a file, then try selecting another one.
                               onChange={forceUpdate}
                               multiple
                        />
                        <div className="flex flex-col items-stretch text-gray-100">
                            <label className="p-2" htmlFor="file">
                                <FileUpload tabIndex="0" role="button" aria-controls="filename">
                                    Upload file(s):{" "}
                                </FileUpload>
                            </label>
                            <label className="p-2">
                                <Check></Check>
                            </label>
                        </div>
                        {fileNames()}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
