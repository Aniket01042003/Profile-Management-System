import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav class="navbar pr-10 navbar-light bg-light">
      <span className="item">
        <NavLink className={'font-medium'} to={"/"}>
          Home
        </NavLink>
      </span>
      <span className="item">
        <NavLink className={'font-medium'} to={"/createprof"}>
          Create profile
        </NavLink>
      </span>
      <span className="item">
        <NavLink className={'font-medium'} to={"/admin"}>
          Admin
        </NavLink>
      </span>
    </nav>
  )
}

export default Navbar
{/* <div className='flex  flex-row w-[50vw] gap-4 place-content-evenly'> */ }
//       <NavLink to={"/"}>
//         Home
//       </NavLink>
//       <NavLink to={"/userList"}>
//         User Profile List
//       </NavLink>
//       <NavLink to={"/pastes"}>
//         Admin
//       </NavLink>
//     </div>
{/* <nav className="navbar navbar-light bg-light">
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <a class="nav-link active" href="#">Active</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
      </nav> */}