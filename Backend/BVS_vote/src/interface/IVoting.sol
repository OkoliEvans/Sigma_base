// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IVoting {

    /// @notice To add vote administrators
    function addAgent(address agent, string calldata name, uint voteId) external returns(bool);

    /// @notice To remove vote administrators
    function rmAgent(address agent, uint voteId) external returns(bool);

    /// @notice To add vote candidates for a post
    function addCandidate(string calldata name, string calldata post, uint id, uint voteId) external returns(bool);

    /// @notice To remove vote candidates for a post
    function rmCandidate(string calldata name, uint voteId) external returns(bool);

    /// @notice To verify voters 
    function verify(address voter, uint voteId) external returns(bool);

    /// @notice To initialise a vote contest
    function init(uint start, uint end, uint voteId, string calldata contest) external returns(bool);

    /// @notice To start voting process
    function start(uint voteId) external;

    /// @notice To end voting process
    function end(uint voteId) external;

    /// @notice To display duration
    function time(uint voteId) external;

    /// @notice To collect votes
    function vote(uint voteId, string calldata candidate) external returns (bool);

    /// @notice To display results
    function result(uint voteId) external;

/// @notice for agents to attest for or against the vote
    function attest() external;

}