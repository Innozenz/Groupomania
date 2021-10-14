import React, {Component, useEffect, useRef, useState} from 'react';
import {UploadFile} from "@mui/icons-material";

const useForceUpdate = () => useState()[1];

function FileUploadButton() {
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
        const { current } = fileInput;

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
        <div>
            <form onSubmit={onSubmit}>
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
                <label htmlFor="file">
          <UploadFile tabIndex="0" role="button" aria-controls="filename">
            Upload file(s):{" "}
          </UploadFile>
                </label>
                {fileNames()}
            </form>
        </div>
    );
}

export default FileUploadButton;
