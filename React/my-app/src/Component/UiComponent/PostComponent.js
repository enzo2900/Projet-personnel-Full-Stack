export function Post({post,commentaryHandler,user}) {
    const date = ((""+post.dateCreation).split("T",2)[1].split(".",1));

    return (
        <div className="commentary">
            <div className="col-12 commentaryHeader">
                <p><span style={{fontSize:'10px',textAlign:"right"}}>{date }</span> {user.username}</p>
                </div>
            <div className="col-12 commentaryText">
                {post.mainUserCommentary} 
            </div>
            <div className="col-12 commentaryButton">
                {post.numberOfCommentary} <button className="little" onClick={commentaryHandler}>Commentaires</button> 
            </div>
        </div>
    );
}