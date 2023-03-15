import React from 'react'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loadingGif from '../../assets/loading.gif';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Form = styled.form`
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.15);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
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
    cursor: pointer;

`;

const Img = styled.img`
    width: 150px;
    height: 150px;
`;

const Header = styled.h1`
    text-align: center;
`;


 
const Register = () => {  
    const [initialValuesRegister, setInitialValuesRegister] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    );

    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userResponse = await fetch("http://localhost:5001/api/v1/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(initialValuesRegister)
        });

        setLoading(false);

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
    <Container>
        <Form  onSubmit={handleSubmit} className="login_form">
            <Header>Register</Header>
            <FormContainer>
                {loading ? <Img src={loadingGif} alt="#" /> : 
                    <>
                    <Input type="text" name="first_name" placeholder='First Name' className="name" 
                        value = {initialValuesRegister.firstName}
                        onChange={(e) => setInitialValuesRegister({...initialValuesRegister, firstName: e.target.value})}
                    />
                    <Input type="text" name="last_name" placeholder='Last Name' className='name' 
                        value={initialValuesRegister.lastName}
                        onChange={(e) => setInitialValuesRegister({...initialValuesRegister, lastName: e.target.value})}
                        />
                    <Input type="email" name="email" placeholder='Email' className='name' 
                        value={initialValuesRegister.email}
                        onChange={(e) => setInitialValuesRegister({...initialValuesRegister, email: e.target.value})}
                        />

                    <Input type="password" name="password" placeholder='Password' className='name' 
                        value={initialValuesRegister.password}
                        onChange={(e) => setInitialValuesRegister({...initialValuesRegister, password: e.target.value})}
                    />
                    </> 
                }
            </FormContainer>
            <Button type="submit" className='btn'>Register</Button>

        </Form>
    </Container>
    </>
  )
}

export default Register;