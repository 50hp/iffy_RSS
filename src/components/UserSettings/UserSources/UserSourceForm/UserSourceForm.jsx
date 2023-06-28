import { useState } from "react";
import { useDispatch } from "react-redux";




function UserSourceForm() {

    const dispatch = useDispatch();
    const [inputOne, setInputOne] = useState(String);
    const [inputTwo, setInputTwo] = useState(String);
   
    const handleSubmit = (event) => {
        event.preventDefault(); 
    
        dispatch({type:"POST_SOURCE", payload:{name:inputOne, url: inputTwo}});
        setInputTwo('');
        setInputOne('');

    }
   

    return (

        <div>
            <form onSubmit={(event)=> handleSubmit(event)}>
                <legend>Add Souce</legend>
                
                <label htmlFor="inputOne">Source Name</label>
                <input name="inputOne"
                       value={inputOne}
                       onChange={(e)=>setInputOne(e.target.value)}
                       required
                       placeholder="Name"
                       type="text"
                />
                <label htmlFor="inputTwo">Source URL</label>
                 <input name="inputTow"
                       value={inputTwo}
                       onChange={(e)=>setInputTwo(e.target.value)}
                       required
                       placeholder="url"
                       type="text"
                />               
                <button type="submit">ADD</button>
            </form>


        </div>

    );



}


export default UserSourceForm;
