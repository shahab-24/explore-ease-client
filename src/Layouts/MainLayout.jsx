import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const MainLayout = () => {
        return (
                <div>
                
                <Navbar></Navbar>
                <div className='min-h-[calc(100vh-70px)]'>
                <Outlet></Outlet>
                </div>
                <div>
                <Footer></Footer>
                </div>
                
                        
                </div>
        );
};

export default MainLayout;