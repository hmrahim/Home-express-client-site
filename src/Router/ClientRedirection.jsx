import React, {  useContext } from 'react';
import { AuthContext } from '../Pages/Dashboard/AuthClient/AuthContext';
import { useNavigate } from 'react-router-dom';

const ClientRedirection = ({children}) => {
    const {rol} = useContext(AuthContext)
    // console.log(rol);
    const navigate = useNavigate()
    if(rol === "user"){
        return navigate("/")
    }
    return children
};

export default ClientRedirection;