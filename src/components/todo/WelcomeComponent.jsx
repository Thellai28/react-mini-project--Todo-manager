import {useParams, Link} from 'react-router-dom';

function WelcomeComponent(){ 
    //const param = useParams(); 
    const { userName } = useParams(); //  This hook will help to store all the params that comes along the URL. 
    return (
        <div className = "Welcome"> 
            Your todo's - <Link to='/todos'>go here</Link>
        </div>
    )
}

export default WelcomeComponent;