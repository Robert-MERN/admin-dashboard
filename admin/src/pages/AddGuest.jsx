import React, { useState } from 'react'
import { Header } from '../components';
import { useStateContext } from "../contexts/ContextProvider";
import Request from "../axios";
import { useAlert } from 'react-alert';


const AddGuest = () => {
  const { loadStart, loadEnd } = useStateContext();
  const alert = useAlert();
  const axios = Request();


  const [editUser, setEditUser] = useState({});
  const handleEditUser = (e) => {
    setEditUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createGuest = async (e) => {
    e.preventDefault();
    if (Object.values(editUser).length) {
      loadStart();
      try {
        await axios.post(`guest/create`, editUser);
        alert.success("guest is created!");
        loadEnd();
      } catch (err) {
        alert.error(err.response.data.message);
        loadEnd();
      }
    }
  }
  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl' >
      <Header title="Add Hotel Booking" category="Page" />
      <form onSubmit={createGuest} className="w-350 h-full transition-all" >
          <div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Title:</label>
                </div>
              </div>
              <input required value={editUser?.title || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400`} placeholder="title" name="title" type="text" />

            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Email:</label>
                </div>
              </div>

              <input required value={editUser?.email || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400`} placeholder="email" name="email" type="email" />

            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>First Name:</label>
                </div>
              </div>

              <input required value={editUser?.firstName || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400`} placeholder="name" name="firstName" type="text" />

            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Last Name:</label>
                </div>
              </div>
              <input required value={editUser?.lastName || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400`} placeholder="name" name="lastName" type="text" />
            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Date Of Birth:</label>
                </div>
              </div>
              <input required value={editUser?.birthDate || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400`} placeholder="date of birth" name="birthDate" type="date" />
            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Room No:</label>
                </div>
              </div>
              <input required value={editUser?.roomNo || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400`} placeholder="room no" name="roomNo" type="number" />
            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Country:</label>
                </div>
              </div>
              <input required value={editUser?.country || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400`} placeholder="country" name="country" type="text" />
            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>City:</label>
                </div>
              </div>
              <input required value={editUser?.city || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400`} placeholder="city" name="city" type="text" />
            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Post Code:</label>
                </div>
              </div>
              <input required value={editUser?.postCode || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400`} placeholder="post code" name="postCode" type="number" />
            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Address:</label>
                </div>
              </div>
              <input required value={editUser?.address || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400`} placeholder="address" name="address" type="text" />
            </div>

            <div>
              <button type='submit' className="px-6 py-2 bg-teal-500 hover:bg-teal-400 transition-all text-white" >Create</button>
            </div>
          </div>
      </form>
    </div>
  )
}

export default AddGuest
