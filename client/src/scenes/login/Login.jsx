import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { setLogin } from '../../state';
import { loginStart, loginFailure, setLogin } from '../../state';


const Login = () => {
    const dispatch = useDispatch();
    const [initialValuesLogin, setInitialValuesLogin] = useState(
        {
            email: '',
            password: ''
        }
    );
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginStart());

        try{

        const userResponse = await fetch("http://localhost:5001/api/v1/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(initialValuesLogin)

        });

        const loggedIn = await userResponse.json();
        
        
        if(loggedIn.token){
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                })
            );
            
            navigate("/home");
            setInitialValuesLogin.email = '';
            setInitialValuesLogin.password = '';
        }
        }
        catch(err){
            dispatch(loginFailure());
        }

    }    

  return (
    <div>
        <form onSubmit={handleSubmit} >
            <div>

            <label htmlFor="email" className='labels'>Email</label>
            <input type="email" name="email" className='name' 
                value={initialValuesLogin.email}
                onChange={(e) => setInitialValuesLogin({...initialValuesLogin, email: e.target.value})}
                />
            </div>
            <div>

            <label htmlFor="password" className='labels'>Password</label>
            <input type="password" name="password" className='name' 
                value={initialValuesLogin.password}
                onChange={(e) => setInitialValuesLogin({...initialValuesLogin, password: e.target.value})}
                />
            </div>

                <div>
                    <button type="submit" className='btn'>Login</button>
                    <div>
                        <p>Don't have an account? <a onClick={()=> navigate('/register')} className="register_link">Click to signup</a></p>
                    </div>
                </div>

        </form>
    </div>
  )
}

export default Login