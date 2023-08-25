import React, { useState } from "react";
import { CountDownTimer } from "./CountDownTimer";
import Link from "next/link";
import Modal from "./Modal";

const VoteCard = ({ eventAddress }) => {
  const [eventUri, setEventUri] = useState("");
  const [regDeadline, setRegDeadline] = useState(0);
  const [fee, setFee] = useState(0);
  const [detail, setDetail] = useState({});
  const [modal, setModal] = useState(false);
  const [tel, setTel] = useState();

  const handleClose = () => {
    //alert('closing');
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleSubmit = () => {};

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
