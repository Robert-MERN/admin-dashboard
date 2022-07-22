import React, { useState, useEffect } from 'react'
import { useStateContext } from "../contexts/ContextProvider";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useAlert } from 'react-alert';
import Request from "../axios";

const Signup = () => {
    const { setFormPage, loadStart, loadEnd } = useStateContext();
    const [error, setError] = useState(null);
    const alert = useAlert();
    const axios = Request();
    useEffect(() => {
        setFormPage(false);
    })
    const [credentials, setCredentials] = useState({
        email: "",
        firstName: "",
        lastName: "",
        gender: "",
        isAgent: true,
        superAdmin: false,
        password: "",
        confirmPassword: "",

    });
    const [psdShow, setPsdShow] = useState({ first: false, second: false });
    const showPassword = (target) => {
        if (target === "first") {
            setPsdShow({ ...psdShow, [target]: true });
        } else if (target === "second") {
            setPsdShow({ ...psdShow, [target]: true });
        }
    };
    const hidePassword = (target) => {
        if (target === "first") {
            setPsdShow({ ...psdShow, [target]: false });
        } else if (target === "second") {
            setPsdShow({ ...psdShow, [target]: false });
        }
    }

    const handleChange = (e, checkBox) => {
        if (checkBox === "superAdmin") {
            setCredentials({ ...credentials, superAdmin: e.target.checked });
        } else if (checkBox === "male") {
            if (e.target.checked) {
                setCredentials({ ...credentials, gender: "Male" });
            } else {
                setCredentials({ ...credentials, gender: "" });
            }
        } else if (checkBox === "female") {
            if (e.target.checked) {
                setCredentials({ ...credentials, gender: "Female" });
            } else {
                setCredentials({ ...credentials, gender: "" });
            }
        }
        else {
            setCredentials({ ...credentials, [e.target.name]: e.target.value });
        }
    }
    useEffect(() => {
        if (credentials.password) {
            setPsdShow((prev) => ({ ...prev, first: false }));
        };
        if (credentials.confirmPassword) {
            setPsdShow(prev => ({ ...prev, second: false }));
        };
    }, [credentials]);
    const navigate = useNavigate();

    const prevPage = () => {
        navigate(-1);
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        loadStart()
        setError(null);
        try {
            await axios.post("auth/signup/agent", credentials)
            loadEnd()
            alert.success("Account is created!");
            setError(null);
            navigate("/");
        } catch (err) {
            setError(err);
            loadEnd()
            alert.error(err.response.data.message);
        }

    }
    return (
        <>
            <div className='w-screen h-screen bg-white md:bg-gray-300 grid place-items-center overflow-hidden' >
                <form onSubmit={handleSubmit} className="w-screen md:w-500 lg:w-600 bg-white md:rounded-xl px-6 md:py-10 lg:py-6 text-14" >
                    <h3 className='text-24 font-extrabold mb-6 text-gray-600 capitalize' >Add agent</h3>
                    {/* first name */}
                    <label className='text-15 font-medium text-gray-600' htmlFor="">First Name:</label>
                    <div className='flex border-1 border-gray-300 md:p-2 px-2 p-1 mt-1 mb-4' >
                        <input value={credentials.firstName} required placeholder="name" autoCorrect={"false"} autoComplete={"false"} autoCapitalize={"false"} name="firstName" onChange={handleChange} className="w-full border-none outline-none" type="text" />
                    </div>
                    {/* last name */}
                    <label className='text-15 font-medium text-gray-600' htmlFor="">Last Name:</label>
                    <div className='flex border-1 border-gray-300 md:p-2 px-2 p-1 mt-1 mb-4' >
                        <input value={credentials.lastName} required placeholder="name" autoCorrect={"false"} autoComplete={"false"} autoCapitalize={"false"} name="lastName" onChange={handleChange} className="w-full border-none outline-none" type="text" />
                    </div>
                    {/* email */}
                    <label className='text-15 font-medium text-gray-600' htmlFor="">Email:</label>
                    <div className='flex border-1 border-gray-300 md:p-2 px-2 p-1 mt-1 mb-4' >
                        <input value={credentials.email} required placeholder="email" autoCorrect={"false"} autoComplete={"false"} autoCapitalize={"false"} name="email" onChange={handleChange} className="w-full border-none outline-none" type="email" />
                    </div>
                    {/* password */}
                    <label className='text-15 font-medium text-gray-600' htmlFor="">Password:</label>
                    <div className='flex border-1 border-gray-300 md:p-2 px-2 p-1 mt-1 mb-4 items-center md:h-40 h-32' >
                        <input value={credentials.password} required placeholder="password" autoCorrect={"false"} autoComplete={"false"} autoCapitalize={"false"} name='password' onChange={handleChange} className="w-full border-none outline-none" type={psdShow.first ? "text" : "password"} />
                        <div className={`${!psdShow.first && credentials.password ? "block" : "hidden"} cursor-pointer scale-75 text-gray-400 hover:text-gray-600 transition-all`} onClick={() => showPassword("first")} ><VisibilityIcon /></div>
                        <div className={`${psdShow.first ? "block" : "hidden"} cursor-pointer scale-75 text-gray-400 hover:text-gray-600 transition-all`} onClick={() => hidePassword("first")} ><VisibilityOffIcon /></div>
                    </div>
                    {/* confirm password */}
                    <label className='text-15 font-medium text-gray-600' htmlFor="">Confirm Password:</label>
                    <div className='flex border-1 border-gray-300 md:p-2 px-2 p-1 mt-1 mb-4 items-center md:h-40 h-32' >
                        <input value={credentials.confirmPassword} required pattern={credentials.password} placeholder="password" autoCorrect={"false"} autoComplete={"false"} autoCapitalize={"false"} name='confirmPassword' onChange={handleChange} className="w-full border-none outline-none" type={psdShow.second ? "text" : "password"} />
                        <div className={`${!psdShow.second && credentials.confirmPassword ? "block" : "hidden"} cursor-pointer scale-75 text-gray-400 hover:text-gray-600 transition-all`} onClick={() => showPassword("second")} ><VisibilityIcon /></div>
                        <div className={`${psdShow.second ? "block" : "hidden"} cursor-pointer scale-75 text-gray-400 hover:text-gray-600 transition-all`} onClick={() => hidePassword("second")} ><VisibilityOffIcon /></div>
                    </div>
                    {/* gender */}
                    <div className='flex items-center justify-between mt-2 md:mb-5' >
                        <label className='text-15 font-medium text-gray-600 whitespace-nowrap' htmlFor="">Gender:</label>
                        <div className="flex items-center gap-5" >
                            <div className='flex items-center gap-2' >
                                <p>Male</p>
                                <Checkbox
                                    checked={credentials.gender === "Male" ? true : false}
                                    onChange={(e) => handleChange(e, "male")}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    required={credentials.gender ? false : true}
                                />
                            </div>
                            <div className='flex items-center gap-2' >
                                <p >Female</p>
                                <Checkbox
                                    checked={credentials.gender === "Female" ? true : false}
                                    onChange={(e) => handleChange(e, "female")}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    color="secondary"
                                    required={credentials.gender ? false : true}
                                />
                            </div>
                        </div>
                    </div>
                    {/* super admin */}
                    <div className='flex justify-between items-center mt-2 md:mb-5' >
                        <label className='text-15 font-medium text-gray-600 whitespace-nowrap' htmlFor="">Super Admin <span className="text-red-400 text-13 font-thin" > (becareful while checking this*)</span>:</label>
                        <div>
                            <Checkbox
                                checked={credentials.superAdmin}
                                onChange={(e) => handleChange(e, "superAdmin")}
                                inputProps={{ 'aria-label': 'controlled' }}
                                color="warning"
                            />
                        </div>

                    </div>
                    {error &&
                        <p className={`text-red-700 transition-all`} >account didn't create!</p>
                    }
                    <div className='flex justify-between items-center mt-6 md:mt-10' >

                        <div onClick={prevPage} className='flex gap-2 justify-center items-center hover:text-gray-600 text-gray-400 transition-all px-6 cursor-pointer py-2 hover:bg-gray-200' >
                            <KeyboardBackspaceIcon className="scale-75" />
                            <p>Back</p>
                        </div>


                        <button className="px-6 py-2 bg-teal-500 hover:bg-teal-400 transition-all text-white" type="submit" >SignUp</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup