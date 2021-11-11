import React, {useEffect, useRef, useState} from 'react';
import {Check, FileUpload} from "@mui/icons-material";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";

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

    const validationSchema =
        Yup.object().shape({
            content: Yup.string().required()
        })


    const initialValues = {
        content: ""
    }

    const [newPost, setNewPost] = useState("");
    const [posts, setPosts] = useState([]);

    const onSubmit = (data) => {
            axios.post("http://localhost:8080/posts", data).then((response) => {
                setPosts(response.data);
            });
    }

    return (
        <div className="bg-groupomania_dark flex justify-center">
            <div className="w-full lg:w-1/2 bg-groupomania_dark px-6 py-4 text-gray-400">
                <div className="border border-black p-2 rounded-md flex bg-groupomania_dark-brighter">
                    <div className="flex-shrink-0 mr-3">
                        <img className="mt-2 rounded-full w-8 h-8 sm:w-14 sm:h-14"
                             src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                             alt=""/>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form className="flex flex-grow border border-gray-300 ml-4 mr-2 rounded-md">
                            <ErrorMessage name="content" component="span"/>
                            <Field
                                name="content"
                                placeholder="Qu'avez vous en tête?"
                                className="bg-gray-300 p-2 px-3 text-sm block w-full rounded-md placeholder-gray-800 text-gray-800"/>
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
                                <button className="p-2" type="submit">
                                    <Check></Check>
                                </button>
                            </div>
                            {fileNames()}
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
