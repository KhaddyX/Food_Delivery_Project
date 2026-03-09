import React from 'react';
import './Menubar.css';

const Menubar = ({toggleSidebar}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom menubar-container">
        <div className="container-fluid">
            <button className="btn btn-primary sidebar-toggle-btn" id="sidebarToggle" onClick={toggleSidebar}>
                <i className='bi bi-list'></i>
            </button>
        </div>
    </nav>
  )
}

export default Menubar;