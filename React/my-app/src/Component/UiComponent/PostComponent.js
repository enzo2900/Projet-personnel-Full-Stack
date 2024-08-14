export function Post({post,commentaryHandler,user}) {
    const date = (""+post.dateCreation).substring(5,10)+"  "+((""+post.dateCreation).split("T",2)[1].split(".",1));

    return (
        <div className="commentary">
            <div className="col-12 commentaryHeader ">
                <p className="flex-box">{user.username} <span className="right" style={{fontSize:'10px'}}>{date }</span> </p>
                </div>
            <div className="col-12 commentaryText">
                {post.mainUserCommentary} 
            </div>
            <div className="col-12 commentaryButtonLayout">
                <p>{post.numberOfCommentary} <button className="little commentaryButton" onClick={commentaryHandler}>Commentaires</button></p> 
            </div>
        </div>
    );
}