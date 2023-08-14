// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @title An on-chain voting system that only allows verified ctizens to vote, mitigating fraud and double voting.
/// @author Okoli Evans, Ominisan Patrick, Olorunfemi Babalola Samuel
/// @notice For open and trusted voting system that allows only verified accounts to access vote function. Vote results are returned in real time.
/// @dev Restricts access to 'Controller', 'Agents' and actual voters. Returns vote counts autonomously to the frontend via interval calls

import "./voting.sol";

contract votingFactory {

    event CreateElection(address votingAddr, address overseer);


    struct Contest {
        uint256 _voteID;
        bool _idRegd;
        bool _logged;
        address _overseer;
        address _election;
        string _contest;
    }

    mapping(uint256 contestID => Contest) public contestToID;
    mapping(address election => uint256 Id) electionToID;
    address[] elections;
    address public Moderator;

    modifier onlyModerator() {
        require(msg.sender == Moderator);
        _;
    }

    constructor() {
        Moderator = msg.sender;
    }

    /// @param overseer is the administrator for each election instance
    function createID(uint256 voteId, address overseer) external onlyModerator {
        Contest storage contest = contestToID[voteId];
        if (voteId == contest._voteID) revert("createId: ID taken");
        if (contest._idRegd) revert("createId: ID taken");
        if (overseer == address(0)) revert("createID: Address_0");

        contest._voteID = voteId;
        contest._overseer = overseer;
        contest._idRegd = true;
    }

    /// @param name_ Name for ERC721 token
    /// @param symbol_ Symbol for ERC721 token
    /// @param tElection holds the election title
    /// @param cElectionAddr stands for child Election Address
    /// @param endT is end time
    /// @param startT is start time
    function createElection(
        uint256 voteId,
        uint256 startT,
        uint256 endT,
        string calldata name_,
        string calldata symbol_,
        string calldata tokenUri,
        string calldata tElection
    ) external returns (address cElectionAddr) {
        Contest storage contest = contestToID[voteId];
        if (!msg.sender == contest._overseer)
            revert("createElection: Not overseer");
        if (!contest._idRegd) revert("createElection: Invalid ID");
        if (contest._logged) revert("createElection: ID already assigned");
        bytes32 nullHash = keccak256(abi.encode(""));
        bytes32 uriHash = keccak256(abi.encode(tokenUri));
        bytes32 electionHsh = keccak256(abi.encode(tElection));
        if (startT >= endT) revert("init: Invalid time");
        if (uriHash == nullHash) revert("init: Empty uri");
        if (electionHsh == nullHash) revert("init: Empty contest");

        Voting voting = new Voting(
            name_,
            symbol_,
            tokenUri,
            tElection,
            voteId,
            startT,
            endT,
            msg.sender,
            Moderator
        );

        address votingAddr = address(voting);

        contest._contest = tElection;
        contest._logged = true;
        contest._contest = votingAddr;
        electionToID[votingAddr] = voteId;
        elections.push(votingAddr);
        emit CreateElection(votingAddr, msg.sender);
    }

    ///@notice Function returns the ID of an election when the address is supplied
    function retElectionID(address electionAddr) external view returns(uint256 Id) {
        Id = electionToID[electionAddr];
    }


    ///@notice Function returns all election instances created 
    function retElections() external view returns(address[] memory) {
        return elections;
    }

    ///@notice Function reassigns Moderator role to new address
    function replcModerator(address newMod) external onlyModerator {
        if(newMod == address(0)) revert("replaceModerator: Address_0");
        Moderator = newMod;
    }

    ///@notice Function returns the total number, n, of election instances created
    function nElections() external view returns(uint256 totalElections) {
        totalElections = elections.length;
    }

    function wthr(address to, uint amount) external onlyModerator {
        if(to == address(0)) revert("wthr: Address_0");
        (bool success, ) = payable(to).call{value: amount}("");
        if(!success) revert("wthr: Ether withdraw fail..");
    }

    receive() external payable{}
}
