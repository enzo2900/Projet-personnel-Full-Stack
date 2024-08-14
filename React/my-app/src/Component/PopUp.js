export function BasicPopup({text,position}){
    return (
        <div className="popup"style={position}>
            {text}
        </div>
    );
} 