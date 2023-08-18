// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IVoting {

    /// @notice To add vote candidates for a post
    function addCandidate(uint id, uint age, address addr, string calldata name, string calldata post, string calldata desc) external;

    /// @notice To remove vote candidates for a post
    function rmCandidate(address addr) external returns(address[] memory);

    /// @notice To verify voters 
    function verify(string memory vn) external returns(bytes32);

    // function retVoter(address voter) external view returns(Voter memory);

    /// @notice To start voting process
    function startVote(uint end) external;

    /// @notice To end voting process
    function endVote() external;


    /// @notice To collect votes
    function vote(address candidate) external;

    function winnerName() external returns(string memory _winner);

}