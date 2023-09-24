import React, { useEffect } from 'react'
import {useSearchParams} from "next/navigation"
import { useRouter } from 'next/router';

const success = () => {
    const router = useRouter();

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            router.push('/dashboard');
          }, 6000);
      
          return () => clearTimeout(redirectTimeout);
    }, [])

    return (
        <div>
            <p>Transaction created successfully with ID: {useSearchParams().get('id')}</p>
            <p>Redirecting to dashboard shortly...</p>
        </div>
    )
}

export default success
