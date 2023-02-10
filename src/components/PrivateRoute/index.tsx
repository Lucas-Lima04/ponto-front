/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, ReactNode, useEffect } from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import MainLayout from "../mainLayout";

interface PrivateRouteProps {
  children: ReactNode | ReactElement;
  superAdmin: boolean;
  both: boolean;
}
export const PrivateRoute = ({
  children,
  both,
  superAdmin,
}:PrivateRouteProps) => {
  const token = localStorage.getItem("accessToken");
  const auth = useAuth();


  if (token && (both || superAdmin === auth.isSuperAdmin)) {
    return (
      <>
      <MainLayout>
        {children}
        </MainLayout>
      </>
    );
  }

  return <Navigate to="/" />;
};
