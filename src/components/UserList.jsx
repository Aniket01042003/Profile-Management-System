import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegShareSquare } from "react-icons/fa";
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from "react-icons/md";
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
      <div className="flex mt-5 seac flex-col gap-4">
        <input
          className="p-2 ser rounded-2xl min-w-[100px] mt-5"
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
      <div className="flex flex-col gap-5">
        <button className='w-[10rem] p-2 rounded-2xl m-2' onClick={handleShare}>
          <div className='w-[10rem] flex share'>Share Now <FaRegShareSquare className='sh' /></div>
        </button>
        {filterData.length > 0 ? (
          filterData.map((paste) => (
            <div key={paste._id} className="flex card shadow-2xl border p-4">
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
                <div className='max-w-[19.5rem]'><strong>Description: </strong>{truncateText(paste.content, 13)}</div>
                <div><strong>Address: </strong> {truncateText(paste.address, 15)}</div>
              </div>
              <div className="flex flex-col gap-4 mt-2">
                <button className="but1">
                  <NavLink className="but shadow-2xl" to={`/pastes/${paste?._id}`}>
                    <MdOutlineRemoveRedEye className="ey" />
                  </NavLink>
                </button>
                <button
                  className="but shadow-2xl-ser w-[12rem] bg-blue-500 text-white rounded-md p-2"
                  onClick={() => handleShowOnGoogleMap(paste.address)}
                >
                  Summary
                </button>
              </div>
            </div>
          ))
        ) : (
          <NoRecordFound/>
        )}
      </div>
    </div>
  );
}

export default Paste;
