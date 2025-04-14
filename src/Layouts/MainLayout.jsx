import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/shared/Navbar';

const MainLayout = () => {
        return (
                <div>
                <Navbar></Navbar>
                <Outlet></Outlet>
                        
                </div>
        );
};

export default MainLayout;