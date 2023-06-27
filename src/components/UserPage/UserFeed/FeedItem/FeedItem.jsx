

function FeedItem({item}) {

    return(
        <div>
            <h4>{item.title}</h4>
            <span>{item.creator}</span>
            <p dangerouslySetInnerHTML={{__html:item.content}}/>
        </div>
    );


}


export default FeedItem;

