import axios from "axios";
import { useEffect, useState } from "react";

const url = "https://jsonplaceholder.typicode.com/users";

  export default function voting() {
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

  const [candidates, setCandidates] = useState([]);

  const getCandidates = async () => {
    const res = await fetch(url);
    const candidates = await res.json();

    setCandidates(candidates);
  };

  useEffect(() => {
    getCandidates();
  }, []);

  if (auth){
  return (
    <div className="sm:px-16 px-6">
      <h2 className=" text-center text-2xl font-semibold">All Candidates</h2>
      <ul>
        {candidates.map((candidate) => {
          return (
            <li
              className="  border-b border-b-black py-3 flex justify-between items-center"
              key={candidate.id}
            >
              <p>Name: {candidate.name}</p>
              <button className="bg-blue-800 text-gray-200 py-2 px-4 rounded-md">
                Vote
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  )
    }
    else {
      return (
          <div className='lg:text-[240%] md:text-[240%] text-[200%] p-[12%] font-[600] text-center text-[#b00] bg-[#224]'>You must be authenticated to access this page!!</div>
      )
    }
};
