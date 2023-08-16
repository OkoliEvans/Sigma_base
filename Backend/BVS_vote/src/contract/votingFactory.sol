// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

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
        address _overseer;
        address _election;
        string _contest;
    }

    mapping(uint256 contestID => Contest) public contestToID;
    mapping(address election => uint256 Id) electionToID;
    address[] public elections;
    address public Moderator;

    modifier onlyModerator() {
        require(msg.sender == Moderator);
        _;
    }

    constructor() {
        Moderator = msg.sender;
    }

    /// @param name_ Name for ERC721 token
    /// @param symbol_ Symbol for ERC721 token
    /// @param cElectionAddr stands for child Election Address
    /// @param endT is end time
    /// @param startT is start time
    function createElection(
        uint256 voteId,
        uint256 startT,
        uint256 endT,
        string calldata name_,
        string calldata symbol_,
        string calldata tokenUri
    ) external returns (address cElectionAddr) {
        Contest storage contest = contestToID[voteId];
        if (voteId == contest._voteID) revert("createElection: ID taken");
        bytes32 nullHash = keccak256(abi.encode(""));
        bytes32 uriHash = keccak256(abi.encode(tokenUri));
        if (startT >= endT) revert("init: Invalid time");
        if (uriHash == nullHash) revert("init: Empty uri");

        Voting voting = new Voting(
            name_,
            symbol_,
            tokenUri,
            voteId,
            startT,
            endT,
            msg.sender,
            Moderator
        );

        address votingAddr = address(voting);

        contest._voteID = voteId;
        contest._idRegd = true;
        contest._overseer = msg.sender;
        contest._election = votingAddr;
        contest._contest = name_;
        electionToID[votingAddr] = voteId;
        elections.push(votingAddr);
        cElectionAddr = votingAddr;
        emit CreateElection(votingAddr, msg.sender);
    }

    ///@notice Function returns the ID of an election when the address is supplied
    function retElectionID(
        address electionAddr
    ) external view returns (uint256 Id) {
        Id = electionToID[electionAddr];
    }

    ///@notice Function returns all election instances created
    function retElections() external view returns (address[] memory) {
        return elections;
    }

    ///@notice Function reassigns Moderator role to new address
    function replcModerator(address newMod) external onlyModerator {
        if (newMod == address(0)) revert("replaceModerator: Address_0");
        Moderator = newMod;
    }

    ///@notice Function returns the total number, n, of election instances created
    function nElections() external view returns (uint256 totalElections) {
        totalElections = elections.length;
    }

    function wthr(address to, uint amount) external onlyModerator {
        if (to == address(0)) revert("wthr: Address_0");
        (bool success, ) = payable(to).call{value: amount}("");
        if (!success) revert("wthr: Ether withdraw fail..");
    }

    receive() external payable {}
}
