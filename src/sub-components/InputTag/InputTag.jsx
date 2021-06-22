import { Chip } from '@material-ui/core';
import { Clear } from "@material-ui/icons"
import React, { useEffect, useState } from 'react'
import "./style.css"

const InputTags = ({
    onChange = () => {},
    max = -1,
    initialTags = []
}) => {
    const [ tags, setTags ] = useState(initialTags);
    const [ value, setValue ] = useState("");
    const [ isActive, setActive ] = useState(false);

    useEffect(() => {
        if (tags.length > 0)
            setActive(true);
        else
            setActive(false);
    }, [tags]);

    const onKeyUp = (e) => {
        const tag = value.slice(0, -1);
        
        if (e.key === " ") {
            if (tags.filter(elem => elem === tag).length == 0 && tag.length != 0) {
                setTags([
                    ...tags,
                    tag
                ]);
                onChange(tag);
            }
            setValue("");
        }
        if (e.key === "Backspace") {
            if (value.length != 0)
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
                        label={tag}
                        key={tag}
                        className="tag"
                        onDelete={() => {
                            setTags(
                                tags.filter(value => value != tag)
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
                    disabled={tags.length == max}
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
        </div>
    )
}

export default InputTags;