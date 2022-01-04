import React from "react"

import { Snackbar, Button, IconButton, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SnackbarForDelete = ({ open, onClose, onClickYes, message }) => {

    return (
        <Snackbar
            sx={{ mt: 9 }}
            open={open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={2000}
            onClose={onClose}
            message={message}
            action={
                <>
                    <Button color="primary" size="small" onClick={onClickYes}>
                        YES
                    </Button>
                    <Button color="primary" size="small" onClick={onClose}>
                        NO
                    </Button>
                </>
            }
        />
    )
}

export default SnackbarForDelete