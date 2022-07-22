import React, { useState } from 'react'
import { Header, LocationsSearch } from '../components';
import { useStateContext } from "../contexts/ContextProvider";
import Request from "../axios";
import { useAlert } from 'react-alert';


const AddPassenger = () => {
  const { loadStart, loadEnd } = useStateContext();
  const alert = useAlert();
  const axios = Request();

  const [editUser, setEditUser] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const handleEditUser = (e, perm) => {
    if (perm === "showDepart") {
      setEditUser(prev => ({ ...prev, showArrive: false, [perm]: true }));
    } else if (perm === "showArrive") {
      setEditUser(prev => ({ ...prev, showDepart: false, [perm]: true }));
    }
    setEditUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createPassenger = async (e) => {
    e.preventDefault();
      loadStart();
      try {
        const { showDepart, showArrive, ...rest } = editUser
        await axios.post(`passenger/create`, rest);
        alert.success("passenger is created!");
        loadEnd();
      } catch (err) {
        alert.error(err.response.data.message);
        loadEnd();
      }
  }
  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl' >
      <Header title="Add Flight Booking" category="Page" />
      <form onSubmit={createPassenger} className="w-350 h-full transition-all" >
        <div>
          <div className='mb-12 flex flex-col gap-4' >
            <div className="flex items-center justify-between" >
              <div className="flex items-center gap-4" >
                <label className='text-18 font-bold text-gray-600'>Email:</label>
              </div>
            </div>

            <input required value={editUser?.email || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 `} placeholder="email" name="email" type="email" />

          </div>

          <div className='mb-12 flex flex-col gap-4' >
            <div className="flex items-center justify-between" >
              <div className="flex items-center gap-4" >
                <label className='text-18 font-bold text-gray-600'>First Name:</label>
              </div>

            </div>

            <input required value={editUser?.firstName || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 `} placeholder="name" name="firstName" type="text" />

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
                <label className='text-18 font-bold text-gray-600'>Departure Date:</label>
              </div>

            </div>
            <input required value={editUser?.departureDate || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400`} name="departureDate" type="date" />
          </div>

          <div className='mb-12 flex flex-col gap-4' >
            <div className="flex items-center justify-between" >
              <div className="flex items-center gap-4" >
                <label className='text-18 font-bold text-gray-600'>Arrival Date:</label>
              </div>
            </div>
            <input required value={editUser?.arrivalDate || ""} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400`} name="arrivalDate" type="date" />
          </div>



          <div className='mb-12 flex flex-col gap-4' >
            <div className="flex items-center justify-between" >
              <div className="flex items-center gap-4" >
                <label className='text-18 font-bold text-gray-600'>Departure Location:</label>
              </div>

            </div>

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

          <div className='mb-12 flex flex-col gap-4' >
            <div className="flex items-center justify-between" >
              <div className="flex items-center gap-4" >
                <label className='text-18 font-bold text-gray-600'>Arrival Location:</label>
              </div>

            </div>

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

          {/* <div className='mb-12 flex flex-col gap-4' >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-4" >
                  <label className='text-18 font-bold text-gray-600'>Airline:</label>
                  <p className='text-14 text-gray-400 cursor-default' >{user.airline || ""}</p>
                </div>
             
              </div>
              <select value={editUser?.airline || ""} onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400`} name="airline"  >
              
              </select>
            </div> */}

          <div className='mb-12 flex flex-col gap-4' >
            <div className="flex items-center justify-between" >
              <div className="flex items-center gap-4" >
                <label className='text-18 font-bold text-gray-600'>Class:</label>
              </div>

            </div>

            <select value={editUser?.class || ""} onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400`} name="class"  >
              <option value={"ECONOMY"}>Economy</option>
              <option value={"PREMIUM_ECONOMY"}>Premium Economy</option>
              <option value={"BUSINESS"}>Business Class</option>
              <option value={"FIRST"}>First Class</option>
            </select>
          </div>

          <h1 className='text-24 font-bold text-gray-500 mb-6' >Passengers*</h1>

          <div className='mb-12 flex flex-col gap-4' >
            <div className="flex items-center justify-between" >
              <div className="flex items-center gap-4" >
                <label className='text-18 font-bold text-gray-600'>Adults</label>
              </div>

            </div>
            <input required value={editUser?.adults} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400`} placeholder="1" name="adults" type="number" />
          </div>

          <div className='mb-12 flex flex-col gap-4' >
            <div className="flex items-center justify-between" >
              <div className="flex items-center gap-4" >
                <label className='text-18 font-bold text-gray-600'>Children</label>
              </div>

            </div>
            <input value={editUser?.children} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400`} name="children" type="number" />
          </div>

          <div className='mb-12 flex flex-col gap-4' >
            <div className="flex items-center justify-between" >
              <div className="flex items-center gap-4" >
                <label className='text-18 font-bold text-gray-600'>Infants</label>
              </div>
            </div>
            <input value={editUser?.infants} autoComplete="false" autoCorrect='false' onChange={handleEditUser} className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400`} name="infants" type="number" />
          </div>
          <div>
            <button type='submit' className="px-6 py-2 bg-teal-500 hover:bg-teal-400 transition-all text-white" >Create</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddPassenger
