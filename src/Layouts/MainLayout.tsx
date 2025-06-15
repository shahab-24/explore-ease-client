import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const MainLayout = () => {
        return (
                <div>
                
                <div className='top-0'>
                <Navbar></Navbar>
                </div>
                <div className='min-h-[calc(100vh-70px)] mt-10'>
                <Outlet></Outlet>
                </div>
                <div>
                <Footer></Footer>
                </div>
                
                        
                </div>
        );
};

export default MainLayout;