import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import { Toaster } from 'react-hot-toast';
import ViewPastes from './components/viewPastes';
import UserList from './components/UserList';

const router = createBrowserRouter(
  [
    {
      path:'/',
      element:
        <div>
          <Navbar/>
          <UserList/>
        </div>
    },
    {
      path:'/admin',
      element:
        <div>
          <Navbar/>
          <Paste/>
        </div>
    },
    {
      path:'/createprof',
      element:
        <div>
          <Navbar/>
          <Home/>
        </div>
    },
    {
      path:'/pastes/:id',
      element:
        <div>
          <Navbar/>
          <ViewPastes/>
        </div>
    },
  ]
);

function App() {

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  )
}

export default App

