import '../../../../../terminal.css'



function FeedContent({content, contentsnippet, view}) {

    


    return(
        <div>
                {view ? (
                    <p dangerouslySetInnerHTML={{__html:content}}/>
                    ) : (
                        <div> 
                        </div>
                    )}
        </div>
    );



}




export default FeedContent;
