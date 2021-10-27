import React from 'react';
import TableDatePicker from "../../utils/DatePicker";
import FileUploadButton from "../../utils/FileUpload";

const EditProfile = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div>
                <div className="flex justify-center w-full">
                    <div>
                        <form action="#" method="POST">
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="block text-sm font-medium text-gray-700">Prénom</label>
                                            <input type="text" name="first-name" id="first-name"
                                                   autoComplete="given-name"
                                                   className="h-8 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md">
                                            </input> </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name"
                                                   className="block text-sm font-medium text-gray-700">Nom</label>
                                            <input type="text" name="last-name" id="last-name"
                                                   autoComplete="family-name"
                                                   className="h-8 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md">
                                            </input> </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="email-address"
                                                   className="block text-sm font-medium text-gray-700">Adresse email</label>
                                            <input type="text" name="email-address" id="email-address"
                                                   autoComplete="email"
                                                   className="h-8 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}">
                                            </input> </div>

                                        <div className="col-span-6">
                                            <label htmlFor="street-address"
                                                   className="block text-sm font-medium text-gray-700">Date de naissance</label>
                                            <TableDatePicker/>
                                        </div>


                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label htmlFor="postal-code"
                                                   className="block text-sm font-medium text-gray-700">Poste</label>
                                            <input type="text" name="poste" id="poste"
                                                   autoComplete="poste"
                                                   className="h-8 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md">
                                            </input> </div>
                                        <div className="col-span-6">
                                            <label htmlFor="photo-profile"
                                                   className="block text-sm font-medium text-gray-700">Photo de profil</label>
                                            <FileUploadButton/> </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button type="submit"
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
