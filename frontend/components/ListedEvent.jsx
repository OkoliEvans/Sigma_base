import React, { useState } from "react";
import { useContractRead } from "wagmi";
import ABI from "../Utils/ABI/factoryAbi.json";
import contractAddress from "@/Utils/contractAddress/factoryAddress";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../constants";
import VoteCard from "./VoteCard";

const ListedEvent = () => {
  const [election, setElection] = useState([]);
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: ABI,
    functionName: "retElections",
    onSuccess(data) {
      setElection(data);
    },
  });
  console.log(election);
  return (
    <div className="w-full mb-10">
      <Carousel responsive={responsive}>
        {election?.map((electionAddress, i) => (
          <VoteCard key={i} electionAddress={electionAddress} />
        ))}
      </Carousel>
    </div>
  );
};

export default ListedEvent;
