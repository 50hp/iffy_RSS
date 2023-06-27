



function FeedContent({content, contentsnippet, view}) {




    return(
        <>
            {view ? (
                <p dangerouslySetInnerHTML={{__html:content}}/>
            ) : (
                <div> 
                    <p dangerouslySetInnerHTML={{__html:contentsnippet}}/>
                </div>
            )} 
        

        </>
    );



}




export default FeedContent;
