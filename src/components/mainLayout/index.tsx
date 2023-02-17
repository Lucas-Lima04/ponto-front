import { ReactElement, ReactNode, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Dashboard, Person, AccessTime } from '@mui/icons-material';

import "./style.css";
import { AuthService } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { IUser } from "../../models/IUser";
import { Typography } from "@mui/material";

interface MainLayoutProps {
    children: ReactNode | ReactElement;
}
function MainLayout({children}: MainLayoutProps) {
    const [user, setUser] = useState<IUser>();

    const { logout, getCurrentUser } = useAuth();

    const fetchUser = async () => {
        setUser(await getCurrentUser());
    }
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
        <div className="sidebar">
            <div className="logo">
                <img src="/logo-ponto.png" alt="logo" />
            </div>
            <div className="menu">
                <NavLink to={'/home'}><span><Dashboard />Início</span></NavLink>
                {user?.isSuperAdmin ?
                    <NavLink to={'/professionals'}><span><Person/>Colaboradores</span></NavLink>
                    :
                    <NavLink to={'/clockins'}><span><AccessTime/>Ponto</span></NavLink>
                }
            </div>

        </div>
        <div className="topmenu">
            <Typography variant="h6" component="h2">
                {user?.name}
            </Typography>
            <span className="logout" onClick={logout}>Sair</span>
        </div>
        <div className="page">
            {children}
        </div>
        </>
    )
}

export default MainLayout;