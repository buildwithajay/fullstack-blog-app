import React from 'react'
import { isAuthenticate } from '../Auth/Auth'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
        if(!isAuthenticate()){
            return <Navigate to={'/login'} />
        }
        return <Outlet/>
}

export default ProtectedRoute
