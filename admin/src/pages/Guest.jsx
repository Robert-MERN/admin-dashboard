import React, { useEffect, useState } from 'react'
import { useStateContext } from "../contexts/ContextProvider";
import { DataGrid } from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { Header } from '../components';
import CircularProgress from '@mui/material/CircularProgress';
import Request from "../axios";
import { useAlert } from 'react-alert';
import IconButton from '@mui/material/IconButton';


const Guest = () => {
  const { setFormPage, loadStart, loadEnd} = useStateContext();
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();
  const axios = Request();

  useEffect(() => {
    setFormPage(true);
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await axios.post(`guest/find`);
        setGuests(res.data);
        setIsLoading(false);
      } catch (err) {
        alert.error(err.response.data.message)
        setIsLoading(false);
      }
    };
    fetchUsers();
  },[alert, setFormPage]);

  const deleteUser = async (id) => {
    loadStart();
    try {
      await axios.delete(`passenger/delete/${id}`);
      alert.success("user is deleted!");
      loadEnd();
    } catch (err) {
      alert.error(err.response.data.message);
      loadEnd();
    }
  }

// columns
const columns = [
  {
    field: '_id',
    headerName: 'ID',
    width: 160
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 160
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'birthDate',
    headerName: 'Date of birth',
    width: 150,
  },

  {
    field: 'roomNo',
    headerName: 'Room no',
    width: 150,
  },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: (params)=>{
      return(
        <p className={`${params.row.status === "Processing"? "text-yellow-600": params.row.status ===  "Succeed"? "text-green-500": "text-red-600"}`} >{params.row.status}</p>
      )
    },
    width: 150,
  },
  {
    field: 'country',
    headerName: 'Country',
    width: 150,
  },
  {
    field: 'city',
    headerName: 'City'
  },
  {
    field: 'postCode',
    headerName: 'Post code',
    width: 180,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 150,
  },
  {
    field: 'edit',
    headerName: 'Edit',
    renderCell: params => {
      return (
         <div key={params.row._id} className='flex gap-8 items-center' >
            <Link to={`/editguest/${params.row._id}`} >
              <button className='rounded-md py-1 px-3 text-white bg-teal-500 hover:bg-teal-400 transition-all' >Edit</button>
            </Link>
            <IconButton aria-label="delete">
              <DeleteIcon onClick={() => deleteUser(params.row._id)} className="text-red-600 hover:text-red-300 transition-all cursor-pointer" />
            </IconButton>
          </div>
      )
    },
    width: 150,
  },

];
  
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg' >
      <Header category="page" title="Hotels Booking" />
      <Box sx={isLoading?{display: 'flex', width: "100%", justifyContent: "center"}:{ height: 550, width: "100%" }}>
      {isLoading ?
          <CircularProgress /> :
        <DataGrid
          rows={guests}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={rows => rows?._id || "2"}
        />
      }
      </Box>
    </div>
  )
}

export default Guest