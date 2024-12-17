"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';

const RedirectLogicLayout = () => {
  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <RedirectComponent />
      </Suspense>
    </>
  );
};

const RedirectComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  let redirect_url = searchParams.get("redirect_url");

  useEffect(() => {
    if (redirect_url) {
      localStorage.setItem("redirect_url", redirect_url);
    }

    // Redirect to /sign-in if the current path is "/"
    if (window.location.pathname === '/') {
      router.replace('/sign-in');
    }
  }, [redirect_url, router]);

  return <></>;
};

export default RedirectLogicLayout;
