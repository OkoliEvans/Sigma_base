import Modal from "@/components/Modal";
import React, { useState } from "react";

const Admin = () => {
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const [addCandid, setAddCandid] = useState("");
  const [removeCandid, setRemoveCandid] = useState("");

  const handleClose = () => {
    //alert('closing');
    setAdd(false);
    setRemove(false);
  };

  const handleCancel = () => {
    setAdd(false);
    setRemove(false);
  };

  const handleSubmit = () => {};

  return (
    <div className="sm:px-16 px-6">
      <div className=" border-b border-b-black py-3 flex justify-between items-center">
        <p>Add Candidate</p>
        <button
          onClick={() => setAdd(true)}
          className=" bg-blue-800 text-gray-200 py-2 px-4 rounded-md"
        >
          Add Candidate
        </button>
      </div>
      <div className=" border-b border-b-black py-3 flex justify-between items-center">
        <p>Remove Candidate</p>
        <button
          onClick={() => setRemove(true)}
          className=" bg-blue-800 text-gray-200 py-2 px-4 rounded-md"
        >
          Remove Candidate
        </button>
      </div>
      <div className=" border-b border-b-black py-3 flex justify-between items-center">
        <p>Start Vote</p>
        <button className=" bg-blue-800 text-gray-200 py-2 px-4 rounded-md">
          Start Vote
        </button>
      </div>
      <div className=" border-b border-b-black py-3 flex justify-between items-center">
        <p>End Vote</p>
        <button className=" bg-blue-800 text-gray-200 py-2 px-4 rounded-md">
          End Vote
        </button>
      </div>

      <Modal
        isOpen={add}
        onClose={handleClose}
        heading={"Candidate"}
        positiveText={"Submit"}
        type={"submit"}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Add Candidate:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="text"
                placeholder="enter address"
                required
                onChange={(e) => setAddCandid(e.target.value)}
              />
            </label>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={remove}
        onClose={handleClose}
        heading={"Candidate"}
        positiveText={"Submit"}
        type={"submit"}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Remove Candidate:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="text"
                placeholder="enter address"
                required
                onChange={(e) => setRemoveCandid(e.target.value)}
              />
            </label>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Admin;
