import axios from "axios";
import { useEffect, useState } from "react"
import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        axios
            .get('/api/auth/users/me/')
            .then(() => {
                setIsAuthenticated(true);
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes