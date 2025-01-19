import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

function safelyParseJSON(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Invalid JSON:", jsonString);
        return [];
    }
}

const initialState = {
    pastes: safelyParseJSON(localStorage.getItem("pastes")) || [], // Parse or fallback to []
};

// const initialState = {
//   pastes:localStorage.getItem("pastes")
//     ? JSON.parse(localStorage.getItem("pastes"))
//     :[]
// }

const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPastes: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item)=>item._id === paste._id);
            // console.log("Hii")
            if(index >= 0){
                toast.error("paste already exist")
                return;
            }
            if(paste.title == ""){
                toast.error("please Enter a Name")
                return; 
            }
            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success('Paste Created Successfully');
        },
        updateToPastes: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item)=>item._id === paste._id);
            if(index >= 0){
                state.pastes[index] = paste;

                localStorage.setItem("pastes", JSON.stringify(state.pastes));

                toast.success('Paste updated Successfully');
                
            }
        },
        resetAllPastes: (state, action) => {
            state.pastes = [];

            localStorage.removeItem("pastes");
        },
        removeAllPaste: (state, action) => {
            const pasteId = action.payload;
            console.log(pasteId);
            const index = state.pastes.findIndex((item)=>item._id === pasteId);
            if(index>=0){
                state.pastes.splice(index,1);
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                
                toast.success('Paste Deleted');
            }

        },
    },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeAllPaste } = pasteSlice.actions

export default pasteSlice.reducer