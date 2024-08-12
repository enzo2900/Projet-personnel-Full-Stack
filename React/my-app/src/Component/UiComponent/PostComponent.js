export function Post({post,commentaryHandler,user}) {
    const date = ((""+post.dateCreation).split("T",2)[1].split(".",1));

    return (
        <>
            <div className="col-12 post center">
                {user.username}  {post.mainUserCommentary} {date}
            </div>
            <div className="col-12 post commentaryButton">
                {post.numberOfCommentary} <div onClick={commentaryHandler}>Commentaires</div> 
            </div>
        </>
    );
}