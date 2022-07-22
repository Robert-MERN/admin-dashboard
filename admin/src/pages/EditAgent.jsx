import React, { useState, useEffect } from 'react'
import { Header } from '../components';
import { useStateContext } from "../contexts/ContextProvider";
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Request from "../axios";
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';


const EditAgent = () => {
  const { setFormPage, loadStart, loadEnd } = useStateContext();
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();
  const id = useParams().id;
  const axios = Request();

  const [editField, setEditField] = useState({
    email: false,
    firstName: false,
    lastName: false,
    password: false,
    gender: false,
    superAdmin: false,
  });

  const [editUser, setEditUser] = useState({});
  const handleField = (e) => {
    setEditField((prev) => ({ ...prev, [e]: !prev[e] }));
  }
  const handleEditUser = (e, checkBox) => {
    if (checkBox === "superAdmin") {
      setEditUser(prev => ({ ...prev, superAdmin: e.target.checked }));
    } else if (checkBox === "male") {
      if (e.target.checked) {
        setEditUser(prev => ({ ...prev, gender: "Male" }));
      } else {
        setEditUser(prev => ({ ...prev, gender: "" }));
      }
    } else if (checkBox === "female") {
      if (e.target.checked) {
        setEditUser(prev => ({ ...prev, gender: "Female" }));
      } else {
        setEditUser(prev => ({ ...prev, gender: "" }));
      }
    } else {
      setEditUser(prev => ({ ...prev, [e.target.name]: e.target.value }));

    }
  };

  useEffect(() => {
    setFormPage(true);
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await axios.post(`user/find/one/${id || ""}`);
        setUser(res.data);
        setIsLoading(false);
      } catch (err) {
        alert.error(err.response.data.message)
        setIsLoading(false);
      }
    };
    fetchUsers()
  }, [alert, id, setFormPage]);

  const updateUser = async (e) => {
    e.preventDefault();
    if (Object.values(editUser).length) {
      loadStart();
      try {
        await axios.put(`user/update/${id}`, editUser);
        alert.success("user is updated!");
        loadEnd();
      } catch (err) {
        alert.error(err.response.data.message);
        loadEnd();
      }
    }
  }
  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl' >
      <Header title="Edit Agent Account" category="Page" />
      <form onSubmit={updateUser} className="w-350 h-full transition-all" >
        {isLoading ?
          <div className='flex justify-center py-28' >
            <CircularProgress />
          </div>
          :
          <div>
            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Email:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.email || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("email")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>

              <input value={editUser?.email || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.email ? "block" : "hidden"}`} placeholder="email" name="email" type="text" />

            </div>


            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>First Name:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.firstName || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("firstName")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>

              <input value={editUser?.firstName || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.firstName ? "block" : "hidden"}`} placeholder="name" name="firstName" type="text" />

            </div>


            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Last Name:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.lastName || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("lastName")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>

              <input value={editUser?.lastName || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.lastName ? "block" : "hidden"}`} placeholder="name" name="lastName" type="text" />

            </div>


            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Password:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.password || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("password")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>

              <input value={editUser?.password || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.password ? "block" : "hidden"}`} placeholder="password" name='password' type="text" />

            </div>


            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Gender:</label>
                  <p className='text-14 text-gray-400 cursor-default capitalize' >{user.gender || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("gender")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>
              {editField.gender &&
                <div className="flex items-center gap-5" >
                  <div className='flex items-center gap-2' >
                    <p>Male</p>
                    <Checkbox
                      checked={editUser?.gender === "Male" ? true : false}
                      onChange={(e) => handleEditUser(e, "male")}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </div>
                  <div className='flex items-center gap-2' >
                    <p >Female</p>
                    <Checkbox
                      checked={editUser?.gender === "Female" ? true : false}
                      onChange={(e) => handleEditUser(e, "female")}
                      inputProps={{ 'aria-label': 'controlled' }}
                      color="secondary"
                    />
                  </div>
                </div>
              }
            </div>
            {!user.superAdmin &&
              <div className='mb-12 flex flex-col gap-4' >
                <div className="flex items-center justify-between" >
                  <div className="flex items-center gap-4" >
                    <label className='text-18 font-bold text-gray-600'>Super Admin:</label>
                    <p className='text-14 text-gray-400 cursor-default capitalize' >{user.superAdmin?.toString() || ""}</p>
                  </div>
                  <EditIcon onClick={() => handleField("superAdmin")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
                </div>
                <>
                  {editField.superAdmin &&
                    <div className='flex items-center gap-4' >
                      <p className='text-14 text-gray-600' >Super admin user</p>
                      <Checkbox
                        checked={editUser?.superAdmin ? true : false}
                        onChange={(e) => handleEditUser(e, "superAdmin")}
                        inputProps={{ 'aria-label': 'controlled' }}
                        color="warning"
                      />
                    </div>
                  }
                </>
              </div>
            }
            <div>
              <button type='submit' className="px-6 py-2 bg-teal-500 hover:bg-teal-400 transition-all text-white" >Update</button>
            </div>
          </div>
        }
      </form>
    </div>
  )
}

export default EditAgent
