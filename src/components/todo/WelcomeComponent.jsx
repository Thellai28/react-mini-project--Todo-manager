import {useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';
import { useAuth } from './Security/AuthContext';

function WelcomeComponent(){ 
    
    //const { userName } = useParams(); //  This hook will help to store all the params that comes along the URL. 
    const [messageResponse, setMessageResponse] = useState(null);
    const authContext = useAuth();
    const { userName } = useParams();

    function callHelloWorldRestApi(){
        console.log("called");
        
            retrieveHelloWorldPathVariable('Google developer', authContext.token )
            .then( (response) => successfulResponse( response ) )
            .catch( (error) => errorResponse( error ) )
            .finally( () => console.log( " clena Up happening " ));
    }

    function successfulResponse( response ){ // This is called, if the error response is successful : 
        console.log( response)
        setMessageResponse( response.data.message );
    }
    function errorResponse( error ){ // This will be called,if the error response is failed or error : 
        console.log( error.data );
    }
    return (
        <div className = "WelcomeComponent"> 
            <div>
                Your todo's - <Link to='/todos'>go here</Link>
            </div>
            <div>
                <button className = "btn btn-success m-5" onClick={callHelloWorldRestApi}> call helloworld </button>
            </div>
            <div className="text-info">{ messageResponse }</div>
        </div>
    )
}

export default WelcomeComponent;