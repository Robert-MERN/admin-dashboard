import React, { useState, useEffect } from 'react'
import { useStateContext } from "../contexts/ContextProvider";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert';
import Request from "../axios";

const Login = () => {
    const { setFormPage, loadStart, loadEnd, setUser } = useStateContext();
    const [ error, setError ] = useState(null);
    const alert  = useAlert();
    const axios = Request();
    useEffect(()=>{
        setFormPage(false);
    })
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [psdShow, setPsdShow] = useState(false);
    const showPassword = () => {
        setPsdShow(true);
    };
    const hidePassword = () => {
        setPsdShow(false);
    }
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        loadStart()
        setError(null);
        try{
            const res = await axios.post("auth/login/agent", credentials)
            setUser(res.data);
            loadEnd()
            alert.success("You have logged in!");
            setError(null);
            // window.location.reload();
        } catch(err){
            setError(err);
            loadEnd()
            alert.error(err.response.data.message);
        }

    }
    return (
        <>
            <div className='w-screen h-screen bg-white md:bg-gray-300 grid place-items-center overflow-hidden' >
                <form onSubmit={handleSubmit} className="w-screen md:w-500 lg:w-350 bg-white md:rounded-xl px-6 md:py-10 lg:py-6 text-14 transition-all" >
                    <h3 className='text-24 font-extrabold mb-6 text-gray-600' >Login</h3>
                    <label className='text-15 font-medium text-gray-600' htmlFor="">Email:</label>
                    <div className='flex border-1 border-gray-300 p-2 mt-1 mb-4' >
                        <input required autoCorrect={"false"} autoComplete={"false"} autoCapitalize={"false"} name="email" placeholder='email' value={credentials.email} onChange={handleChange} className="w-full border-none outline-none" type="email" />
                    </div>
                    <label className='text-15 font-medium text-gray-600' htmlFor="">Password:</label>
                    <div style={{height: "40px"}}  className='flex border-1 border-gray-300 p-2 mt-1 mb-4 items-center' >
                        <input required autoCorrect={"false"} autoComplete={"false"} autoCapitalize={"false"} name='password' value={credentials.password} placeholder='password' onChange={handleChange} className="w-full border-none outline-none" type={psdShow ? "text" : "password"} />
                        <div className={`${!psdShow && credentials.password ? "block" : "hidden"} cursor-pointer scale-75 text-gray-400 hover:text-gray-600 transition-all duration-300`} onClick={showPassword} ><VisibilityIcon /></div>
                        <div className={`${psdShow ? "block" : "hidden"} cursor-pointer scale-75 text-gray-400 hover:text-gray-600 transition-all`} onClick={hidePassword} ><VisibilityOffIcon  /></div>
                    </div>
                    <p className={`text-red-700 transition-all duration-400 ${error? "block": "hidden"}`} >Wrong Email or passwords!</p>
                    <Link to="" >
                        <div className="mt-6 text-gray-400 cursor-pointer hover:underline transition-all text-13">
                            <p>Did you forget your password?</p>
                        </div>
                    </Link>
                    <div className='flex justify-end items-center mt-24 md:mt-10' >
                        <button className="px-6 py-2 bg-teal-500 hover:bg-teal-400 transition-all text-white" type="submit" >Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login