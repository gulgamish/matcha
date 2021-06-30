import { Chip } from '@material-ui/core';
import { Clear } from "@material-ui/icons"
import React, { useEffect, useState } from 'react'
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
    const [ isActive, setActive ] = useState(false);

    if (tags === null)
        tags = [];

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
                        label={tag}
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
        </div>
    )
}

export default UserInputTags;