// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IVoting {

    function init2(string memory uri, uint start, uint end) external;


    /// @notice To add vote candidates for a post
    function addCandidate(string calldata name, string calldata post, uint id, uint voteId) external returns(bool);

    /// @notice To remove vote candidates for a post
    function rmCandidate(address addr) external returns(address[] memory);

    /// @notice To verify voters 
    function verify(uint vn) external;


    /// @notice To start voting process
    function startVote() external;

    /// @notice To end voting process
    function endVote() external;


    /// @notice To collect votes
    function vote(uint voteId, address candidate) external returns (bool);

}