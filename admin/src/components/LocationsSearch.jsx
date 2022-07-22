import React from 'react'
import { readableData } from '../utils/patternData';
import Data from "../data/dumm.json";

const LocationsSearch = ({ func, val, ph, name, toShow, editUser, show }) => {
    const selectLocation = (value) => {
        if (name === "departureLocation") {
            if (toShow[name] !== value) {
                editUser(prev => ({ ...prev, [name]: value, [show]: false }));
            }
        } else if (name === "arrivalLocation") {
            if (toShow[name] !== value) {
                editUser(prev => ({ ...prev, [name]: value, [show]: false }));
            }
        }
    }
    const data = readableData(Data);
    const searchedData = data.filter((i) => {
        return i.city.toLowerCase().includes(val.toLowerCase()) || i.iata.toLowerCase().includes(val.toLowerCase())
    }).slice(0, 10);
    return (
        <div className='w-full relative' >
            <input
                value={val}
                onChange={(e) => func(e, show)}
                type="search"
                className={`p-2 outline-none border-gray-300 border-1 transition-all duration-400 w-full`}
                autoComplete="false"
                autoCorrect='false'

                placeholder={ph || "Search."}
                name={name}
            />
            {(val && toShow[show]) &&
                <div style={{ boxShadow: "rgba(6, 3, 3, 0.35) 0px 5px 15px" }} className='absolute w-full top-11 bg-white max-h-96 rounded-lg z-50 overflow-y-scroll' >
                    {searchedData.map((i, index) => (
                        <div
                            key={index}
                            className='w-full px-3 py-2 hover:underline cursor-pointer' >
                            <p className='text-14 font-medium text-gray-600 capitalize w-64 text-ellipsis whitespace-nowrap overflow-hidden'
                                onClick={() => selectLocation(i.iata)}
                            >
                                {i.iata.toUpperCase()}, {i.city}
                            </p>
                        </div>
                    ))
                    }
                </div>
            }
        </div>
    )
}

export default LocationsSearch