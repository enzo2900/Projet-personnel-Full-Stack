import React, { useContext, useState } from "react";
import { DisplayContext } from "../Display";
import Login from "./Login";
import { TokenContext, TokenProvider } from "../TokenP.js";
import App from "../App.js";
import { Post } from "../Component/UiComponent/PostComponent.js";
import { sendPost, verifyToken } from "../Class/CompteService.js";
import { getPostCommentary, getPosts } from "../Class/PostService.js";
import { Token } from "../Class/Token.ts";


export default function Home() {
    const [postCommentary,setPostCommentary] = useState(); 
    const [post,setPost] = useState([]);
    const [postText,setPostText] = useState("");
    const [clickedCommentary,setClickedCommentary] = useState(false);
    const updateDisplay = useContext(DisplayContext);
    const [postRetrieved,setPostRetrieved] = useState(false);
    const end = Token.getSingleton().beginTimer(()=> {
        updateDisplay(<Login/>);
    });
    console.log(localStorage.getItem("bearerDuration"));
    
    if(!postRetrieved) {
        getPosts((datas)=>handlePostRetrieved(datas));
        setPostRetrieved(true);
    }
    console.log(localStorage.getItem("bearerDuration"))
    if(localStorage.getItem("bearer") === null) {
        updateDisplay(<Login/>);
    } else {

    }
    console.log(post);
   // getPosts((datas)=>handlePostRetrieved(datas))

    function handleClickPostCommentary(id) {
        getPostCommentary(id,(data)=> {
            setPostCommentary(data);
            setClickedCommentary(true);}
        );
    }
    function handlePostRetrieved(posts) {
        console.log(posts);
        if(posts === undefined) {
            setPost([]);
        } else {
            
        setPost(posts);
        console.log(post);
        }
       
    }
    function sendPostText() {
        sendPost(postText,(data) => getPosts((datas)=>handlePostRetrieved(datas)),(error) => {});
    }

    return(
        <>
            <button onClick={() => {
                localStorage.removeItem("bearer")
                Token.getSingleton().setDuration(-1);
                setPostRetrieved(false)}} >Deconnexion</button>
            Home Access
            <input type="text" value={postText} onChange={(e)=>setPostText(e.target.value)}placeholder="You can write text to send messages or create post"/>
            <button onClick={sendPostText}>Poster</button>
            {post.map((m)=> {
                console.log(m);
                return (<Post post={m} user={m.idUser} commentaryHandler={handleClickPostCommentary}/>);

            })}
            
        </>
    );
}