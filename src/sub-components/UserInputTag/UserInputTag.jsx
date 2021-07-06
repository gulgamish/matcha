import { Chip } from '@material-ui/core';
import { Clear } from "@material-ui/icons"
import React, { useEffect, useState } from 'react'
import { v_tag } from '../../validation/userValidations';
import "./style.css"

const UserInputTags = ({
    tags = [],
    setTags,
    onTagDelete,
    onChange = () => {},
    max = -1,
    className = ""
}) => {
    const [ value, setValue ] = useState("");
    const [ error, setError ] = useState(false);

    if (tags === null)
        tags = [];

    useEffect(() => {
        if (!v_tag(value))
            setError(true);
        else
            setError(false);
        if (value === "")
            setError(false);
    }, [value]);

    const onKeyUp = (e) => {
        const tag = value;
        
        if (e.key === "Enter" && !error) {
            if (tags.filter(elem => elem === tag).length == 0 && tag.length != 0) {
                setTags([
                    ...tags,
                    tag
                ]);
                onChange(tag);
            }
            setValue("");
        }
    }

    return (
        <div className={`${className}`}>
            <div
                className="tags-container"
            >
                {tags.map(tag => (
                    <Chip
                        variant="outlined"
                        color="primary"
                        label={`#${tag}`}
                        key={tag}
                        className="tag"
                        onDelete={() => {
                            setTags(
                                tags.filter(value => value != tag)
                            )
                            onTagDelete(tag);
                        }}
                    />
                ))}
                <input
                    className="input-tag"
                    value={value}
                    onChange={(e) => {
                        
                        setValue(e.target.value);
                    }}
                    placeholder="Enter tag"
                    onKeyUp={onKeyUp}
                    disabled={tags.length == max}
                />
            </div>
            {error && (
                <div className="error">
                    <p>tag should contain only alphabets and not exceeds 50 characters</p>
                </div>
            )}
        </div>
    )
}

export default UserInputTags;