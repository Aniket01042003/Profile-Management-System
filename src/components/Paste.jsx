import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllPaste } from '../redux/pasteSlice';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegShareSquare } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi";
import NoRecordFound from './NoRecordFound';

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const dispatch = useDispatch();

  const filterData = pastes.filter(
    (paste) =>
      paste.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      paste.address.toLowerCase().includes(searchAddress.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeAllPaste(pasteId));
  }

  const handleShare = (paste) => {
    const shareData = {
      title: paste.title,
      text: paste.content,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData)
        .catch((error) => toast.error(`Sharing failed: ${error.message}`));
    } else {
      navigator.clipboard.writeText(`${paste.title}\n${paste.content}\n${shareData.url}`)
        .then(() => toast.success("Link copied to clipboard!"))
        .catch((error) => toast.error(`Failed to copy: ${error.message}`));
    }
  };

  const handleShowOnGoogleMap = (address) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, '_blank');
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}....`;
    }
    return text;
  };

  return (
    <div className='dis'>
      <div className="flex mt-5 seac flex-col w-[60vw] gap-4">
        <input
          className="p-2 ser rounded-2xl min-w-[100px]  "
          type="search"
          placeholder="Search by name"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          className="p-2 ser rounded-2xl min-w-[100px]"
          type="search"
          placeholder="Search by address"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
        />
      </div>
      <div className="flex au">
        <NavLink to={`/createprof`}>
          <HiOutlineUserAdd className='ic w-[2rem] h-[3rem]' />
        </NavLink>
      </div>
      <div className="flex flex-col gap-5">
        {filterData.length > 0 ? (
          filterData.map((paste) => (
            <div key={paste._id} className="flex shadow-2xl card border p-4">
              <div className="flex gap-2">
                {paste.imgUrl && (
                  <img
                    src={paste.imgUrl}
                    alt="Paste"
                    className="w-[100px] h-[100px]"
                  />
                )}
              </div>
              <div className="text-justify ml-2 mr-2 gap-10">
                <div><strong>Name: </strong> {paste.title}</div>
                <div className='max-w-[19.5rem]'><strong>Description: </strong>{truncateText(paste.content, 10)}</div>
                <div><strong>Address: </strong> {truncateText(paste.address, 10)}</div>
              </div>
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex flex-row gap-4 mt-2">
                  <button className="but">
                    <NavLink className="but shadow-2xl" to={`/createprof?pasteId=${paste._id}`}>
                      <FaEdit className='Fa' />
                    </NavLink>
                  </button>
                  <button className="but">
                    <NavLink className="but shadow-2xl" to={`/pastes/${paste._id}`}>
                      <MdOutlineRemoveRedEye className="ey" />
                    </NavLink>
                  </button>
                  <button
                    className="but shadow-2xl"
                    onClick={() => handleDelete(paste._id)}
                  >
                    <RiDeleteBin6Line className='del' />
                  </button>
                  <button
                    className="but shadow-2xl"
                    onClick={() => handleShare(paste)}
                  >
                    <FaRegShareSquare className='sh' />
                  </button>
                </div>
                <button
                  className="but shadow-2xl-ser bg-blue-500 text-white rounded-md p-2"
                  onClick={() => handleShowOnGoogleMap(paste.address)}
                >
                  Summary
                </button>
              </div>
            </div>
          ))
        ) : (
          //No Record Found Code
          <NoRecordFound/>
        )}
      </div>
    </div>
  );
}

export default Paste;
