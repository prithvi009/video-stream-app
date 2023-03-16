import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginFailure, setLogin } from '../../state/authSlice';
import styled from "styled-components";
import loadingGif from '../../assets/loading.gif';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Header = styled.h1`
    text-align: center;
`;


const Form = styled.form`
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.15);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    border-radius: 10px;
    margin: 0 auto;
`;

const Input = styled.input`
    padding: 10px;
    width: 80%;
    margin: 15px 10px;
    height: 30px;
    border: none;
    border-radius: 5px;
    outline: none;
    background-color: lightgray;
    font-size: 1rem;
`;


const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: 20px auto;
    align-items: center;
`;

const Contains = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 10px auto;
`;

const Button = styled.button`
    padding: 10px;
    width: 80%;
    background-color: #7098ed;
    border: none;
    border-radius: 5px;
    height: 40px;
    margin-bottom: 10px;
    cursor: pointer;

`;

const Link = styled.a`
    text-decoration: none;
    color: #7098ed;
    font-size: 1rem;
    cursor: pointer;
    margin: 10px;
`;

const Img = styled.img`
    width: 150px;
    height: 150px;
`;

const Login = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
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
        setLoading(true);

        try{

            const userResponse = await fetch("http://localhost:5001/api/v1/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(initialValuesLogin)

            });
            setLoading(false);
            const loggedIn = await userResponse.json();
            
            
            if(loggedIn){
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token
                    })
                );

                navigate('/home')
                setInitialValuesLogin.email = '';
                setInitialValuesLogin.password = '';
            }
        }
        catch(err){
            dispatch(loginFailure());
        }

    }    

  return (
    <Container>
        <Form onSubmit={handleSubmit} >
            <Header>Login</Header>
            <FormContainer>
                {loading ? <Img src={loadingGif} alt="#" /> : 
                    <>
                    <Input type="email" name="email" placeholder='Email' className='name' 
                        value={initialValuesLogin.email}
                        onChange={(e) => setInitialValuesLogin({...initialValuesLogin, email: e.target.value})}
                    />
                    <Input type="password" name="password" placeholder='password' className='name' 
                        value={initialValuesLogin.password}
                        onChange={(e) => setInitialValuesLogin({...initialValuesLogin, password: e.target.value})}
                    />
                    </>
                }
            </FormContainer> 

                <Contains>
                    <Button type="submit" className='btn'>Login</Button>
                        <p>Don't have an account? <Link onClick={()=> navigate('/register')} className="register_link">Click to signup</Link></p>

                </Contains>
        </Form>
    </Container>
  )
}

export default Login