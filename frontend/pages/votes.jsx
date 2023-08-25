import React, { useState, useEffect } from "react";

import VoteCard from "@/components/VoteCard";
import axios from "axios";

export default function votes() {
  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(6);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 6);
  };

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
    <div className="flex flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-semibold text-blue-950">Votes</h2>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ml-12">
        <VoteCard />
      </div>
      <div className=" flex flex-row items-center justify-center pt-4 mt-4	">
        <button
          className=" bg-[#080E26] rounded-full p-4 text-gray-300 w-36 font-semibold"
          onClick={showMoreItems}
        >
          Load More
        </button>
      </div>
    </div>
  );
   }
   else {
    return (
        <div className='lg:text-[240%] md:text-[240%] text-[200%] p-[12%] font-[600] text-center text-[#b00] bg-[#224]'>You must be authenticated to access this page!!</div>
    )
  }
};

