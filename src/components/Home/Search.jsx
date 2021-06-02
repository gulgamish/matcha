import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@material-ui/core'
import React from 'react'

const Search = () => {


    return (
        <div>
            <h5>
                Filter By
            </h5>
            <FormControl component="fieldset">
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox />}
                        label="age"
                    />
                    <FormControlLabel
                        control={<Checkbox />}
                        label="location"
                    />
                    <FormControlLabel
                        control={<Checkbox />}
                        label="fame rating"
                    />
                    <FormControlLabel
                        control={<Checkbox />}
                        label="common tags"
                    />
                </FormGroup>
            </FormControl>
        </div>
    )
}

export default Search;