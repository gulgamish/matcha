import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles
} from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles({
    dialog: {
        width: "400px",
    }
})

const Show = ({
    open,
    setOpen,
    title,
    Content,
    Actions
}) => {
    const { dialog } = useStyles();


    return (
        <Dialog
            open={open}
            onClose={() => {
                setOpen(false);
            }}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent className={dialog}>
                {Content}
            </DialogContent>
            <DialogActions>
                {Actions}
            </DialogActions>
        </Dialog>
    )
};

export default Show;