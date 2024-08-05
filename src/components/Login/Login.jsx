import React, { useContext, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
import { toast } from 'react-toastify'

const Login = ({ setshowLogin }) => {

    const { url, settoken } = useContext(StoreContext);
    const [currentState, setcurrentState] = useState('Sign Up');
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const onLogin = async (e) => {
        e.preventDefault();
        const endpoint = currentState === "LogIn" ? "/api/user/login" : "/api/user/register";
        const newUrl = `${url}${endpoint}`;

        try {
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                settoken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setshowLogin(false);
                toast.success(response.data.message);
            } else {
                settoken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setshowLogin(false);
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error('Error during authentication', error);
            toast.error("Error during authentication");
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} action="" className="login-popup-container">
                <div className="login-popup-tittle">
                    <h2>{currentState}</h2>
                    <img onClick={() => setshowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-input">
                    {currentState === "LogIn" ? <></> :
                        <input onChange={onChangeHandler} value={data.name} name='name' type="text" placeholder='Your Name' required />}
                    <input onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='E-mail' required />
                    <input onChange={onChangeHandler} name='password' value={data.password} type="password" placeholder='Password' required />
                </div>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                <button type='submit'>{currentState === "Sign Up" ? "Create account" : "LogIn"}</button>
                {currentState === "LogIn" ?
                    <p>Create a new account? <span onClick={() => { setcurrentState("Sign Up") }}>Click here</span></p> :
                    <p>Already have an account? <span onClick={() => { setcurrentState("LogIn") }}>Login here</span></p>}
            </form>
        </div>
    )
}

export default Login