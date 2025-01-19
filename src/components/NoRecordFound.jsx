import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegShareSquare } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

function NoRecordFound() {
    return (
        <div>
            <div className="text-center mt-5 text-gray-500">
                <h1>No Record Found </h1>
                <div className="flex shadow-2xl card border p-4">
                    <div className="flex gap-2">
                        {
                            <div
                                className="bg-[#5F5F5F] w-[100px] h-[100px]"
                            />
                        }
                    </div>
                    <div className="text-justify ml-2 mr-2 gap-10">
                        <div><strong>Name: </strong> </div>
                        <div className='max-w-[19.5rem]'><strong>Description: </strong> </div>
                        <div><strong>Address: </strong>  </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-2">
                        <div className="flex flex-row gap-4 mt-2">
                            <button className="but">
                                <NavLink className="but shadow-2xl" to={`/admin}`}>
                                    <FaEdit className='Fa' />
                                </NavLink>
                            </button>
                            <button className="but">
                                <NavLink className="but shadow-2xl" to={`/admin`}>
                                    <MdOutlineRemoveRedEye className="ey" />
                                </NavLink>
                            </button>
                            <button
                                className="but shadow-2xl"
                            >
                                <RiDeleteBin6Line className='del' />
                            </button>
                            <button
                                className="but shadow-2xl"
                            >
                                <FaRegShareSquare className='sh' />
                            </button>
                        </div>
                        <button
                            className="but shadow-2xl-ser bg-blue-500 text-white rounded-md p-2"
                            onClick={() => handleShowOnGoogleMap('1st & 2nd Floor, Serene Tower, Pakharbaug Society, Ram Nagar, Bavdhan, Pune, Maharashtra')}
                        >
                            Summary
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoRecordFound
