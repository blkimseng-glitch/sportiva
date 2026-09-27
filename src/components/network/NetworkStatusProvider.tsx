"use client";

import useNetwork from '../hooks/useNetwork';
import React, { useEffect } from 'react';
import NoInternetComponent from './NoInternetComponents';

const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const isOnline = useNetwork();

  useEffect(() => {
    if (!isOnline) {
      console.log("Offline now");
    } else {
      console.log("Online now");
    }
  }, [isOnline]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-gray-800 dark:text-white">
     
      {!isOnline ? <NoInternetComponent /> : children}
    </div>
  );
}

export default NetworkStatusProvider;