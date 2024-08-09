export function ButtonSubmit({text}) {
    return (<input type="submit" value={text}></input>);
}
export function ButtonReturn({text,onClick}) {
    return (<button onClick={onClick}>{text}</button>);

}   