export function ButtonSubmit({text}) {
    return (<input className="button"type="submit" value={text}></input>);
}
export function ButtonReturn({className,text,onClick}) {
    return (
    <div className="addSpaceAround">
        <button className={className} onClick={onClick}>{text}</button>
        </div>);

}
export function BasicButton({className,text,onClick}) {
    return (
        <div className="addSpaceAround">
            <button className={className} onClick={onClick}>{text}</button>
            </div>);
}   