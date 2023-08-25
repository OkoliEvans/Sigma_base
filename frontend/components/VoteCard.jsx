import React, { useState, useEffect } from "react";
import { CountDownTimer } from "./CountDownTimer";
import Link from "next/link";
import Modal from "./Modal";
import ABI from "../Utils/ABI/childABI.json";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { toast } from "react-toastify";


const VoteCard = ({ electionAddress }) => {
  const [regDeadline, setRegDeadline] = useState(0);
  const [modal, setModal] = useState(false);
  const [ verificationNo, setVerificationNo ] = useState("");
  const [tel, setTel] = useState(0);

  const handleClose = () => {
    //alert('closing');
    setModal(false);
  };

  const { config: config1 } = usePrepareContractWrite({
    address: electionAddress,
    abi: ABI,
    functionName: "verify",
    args: [ verificationNo ],
  });


  const {
    data: verifyData,
    isLoading: verifyIsLoading,
    write: verify,
  } = useContractWrite(config1);


  const {
    data: verifyWaitData,
    isLoading: verifyWaitIsLoading,
    isError,
    isSuccess,
  } = useWaitForTransaction({
    hash: verifyData?.hash,

    onSuccess: () => {
      setVerificationNo("");
      toast.success("Election successfully created");
    },

    onError(error) {
      toast.error("Encountered error: ", error);
    },
  });


  useEffect(() => {
    if (isError) {
      toast.error("Transaction error try again");
    }

    if (isSuccess) {
     setVerificationNo("");
    }
  }, [isError, isSuccess]);


  const handleCancel = () => {
    setModal(false);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    verify?.();
  };

  return (
    <div className="relative bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-5/6 h-full flex flex-col items-center justify-center">
      <div className="relative rounded-lg ">
        <img
          src="/ape2.png"
          width={500}
          height={500}
          className="rounded-lg h-[300px] w-[300px] object-cover"
        />
      </div>
      <div className="z-20 -mt-3">
        <CountDownTimer time={regDeadline} />
      </div>
      <div className="w-full h-full text-blue-950 text-lg font-semibold pl-3">
        <h2 className="relative my-2 text-lg">Vote Name</h2>
        <p className=" text-sm"> Admin || Participant</p>
        <p className="font-semibold text-[#080E26] text-sm">
          <button
            onClick={() => setModal(true)}
            className=" rounded-3xl bg-blue-950 text-white px-4 mt-2 py-2"
          >
            verify
          </button>
        </p>
      </div>

      <Modal
        isOpen={modal}
        onClose={handleClose}
        heading={"Verification"}
        positiveText={"Submit"}
        type={"submit"}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Phone Number:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="tel"
                placeholder="enter your phone number"
                required
                onChange={(e) => setTel(e.target.value)}
              />
            </label>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default VoteCard;
