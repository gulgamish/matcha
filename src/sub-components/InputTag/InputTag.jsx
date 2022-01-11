import { Chip } from '@material-ui/core';
import { Clear } from "@material-ui/icons"
import React, { useEffect, useState } from 'react'
import { v_tag } from '../../validation/userValidations';
import "./style.css"

const InputTags = ({
    clear = false,
    onChange = () => {},
    max = -1,
    disabled = false,
}) => {
    const [ tags, setTags ] = useState([]);
    const [ value, setValue ] = useState("");
    const [ isActive, setActive ] = useState(false);
    const [ error, setError ] = useState(false);

    useEffect(() => {
        onChange(tags);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ tags.length ])

    useEffect(() => {
        if (clear) {
            setTags([]);
        }
    }, [ clear ])

    useEffect(() => {
        if (tags.length > 0)
            setActive(true);
        else
            setActive(false);
    }, [tags]);

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
            if (tags.filter(elem => elem === tag).length === 0 && tag.length !== 0) {
                setTags([
                    ...tags,
                    tag
                ]);
                //onChange(tag);
            }
            setValue("");
        }
        if (e.key === "Backspace") {
            if (value.length !== 0)
                setValue("");
            else {
                const newTags = tags.filter((value, index) => index < tags.length - 1);
                setTags(newTags);
            }
        }
    }

    return (
        <div className="container">
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
                                tags.filter(value => value !== tag)
                            )
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
                    disabled={tags.length === max || disabled}
                />
                <div
                    className={`clear-tags ${isActive ? "clear-tags-active" : ""}`}
                    onClick={() => {
                        setTags([]);
                    }}    
                >
                    <Clear />
                </div>
            </div>
            {error && (
                <div className="error">
                    <p>tag should contain only alphabets and not exceeds 50 characters</p>
                </div>
            )}
        </div>
    )
}

export default InputTags;