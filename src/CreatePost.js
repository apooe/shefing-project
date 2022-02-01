import * as React from "react";
import { useState} from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";


/**
 * Display a dialog to create a new post
 * @param open - Boolean to handle closing/opening dialog box
 * @param onClose - Function to execute when closing the dialog box
 * @param getNewPost - Get new post title and body of user
 */
export function CreatePostDialog({open, onClose, getNewPost}) {

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const handleSubmit = () => {
        getNewPost(title, body);//add the new post to posts array of selected user
        onClose();
    }

    return (<Dialog open={open} onClose={onClose} maxWidth={"sm"} fullWidth={true}>
        <DialogTitle>Add post</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Add a new post
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                id="titlePost"
                label="Title"
                type="text"
                fullWidth
                variant="outlined"
            />
            <TextField
                sx={{marginTop: "25px"}}
                onChange={(e) => {
                    setBody(e.target.value)
                }}
                id="bodyPost"
                label="Body"
                multiline
                rows={5}
                fullWidth
                placeholder={"Some content"}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>)

}
