import React, { useEffect } from 'react'
import {useSearchParams} from "next/navigation"
import { useRouter } from 'next/router';
import { Box } from '@mui/material';

const success = () => {
    const router = useRouter();

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            router.push('/dashboard');
          }, 6000);
      
          return () => clearTimeout(redirectTimeout);
    }, [])

    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Box height={40} />
            <p style={{ textAlign: "center" }}>Transaction created successfully with ID: {useSearchParams().get('id')}</p>
            <p style={{ textAlign: "center" }}>Redirecting to dashboard shortly...</p>
        </Box>
    )
}

export default success
