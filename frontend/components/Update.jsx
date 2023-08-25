import React, { useEffect, useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ABI from "../Utils/ABI/factoryAbi.json";
import contractAddress from "../Utils/contractAddress/factoryAddress";
import { toast } from "react-toastify";
// import main from "../components/upload.mjs";

const Update = () => {
  const [id, setid] = useState(0);
  const [eNftName, setEnftName] = useState("");
  const [eNftSymbol, setENftSymbol] = useState("");
  const [contest, setContest] = useState("");
  const [regStartDateAndTime, setRegStartDateAndTime] = useState(0);
  const tokenuri = "QmU4xfVFWN3MjBu8T95vDv7482u5YPDCy1U4EMNK6Zyk2W";

    const { config: config1 } = usePrepareContractWrite({
      address: contractAddress,
      abi: ABI,
      functionName: "createElection",
      args: [
        id,
        eNftName,
        eNftSymbol,
        tokenuri,
        contest,
        regStartDateAndTime,
      ],
    });

    const {
      data: createEventData,
      isLoading: createEventIsLoading,
      write: create,
    } = useContractWrite(config1);

    const {
      data: createWaitData,
      isLoading: createWaitIsLoading,
      isError,
      isSuccess,
    } = useWaitForTransaction({
      hash: createEventData?.hash,

      onSuccess: () => {
        setid(0);
        setEnftName("");
        setENftSymbol("");
        setContest("");
        setRegStartDateAndTime(0);
        toast.success("Election successfully created");
      },

      onError(error) {
        toast.error("Encountered error: ", error);
      },
    });


    const handleElectionCreation = async (e) => {
      e.preventDefault();

      create?.();
    };

    useEffect(() => {
      if (isError) {
        toast.error("Transaction error try again");
      }

      if (isSuccess) {
        setid(0);
        setEnftName("");
        setENftSymbol("");
        setContest("");
        setRegStartDateAndTime(0);
      }
    }, [isError, isSuccess]);

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleElectionCreation} className="">
        <label>
          Vote ID:
          <br />
          <input
            className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
            type="number"
            placeholder="Enter your Vote ID"
            onChange={(e) => setid(e.target.value)}
          />
        </label>
        <label>
          Vote NFT Name:
          <br />
          <input
            className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
            type="text"
            placeholder="Enter Preferred NFT Name"
            onChange={(e) => setEnftName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Vote NFT Symbol:
          <br />
          <input
            className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
            type="text"
            placeholder="Vote NFT Symbol"
            onChange={(e) => setENftSymbol(e.target.value)}
          />
        </label>

        <br />
        <label>
          Contest Name:
          <br />
          <input
            className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
            type="text"
            placeholder="Event NFt sympol"
            onChange={(e) => setContest(e.target.value)}
          />
        </label>

        <br />
        <label>
          Election start date and time:
          <br />
          <input
            className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
            type="datetime-local"
            placeholder="set election start date and time"
            onChange={(e) => {
              const timeString = e.target.value;
              const date = new Date(timeString);
              const epochTime = Math.floor(date.getTime() / 1000);
              setRegStartDateAndTime(epochTime);
            }}
          />
        </label>

        <button
          className="py-2 outline-none mt-4 w-full hover:bg-blue-900 bg-blue-950 text-white font-semibold rounded-lg"
          type="submit"
        >
          Create Election
        </button>
      </form>
    </div>
  );
};

export default Update;
