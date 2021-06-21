import React from "react"
import { useDropzone } from "react-dropzone"

const Dropzone = ({
    onDrop,
    accept
}) => {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept
    });

    return (
        <div
            {...getRootProps()}
        >
            <input className="dropzone-input" {...getInputProps()} />
            {isDragActive ? (
               <p>Release to drop image here</p> 
            ) : (
                <p>drag or drop some image here, click to select image</p>
            )}
        </div>
    )
}

