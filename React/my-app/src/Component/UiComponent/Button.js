export function ButtonSubmit({text}) {
    return (<input type="submit" value={text}></input>);
}
export function ButtonReturn({className,text,onClick}) {
    return (<button className={className} onClick={onClick}>{text}</button>);

}   