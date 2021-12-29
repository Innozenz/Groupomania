import React, {useContext, useState} from 'react';
import axios from "axios";
import ProfileHeader from "./ProfileHeader";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../../helpers/AuthContext";
import {FileUpload} from "@mui/icons-material";

const EditProfile = () => {

    let history = useHistory();
    const [profilePicture, setProfilePicture] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newJob, setNewJob] = useState("");
    const {authState} = useContext(AuthContext);

    const editUser = () => {
        const formData = new FormData();
        formData.append("image", profilePicture);
        formData.append("newFirstName", newFirstName);
        formData.append("newLastName", newLastName);
        formData.append("newJob", newJob);

        axios.put("http://localhost:8080/auth/editUser", formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            }).then(r => {
            if (r.data.error) {
                alert(r.data.error);
            } else {
                alert("Modifications faites avec succès !");
                history.push(`/profile/${authState.userId}`);
            }
        });
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div>
                <ProfileHeader name="Edit Profile"/>
                <div className="flex justify-center w-full">
                    <div>
                        <form action="#" method="POST" encType="multipart/form-data">
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="block text-sm font-medium text-gray-700">Prénom</label>
                                            <input onChange={(event) => {
                                                setNewFirstName(event.target.value)
                                            }} type="text" name="first-name" id="first-name"
                                                   autoComplete="given-name"
                                                   className="h-8 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md">
                                            </input></div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name"
                                                   className="block text-sm font-medium text-gray-700">Nom</label>
                                            <input onChange={(event) => {
                                                setNewLastName(event.target.value)
                                            }} type="text" name="last-name" id="last-name"
                                                   autoComplete="family-name"
                                                   className="h-8 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md">
                                            </input></div>
                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label htmlFor="postal-code"
                                                   className="block text-sm font-medium text-gray-700">Poste</label>
                                            <input onChange={(event) => {
                                                setNewJob(event.target.value)
                                            }} type="text" name="poste" id="poste"
                                                   autoComplete="poste"
                                                   className="h-8 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md">
                                            </input></div>
                                        <input className="hidden"
                                               id="file"
                                               type="file"
                                            // The onChange should trigger updates whenever
                                            // the value changes?
                                            // Try to select a file, then try selecting another one.
                                               onChange={event => {
                                                   setProfilePicture(event.target.files[0])
                                               }}
                                        />
                                        <div className="col-span-6">
                                            <label className="p-2" htmlFor="file">
                                                <FileUpload tabIndex="0" role="button" aria-controls="filename">
                                                    Upload file(s):{" "}
                                                </FileUpload>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button onClick={editUser} type="button"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
