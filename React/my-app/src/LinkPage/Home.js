import React, { useContext, useState } from "react";
import { DisplayContext } from "../Display";
import Login from "./Login";
import { TokenContext, TokenProvider } from "../TokenP.js";
import App from "../App.js";
import { Post } from "../Component/UiComponent/PostComponent.js";
import { sendPost } from "../Class/CompteService.js";
import { getPostCommentary, getPosts } from "../Class/PostService.js";
export default function Home() {
    const [postCommentary,setPostCommentary] = useState(); 
    const [post,setPost] = useState(getPosts((datas)=>handlePostRetrieved(datas)));
    const [postText,setPostText] = useState("");
    const [clickedCommentary,setClickedCommentary] = useState(false);
    console.log(localStorage.getItem("bearerDuration"));
    if(localStorage.getItem("bearer") === null) {
        updateDisplay(<Login/>);
    } else {

    }

    function handleClickPostCommentary(id) {
        getPostCommentary(id,(data)=> {
            setPostCommentary(data);
            setClickedCommentary(true);}
        );
    }
    function handlePostRetrieved(posts) {
        setPost(posts);
    }
    function postText() {
        sendPost(postText,null,null);
    }
    return(
        <>
            Home Accees
            <input type="text" value={postText} onChange={(e)=>setPostText(e.target.value)}placeholder="You can write text to send messages or create post"/>
            <button onClick={postText}>Poster</button>
            {post.map(po=>{
                return ( <><br/><Post text={po.text} id={po.id} commentaryHandler={handleClickPostCommentary} numberOfCommentary={po.numberOfCommentary} /></>);
            } )}
        </>
    );
}