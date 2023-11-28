
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './TodoApp.css'
import LogoutComponent from './LogoutComponent';
import LoginComponent from './LoginComponent';
import ListTodoComponent from './ListTodoComponent';
import HeaderComponent from './HeaderComponent';
import WelcomeComponent from './WelcomeComponent';
import ErrorComponent from './ErrorComponent';
import AuthProvider, { useAuth } from './Security/AuthContext';
import TodoComponent from './TodoComponent';

function AuthenticatedRoute( {children} ){
    const authContext = useAuth();
    if( authContext.isAuthenticated ){
        return children;
    }
    return <Navigate to ="/" />
}

export default function TodoApp(){
    return (
        <div className="TodoApp">  
            <AuthProvider> 
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes> 
                        <Route path ='/' element = { <LoginComponent/>} />
                        <Route path ='/login' element = { <LoginComponent/> }/>
                        <Route path ='/welcome/:userName' element = { 
                            <AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>
                        } />
                        <Route path ='/todos' element = { 
                            <AuthenticatedRoute> 
                                <ListTodoComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path ='*' element = { 
                            <AuthenticatedRoute>
                                <ErrorComponent/> 
                            </AuthenticatedRoute>
                        }/>
                        <Route path ='/logout' element = { 
                            <AuthenticatedRoute>
                                <LogoutComponent/>
                            </AuthenticatedRoute>
                        }/>

                        <Route path ='/todos/:id' element = { 
                            <AuthenticatedRoute> 
                                <TodoComponent/>
                            </AuthenticatedRoute>
                        }/>
                    </Routes>
                </BrowserRouter>  
            </AuthProvider>  
        </div>
    )
}