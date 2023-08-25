import { useEffect, useState } from "react";

const url = "https://jsonplaceholder.typicode.com/users";

const voting = () => {
  const [candidates, setCandidates] = useState([]);

  const getCandidates = async () => {
    const res = await fetch(url);
    const candidates = await res.json();

    setCandidates(candidates);
  };

  useEffect(() => {
    getCandidates();
  }, []);

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
  );
};

export default voting;
