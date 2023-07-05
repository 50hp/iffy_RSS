import { useDispatch } from "react-redux";
import "../../../terminal.css";
import "./UserSource.css";

function UserSources({item, editToggle}){
    
    const dispatch = useDispatch();
    
    const handleClick = (button) => {
        switch(button) {
        case 'delete':
            dispatch({type:"DELETE_SOURCE", payload: item.rss_id });
            return;
        case 'mute':
            dispatch({type:"MUTE_SOURCE", payload: item });
            return;
        }
    }    
    console.log(item.ismute);
    return(

        <div>
            {item.ismute? (
            <h1 className="mute">{item.source_name}</h1>
            ):(
            <h1>{item.source_name}</h1>
            )} 
            <a href={item.source_url} >{item.source_url}</a>
            {editToggle ? (
                <div> 
                    <button className="btn btn-error btn-ghost" onClick={()=> handleClick('delete')}> Remove Source </button>
                    

                    {item.ismute ? (
                    <button className="btn btn-default btn-ghost" onClick={()=> handleClick('mute')}> Unmute Source </button>
                    ) : (
                    <button className="btn btn-default btn-ghost" onClick={()=> handleClick('mute')}> Mute Source </button>
                    )} 
                </div> 
                ) : (
                    <></>
                )}
            
        </div>);



}

export default UserSources;
