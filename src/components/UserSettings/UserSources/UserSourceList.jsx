import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import UserSources from "./UserSources.jsx";
import UserSourceForm from "./UserSourceForm/UserSourceForm.jsx";
import "../../../terminal.css"
function UserSourceList(){
    
    const dispatch = useDispatch();
    const [editToggle, setEditToggle] = useState(false)
    const settings = useSelector(store => store.settings);
    
    const handleClick = (button) => {

        switch(button) {
        case 'edit':
            setEditToggle(!editToggle);
            return;
        case 'save':
            return;
        case 'content':
            return;  
        }
    }


    useEffect(() => {
        dispatch({type:"FETCH_SETTINGS"});
    }, []);


    return(
        
        <div>
            <UserSourceForm />
            
            {settings.sources?.map((item, i) => (
                <UserSources key={i} item={item} editToggle={editToggle} />
            ))}
            
            <button className="btn btn-primary btn-ghost" onClick={()=> handleClick('edit')}>Edit Sources</button> 
        </div>
    );





}


export default UserSourceList;
