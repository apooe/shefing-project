import * as React from "react";
import "./UserPosts.css";
import {useEffect, useState} from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import {useSnackbar} from "notistack";
import {CreatePostDialog} from "./CreatePost";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * Display posts of selected user
 */
export default function UserPosts({user}) {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [posts, setPosts] = useState([]); //posts of the selected user
    const {enqueueSnackbar} = useSnackbar(); //Unable to load user's posts case

    /**
     * Get posts of selected user
     */
    useEffect(() => {
        setPosts([]);
        if (!user) { // no user
            return;
        }

        const url = new URL("https://jsonplaceholder.typicode.com/posts");
        url.searchParams.append("userId", user.id);
        //Get all the posts with user Id of the selected user
        fetch(url)
            .then((res) => res.json())
            .then((response) => setPosts(response))
            .catch(() =>
                enqueueSnackbar("Unable to load user's posts !", {variant: "error"})
            );
    }, [user]);

    /**
     * New post to add to posts array of the selected user
     * @param title - Post title
     * @param body - Post body
     */
    const printNewPost = (title, body) => {
        if (title && body) {
            //last id in  posts array
            const lastPostId = posts[posts.length - 1].id;
            //"add" new post in start of the array
            posts.unshift({title, body, id: lastPostId + 1});
        }
    }

    return (
        <div id="postsContainer">
            {user && (
                <div id="drawerTitle">
                    <div>
                        <h1>Posts of {user.name}</h1>
                    </div>
                    <div>
                        <Button onClick={() => setShowAddDialog(true)} variant="contained"
                                startIcon={<AddCircleOutlineIcon/>}>
                            Add
                        </Button>
                    </div>
                </div>
            )}
            {posts?.length ? (
                posts.map((post) => (
                    <div className="postItem" key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                ))
            ) : (
                <div><CircularProgress/>
                </div>
            )}
            <CreatePostDialog open={showAddDialog} getNewPost={(title, body) => {
                printNewPost(title, body)
            }} onClose={() => setShowAddDialog(false)
            }/>
        </div>
    );
}
