import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useaxiosSecure";
import * as React from 'react';
import Button from '@mui/material/Button';
import FullWidthTabs from "./Mydonationtab";


const MyDonationRequest = () => {
    const axiosSecure=useAxiosSecure();






    return (
        <div className="mx-auto">
            <h2 className="text-4xl text-center">Donation request</h2>
         {FullWidthTabs()}
     
        </div>
    );
};

export default MyDonationRequest;