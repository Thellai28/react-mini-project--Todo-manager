import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from './Security/AuthContext';

function LoginComponent(){
    const [userName, setUserName] = useState('Thellai');
    const [password, setPassword] = useState('')
    const [showSuccessMessage, setshowSuccessMessage] = useState(false);
    const [showErrorMessge, setshowErrorMessge] = useState(false);
    const navigate = useNavigate(); // another hook to navigate to other URL's, unlike useState(), this hook only returns one function back :  
    const authContext = useAuth();

    function handleUserNameChange( event ){
        setUserName( event.target.value );
    }
    
    function handlePasswordChange( event ){
        setPassword( event.target.value );
    }

    async function handleSubmit(){ // asyn keyword is used here : 
        if( await authContext.login(userName, password) ){ // await keyword is used here : 
            navigate(`/welcome/${userName}`); // This is not single quotes, this is tild symbol ( button present belwo ESC button in keyboard )
        }else {
            setshowErrorMessge(true);
        }
    }

    return (
        <div className = "Login"> 
            { showErrorMessge && 
                <div className ='errorMessage'> Authenticated Failed, please check your credentials </div>}
            
            <div className="LoginForm">
                <h1>Time to log-in</h1>
                <div >
                    <label> user Name</label>
                    < input type="text" name ="userName" value={userName} onChange = {handleUserNameChange} />
                </div>
                <div >
                    <label> password</label>
                    < input type="password" name ="password" value = {password} onChange = {handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name ="login" onClick = {handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;