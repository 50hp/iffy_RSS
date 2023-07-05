import "../../../../terminal.css";
import "./FeedItem.css";
import UserHome from './FeedType/UserHome.jsx';
import Archive from './FeedType/Archive.jsx';
import Default from './FeedType/Default.jsx';

function FeedItem({item, view}) {
    

    switch(view) {
        case "userHome":
        return(
            <UserHome item={item}/>
        );
        case "archive":
        return(
            <Archive item={item}/>
        );
        case "default":
        return(
            <Default item={item}/>
        );




    }

}


export default FeedItem;

