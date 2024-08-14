import React, { useContext, useEffect, useState } from "react";
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
import { redirect, useNavigate } from "react-router-dom";
import { useTokenExpired } from "../Class/Hooks/useTokenExpired.js";

export default function Home() {
    const [postCommentary,setPostCommentary] = useState([]); 
    const [post,setPost] = useState([]);
    const [postText,setPostText] = useState("");
    const [clickedCommentary,setClickedCommentary] = useState(false);
    const {updateDisplay,updateSubDisplay} = useContext(DisplayContext);
    const [postRetrieved,setPostRetrieved] = useState(false);
    const navigate = useNavigate();
    const [commentaryOpened,setCommentaryOpened] = useState(false);
    const [selectetPost,setSelectedPost] = useState();
    const [commentaryText,setCommentaryText] = useState();
    useEffect(() => {
        if(localStorage.getItem("bearer") === null) {
            navigate("/");
        }
},[]);
    if(!postRetrieved) {
        getPosts((datas)=>handlePostRetrieved(datas));
        setPostRetrieved(true);
    }
    console.log(localStorage.getItem("bearerDuration"))
    if(localStorage.getItem("bearer") === null) {
        redirect("/");
        
        
    } else {

    }
    console.log(post);
   // getPosts((datas)=>handlePostRetrieved(datas))

    function handleClickPostCommentary(id) {
        getPostCommentary(id,(data)=> {
            if(data === undefined) {
                setPostCommentary([]);
            } else {
                setPostCommentary(data);
            }
            setClickedCommentary(true);},(error) =>{
                ;
            }
        );
        setCommentaryOpened(true);

    }
    function sendCommentary(id) {

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
    if(commentaryOpened) {
        return(
            <div className="center">
                <Post post={selectetPost} user={selectetPost.idUser} commentaryHandler={() =>{setSelectedPost();setCommentaryOpened(false);}}/>
                <InputText value={commentaryText} onChange={(e)=>setCommentaryText(e.target.value)} placeholder="You can write text to create a commentary"/>
                
                <button onClick={()=>sendPostText(selectetPost.id)}>Poster</button>
                <div className="flex-box">{
                   
                        postCommentary.map((m)=> {
                        
                            return (<>{m}</>);

                        })
                    
                }
                </div>
            </div>
        );
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
            <div className="flex-box">
                {post.map((m)=> {
                    console.log(m);
                    return (<div className="col-6"><Post post={m} user={m.idUser} commentaryHandler={() =>{handleClickPostCommentary(m.id);setSelectedPost(m);}}/></div>);

                })}
            
            </div>
            
        </div>
        
    );
}