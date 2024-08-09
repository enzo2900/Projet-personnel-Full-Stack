export function Post({text,numberOfCommentary,id,commentaryHandler}) {
    return (
        <>
            <div className="col-12 post center">
                {text}   
            </div>
            <div className="col-12 post commentaryButton">
                {numberOfCommentary} <div onClick={commentaryHandler}>Commentaires</div> 
            </div>
        </>
    );
}