import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';

function Home() {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [address, setAddress] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const pasteId = searchParams.get("pasteId");

    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content);
            setImgUrl(paste.imgUrl || "");
            setAddress(paste.address || "");
        }
    }, [pasteId])

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const options = {
                    maxSizeMB: 1, // Set max size for the image
                    useWebWorker: true
                };
                const compressedFile = await imageCompression(file, options);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImgUrl(reader.result); // Save the base64 image data
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error("Error during image compression:", error);
            }
        }
    };

    const handleShare = () => {
        const shareData = {
            title: title || "Untitled Profile",
            text: value || "No content provided.",
            url: window.location.href,
        };

        navigator.clipboard.writeText(`${shareData.url}`)
            .then(() => toast.success("Link copied to clipboard!"))
            .catch((error) => toast.error(`Failed to copy: ${error.message}`));
    };

    function handleClear() {
        setTitle('');
        setValue('');
        setImgUrl('');
        setAddress('');
        setSearchParams({});
    }

    function createpaste() {
        const paste = {
            title: title,
            content: value,
            imgUrl,
            address,
            _id: pasteId || Date.now().toString()
        }
        if (pasteId) {
            dispatch(updateToPastes(paste));
        }
        else {
            dispatch(addToPastes(paste));
        }
        handleClear();
    };

    return (
        <div className='flex'>
            <div className='border shadow-2xl-card maink w-[50rem] mt-10 p-10'>
                <h1 className="text-2xl h1h fontcol font-bold mb-4">
                    {pasteId ? "Update Profile" : "New Profile"}
                </h1>
                <div className='flex flex-col mt-2 gap-4'>
                    <input
                        className='p-2 rounded-2xl m-2 w-[60%]'
                        placeholder='Enter your Name'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        className='p-2 rounded-2xl m-2 w-[60%]'
                        placeholder='Enter your address'
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                        className='p-2 rounded-2xl m-2 w-[60%]'
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    {imgUrl && <img src={imgUrl} alt="Uploaded" className='w-[200px] h-auto m-2' />}
                    <textarea
                        className='p-4 rounded-2xl mt-2'
                        value={value}
                        placeholder='Description .....'
                        onChange={(e) => setValue(e.target.value)}
                        rows={10}
                    />
                    <button
                        className='p-2 rounded-2xl mt-2'
                        onClick={createpaste}>
                        {pasteId ? "Update Profile" : "Create Profile"}
                    </button>
                    <button
                        className='p-2 rounded-2xl mt-2'
                        onClick={handleClear}>
                        Clear
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Home;