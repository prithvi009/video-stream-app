import React from 'react'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import './register.css'

 
const Register = () => {  
    const [initialValuesRegister, setInitialValuesRegister] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    );
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userResponse = await fetch("http://localhost:5001/api/v1/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(initialValuesRegister)
        });

        if(userResponse.status === 201){
            setInitialValuesRegister.firstName = '';
            setInitialValuesRegister.lastName = '';
            setInitialValuesRegister.email = '';    
            setInitialValuesRegister.password = '';
            navigate('/');
        }

    }
    
  return (
    <>
    <div className='login'>
        <form  onSubmit={handleSubmit} className="login_form">

                <div>

                    <label htmlFor="name" className='labels'>First Name</label>
                    <input type="text" name="first_name" className="name" 
                        value = {initialValuesRegister.firstName}
                        onChange={(e) => setInitialValuesRegister({...initialValuesRegister, firstName: e.target.value})}
                    />
                </div>
                <div>

                    <label htmlFor="name" className='labels'>Last Name</label>
                    <input type="text" name="last_name" className='name' 
                        value={initialValuesRegister.lastName}
                        onChange={(e) => setInitialValuesRegister({...initialValuesRegister, lastName: e.target.value})}
                        />
                </div>
                
            <div>

            <label htmlFor="email" className='labels'>Email</label>
            <input type="email" name="email" className='name' 
                value={initialValuesRegister.email}
                onChange={(e) => setInitialValuesRegister({...initialValuesRegister, email: e.target.value})}
                />
            </div>
            <div>

                <label htmlFor="password" className='labels'>Password</label>
                <input type="password" name="password" className='name' 
                    value={initialValuesRegister.password}
                    onChange={(e) => setInitialValuesRegister({...initialValuesRegister, password: e.target.value})}
                    />    
            </div>
            <button type="submit" className='btn'>Register</button>

        </form>
    </div>
    </>
  )
}

export default Register;