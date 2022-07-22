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
    title: false,
    email: false,
    firstName: false,
    lastName: false,
    birthDate: false,
    roomNo: false,
    status: false,
    address: false,
    postCode: false,
    city: false,
    country: false,
  });

  const [editUser, setEditUser] = useState({});
  console.log(editUser)
  const handleField = (e) => {
    setEditField((prev) => ({ ...prev, [e]: !prev[e] }));
  }
  const handleEditUser = (e, show) => {

    setEditUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setFormPage(true);
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await axios.post(`guest/find/${id || ""}`);
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
        await axios.put(`guest/update/${id}`, editUser);
        alert.success("guest is updated!");
        loadEnd();
      } catch (err) {
        alert.error(err.response.data.message);
        loadEnd();
      }
    }
  }
  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl' >
      <Header title="Edit Guest" category="Page" />
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
                  <label className='text-18 font-bold text-gray-600'>Title:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.title || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("title")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>

              <input value={editUser?.title || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.title ? "block" : "hidden"}`} placeholder="title" name="title" type="text" />

            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Email:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.email || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("email")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>

              <input value={editUser?.email || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.email ? "block" : "hidden"}`} placeholder="email" name="email" type="email" />

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
                  <label className='text-18 font-bold text-gray-600'>Date Of Birth:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user?.birthDate?.split("T")[0] || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("birthDate")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>
              <input value={editUser?.birthDate || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.birthDate ? "block" : "hidden"}`} placeholder="date of birth" name="birthDate" type="date" />
            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Room No:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.roomNo || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("roomNo")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>
              <input value={editUser?.roomNo || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.roomNo ? "block" : "hidden"}`} placeholder="room no" name="roomNo" type="number" />
            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Status:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.status || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("status")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>
              <select value={editUser?.status || ""} onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.status ? "block" : "hidden"}`} name="status"  >
              <option value={"Processing"}>Processing</option>
              <option value={"Failed"}>Failed</option>
              <option value={"Succeed"}>Succeed</option>
            </select>
            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Country:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.country || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("country")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>
              <input value={editUser?.country || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.country ? "block" : "hidden"}`} placeholder="country" name="country" type="text" />
            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>City:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.city || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("city")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>
              <input value={editUser?.city || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.city ? "block" : "hidden"}`} placeholder="city" name="city" type="text" />
            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Post Code:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.postCode || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("postCode")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>
              <input value={editUser?.postCode || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.postCode ? "block" : "hidden"}`} placeholder="post code" name="postCode" type="number" />
            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Address:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.address || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("address")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>
              <input value={editUser?.address || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.address ? "block" : "hidden"}`} placeholder="address" name="address" type="text" />
            </div>

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
