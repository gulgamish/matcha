import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core'

var useStyles = makeStyles({
    content: {
        backgroundColor: '#fafafa',
        padding: '10px 40px 10px 40px'
    },
    actions: {
        backgroundColor: '#fafafa'
    }
})

const Confirm = ({
    title,
    text,
    open,
    setOpen,
    handle
}) => {
    var classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={() => {
                setOpen(false);
            }}
        >
            <DialogTitle>
                <span>{title}</span>
            </DialogTitle>
            <DialogContent
                className={classes.content}
            >
                <p>
                    {text}
                </p>
            </DialogContent>
            <DialogActions
                className={classes.actions}
            >
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handle}
                >
                    Confirm
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Confirm;