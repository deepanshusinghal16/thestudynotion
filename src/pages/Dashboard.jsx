import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/SideBar/Sidebar';

const Dashboard = () => {
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    if (authLoading || profileLoading) {
        return (<Spinner />);
    }




    return (
        <div className='flex  relative  min-h-[calc(100vh-3.5rem)] w-full'>
            <div className='absolute z-[10] top-0 left-0  h-full bg-black'>
                <Sidebar />
            </div>

            <div className='max-h-[calc(100vh-3.5rem)]  overflow-auto  w-full mx-auto '>
                <div className='mx-auto '>
                    <Outlet />

                </div>
            </div>
        </div>
    )
}

export default Dashboard
