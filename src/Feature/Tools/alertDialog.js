import React from 'react'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const AlertDialog = (props) => {
    const { 
        isOpen,
        saveMoveToNext,
        discardMoveToNext,
        onDiscardClick,
        dataDismiss,
        dataTarget,
        dataToggle
        } = props;
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={onDiscardClick}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to keep your changes ?
                    </DialogContentText>
                </DialogContent>
                    <DialogActions className='justify-content-center my-2'>
                        <Button data-dismiss={dataDismiss} data-toggle={dataToggle} data-target={dataTarget} onClick={saveMoveToNext} color="primary" size="small" className="shadow">
                            Yes
                        </Button>
                        <Button data-dismiss={dataDismiss} data-toggle={dataToggle} data-target={dataTarget} onClick={discardMoveToNext} color="primary" size="small" className="shadow">
                            No
                        </Button>
                        <Button onClick={onDiscardClick} color="primary" size="small" className="shadow">
                            Cancel
                        </Button>
                    </DialogActions>
            </Dialog>
        </div>
    )
}

export default AlertDialog