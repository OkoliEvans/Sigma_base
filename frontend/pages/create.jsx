import React from "react";
import Update from "@/components/Update";
import axios from "axios";
import { useState, useEffect } from 'react'

  export default function Create() {
    const [auth, setAuth] = useState(false);

    const retrievecookies = () => {
    axios.get('/api/votingcookieauthenticateAPI')
    .then (res => {
      if (res.status === 200) {
        setAuth(true)
      }
      else {
        console.log('Try again!')
        setAuth(false)
      }
    })
    .catch(err => {
      console.log(err)
      setAuth(false)
    })
    }
   
    useEffect(() => {
       retrievecookies();
     }, []);
     if (auth){
  return (
    <div>
      <Update />
    </div>
  )
    }
    else {
      return (
          <div className='lg:text-[240%] md:text-[240%] text-[200%] p-[12%] font-[600] text-center text-[#b00] bg-[#224]'>You must be authenticated to access this page!!</div>
      )
    }
};
