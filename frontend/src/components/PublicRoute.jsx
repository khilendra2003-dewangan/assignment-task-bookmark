import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center text-xl text-white bg-slate-900">
                Loading...
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/bookmarklist" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
