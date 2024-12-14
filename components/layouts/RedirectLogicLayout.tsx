"use client"
import { useSearchParams } from 'next/navigation';
import React, {Suspense, useEffect} from 'react'

const RedirectLogicLayout = () => {
  return(
    <>
        <Suspense fallback={<>Loading...</>}>
        <RedirectComponent />
        </Suspense>
    </>
  )
}

const RedirectComponent = ()=>{
    const searchParams = useSearchParams()
    let redirect_url = searchParams.get("redirect_url");

    useEffect(()=>{
        localStorage.setItem("redirect_url", redirect_url as string);
    }, [redirect_url])
    return  <></>
}

export default RedirectLogicLayout