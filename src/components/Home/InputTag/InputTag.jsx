import { Chip } from '@material-ui/core';
import { Clear } from "@material-ui/icons"
import React, { useEffect, useState } from 'react'
import "./style.css"

const InputTag = ({
    onChange,
    style
}) => {
    const [ tags, setTags ] = useState([]);
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
            if (tags.filter(elem => elem == tag).length == 0) {
                setTags([
                    ...tags,
                    tag
                ]);
                onChange(tag);
            }
            setValue("");
        }
        if (e.key === "Backspace") {
            const newTags = tags.filter((value, index) => index < tags.length - 1);
            setTags(newTags);
        }
    }

    return (
        <div className="tags-container" style={style}>
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
    )
}

export default InputTag;