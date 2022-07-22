import React, { useState, useEffect } from 'react'
import { Header, LocationsSearch } from '../components';
import { useStateContext } from "../contexts/ContextProvider";
import EditIcon from '@mui/icons-material/Edit';
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
    departureDate: false,
    arrivalDate: false,
    departureLocation: false,
    arrivalLocation: false,
    status: false,
    bookingStatus: false,
    class: false,
    adults: false,
    children: false,
    infants: false,
  });

  const [editUser, setEditUser] = useState({
  });
  const handleField = (e) => {
    setEditField((prev) => ({ ...prev, [e]: !prev[e] }));
  }
  const handleEditUser = (e, perm) => {
    if (perm === "showDepart") {
      setEditUser(prev => ({ ...prev, showArrive: false, [perm]: true }));
    } else if (perm === "showArrive") {
      setEditUser(prev => ({ ...prev, showDepart: false, [perm]: true }));
    }
    setEditUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setFormPage(true);
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await axios.post(`passenger/find/${id || ""}`);
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
      console.log(Object.values(editUser).length)
      loadStart();
      try {
        const { showDepart, showArrive, ...rest } = editUser
        await axios.put(`passenger/update/${id}`, rest);
        alert.success("passenger is updated!");
        loadEnd();
      } catch (err) {
        alert.error(err.response.data.message);
        loadEnd();
      }
    } else {
      alert.error("atleast update one field!");
    }
  }
  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl' >
      <Header title="Edit Passenger" category="Page" />
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
                  <label className='text-18 font-bold text-gray-600'>Departure Date:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.departureDate?.split("T")[0] || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("departureDate")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>
              <input value={editUser?.departureDate || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField?.departureDate ? "block" : "hidden"}`} name="departureDate" type="date" />
            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Arrival Date:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.arrivalDate?.split("T")[0] || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("arrivalDate")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>
              <input value={editUser?.arrivalDate || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.arrivalDate ? "block" : "hidden"}`} name="arrivalDate" type="date" />
            </div>



            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Departure Location:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.departureLocation || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("departureLocation")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>
              <div className={`${editField.departureLocation ? "block" : "hidden"}`} >
                <LocationsSearch
                  val={editUser?.departureLocation || ""}
                  func={handleEditUser}
                  ph="Search."
                  toShow={editUser}
                  editUser={setEditUser}
                  show="showDepart"
                  name="departureLocation"
                />
              </div>
            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Arrival Location:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.arrivalLocation || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("arrivalLocation")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>
              <div className={`${editField.arrivalLocation ? "block" : "hidden"}`} >
                <LocationsSearch
                  val={editUser?.arrivalLocation || ""}
                  func={handleEditUser}
                  ph="Search."
                  toShow={editUser}
                  editUser={setEditUser}
                  show="showArrive"
                  name="arrivalLocation"
                />
              </div>
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
                  <label className='text-18 font-bold text-gray-600'>Booking Status:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.bookingStatus || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("bookingStatus")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>
                   <select value={editUser?.bookingStatus || ""} onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.bookingStatus ? "block" : "hidden"}`} name="bookingStatus"  >
              <option value={"Processing"}>Processing</option>
              <option value={"Failed"}>Failed</option>
              <option value={"Succeed"}>Succeed</option>
            </select>
            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Class:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.class || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("class")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>

              <select value={editUser?.class || ""} onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.class ? "block" : "hidden"}`} name="class"  >
                <option value={"ECONOMY"}>Economy</option>
                <option value={"PREMIUM_ECONOMY"}>Premium Economy</option>
                <option value={"BUSINESS"}>Business Class</option>
                <option value={"FIRST"}>First Class</option>
              </select>
            </div>

            <h1 className='text-24 font-bold text-gray-500 mb-6' >Type of Passengers*</h1>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Adults</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.adults || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("adults")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>
              <input value={editUser?.adults || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.adults ? "block" : "hidden"}`} placeholder="adults" name="adults" type="number" />
            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Children</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.children || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("children")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>
              <input value={editUser?.children || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.children ? "block" : "hidden"}`} placeholder="children" name="children" type="number" />
            </div>

            <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Infants</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.infants || ""}</p>
                </div>
                <EditIcon onClick={() => handleField("infants")} className="cursor-pointer hover:text-blue-500 transition-all scale-75" />
              </div>
              <input value={editUser?.infants || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 ${editField.infants ? "block" : "hidden"}`} placeholder="infants" name="infants" type="number" />
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
