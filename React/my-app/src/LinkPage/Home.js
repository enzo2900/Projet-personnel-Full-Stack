import React, { useContext, useState } from "react";
import { DisplayContext } from "../Display";
import Login from "./Login";
import { TokenContext, TokenProvider } from "../TokenP.js";
import App from "../App.js";
import { Post } from "../Component/UiComponent/PostComponent.js";
import { sendPost, verifyToken } from "../Class/CompteService.js";
import { getPostCommentary, getPosts } from "../Class/PostService.js";
import { Token } from "../Class/Token.ts";
import { BasicPopup } from "../Component/PopUp.js";
import { InputText } from "../Component/UiComponent/CenteredForm.js";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [postCommentary,setPostCommentary] = useState(); 
    const [post,setPost] = useState([]);
    const [postText,setPostText] = useState("");
    const [clickedCommentary,setClickedCommentary] = useState(false);
    const {updateDisplay,updateSubDisplay} = useContext(DisplayContext);
    const [postRetrieved,setPostRetrieved] = useState(false);
    const navigate = useNavigate();
    
    console.log(localStorage.getItem("bearerDuration"));
    
    if(!postRetrieved) {
        getPosts((datas)=>handlePostRetrieved(datas));
        setPostRetrieved(true);
    }
    console.log(localStorage.getItem("bearerDuration"))
    if(localStorage.getItem("bearer") === null) {
        navigate("/");
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
        if(postText !== "" ){
            sendPost(postText,(data) => getPosts((datas)=>handlePostRetrieved(datas)),(error) => {});
        } else {
            
            updateSubDisplay(<BasicPopup text="Veuillez écrire un post"/>)
        }
       
    }

    return(
        <div className="center">
            <button className="toTheLeft"onClick={() => {
                localStorage.removeItem("bearer")
                Token.getSingleton().setDuration(-1);
                setPostRetrieved(false)}} >Deconnexion</button>
            <div>
                <InputText value={postText} onChange={(e)=>setPostText(e.target.value)} placeholder="You can write text to send messages or create post"/>
                
                <button onClick={sendPostText}>Poster</button>
            </div>
            <br></br>
                {post.map((m)=> {
                    console.log(m);
                    return (<><Post post={m} user={m.idUser} commentaryHandler={handleClickPostCommentary}/><br></br></>);

                })}
            
            
        </div>
    );
}