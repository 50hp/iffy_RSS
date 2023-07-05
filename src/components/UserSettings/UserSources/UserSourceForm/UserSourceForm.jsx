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
                <fieldset>
                    <legend>Add Souce</legend>
                
                    <div className="form-group">     
                        <label htmlFor="inputOne">Source Name</label>
                        <input name="inputOne"
                               value={inputOne}
                               onChange={(e)=>setInputOne(e.target.value)}
                               required
                               placeholder="Name"
                               type="text"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputTwo">Source URL</label>
                         <input name="inputTow"
                               value={inputTwo}
                               onChange={(e)=>setInputTwo(e.target.value)}
                               required
                               placeholder="url"
                               type="url"
                               pattern="https://.*"
                        />   
                    </div>
                    <button className="btn btn-default" type="submit">ADD</button>
                </fieldset>
            </form>


        </div>

    );



}


export default UserSourceForm;
