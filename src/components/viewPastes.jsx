import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

function viewPastes() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log(paste);

  const handleShare = () => {
    const shareData = {
      title: paste.title || "Untitled Paste",
      text: paste.title || "No content provided.",
      url: window.location.href,
    };


    navigator.clipboard.writeText(`${shareData.url}`)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch((error) => toast.error(`Failed to copy: ${error.message}`));

  };
  return (
    <div className='ViewCard'>
      <div className='flex flex-row mt-2 place-content-between'>
        <input
          className='p-2 rounded-2xl m-2 w-[15rem] ml-2 text-center'
          placeholder='Enter your title....'
          type="text"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        {paste.imgUrl && <img src={paste.imgUrl} alt="Paste" className='w-[300px] h-auto m-2' />}
        <div className='w-[20rem]'><strong>Address:</strong> {paste.address}</div>
      </div>

      <div className='flex flex-col w-[30rem] m-2'>
        <button className='share p-2  rounded-2xl m-2' onClick={handleShare}>
          Share
        </button>
        <textarea
          className='p-4  rounded-2xl m-10  mt-2 '
          value={paste.content}
          placeholder='Enter your Content hear'
          onChange={(e) => setValue(e.target.value)}
          disabled
          rows={20}
        />
      </div>
    </div>
  )
}

export default viewPastes
