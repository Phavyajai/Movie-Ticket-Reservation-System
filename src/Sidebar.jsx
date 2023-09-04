import React, { useState } from "react";
import MyBookings from './MyBookings.jsx';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';


function SideBar() {

    let navigate = useNavigate();

    const toBooking = () => {
        console.log('clicked');
        navigate('/MyBookings');
        ReactDOM.render(
          <Router>
            <MyBookings/>
          </Router>,
          document.getElementById('root')
        );
      };

    const toAboutMe = () => {
        console.log('clicked');
        navigate('/AboutMe');
        ReactDOM.render(
          <Router>
            <iframe src="/AboutMe.html" style={{display: 'flex', width: '-webkit-fill-available', height: '100vh'}}></iframe>
          </Router>,
          document.getElementById('root')
        );
      };

    return (
        <Sidebar>
            <Menu className="sidebar">
                <MenuItem> Movies </MenuItem>
                <MenuItem onClick={() => toBooking()}> My Bookings </MenuItem>
                <MenuItem onClick={() => toAboutMe()}> About me </MenuItem>
            </Menu>
        </Sidebar>
    )
}

export default SideBar;