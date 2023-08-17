// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.21;

import {Test, console2} from "forge-std/Test.sol";
import "../src/contract/voting.sol";
import "../src/contract/votingFactory.sol";
import "../src/interface/IVoting.sol";

contract CounterTest is Test {
    votingFactory votingfactory;
    address Moderator = 0xc6d123c51c7122d0b23e8B6ff7eC10839677684d;
    address overseer = 0x49207A3567EF6bdD0bbEc88e94206f1cf53c5AfC;

    function setUp() public {
        votingfactory = new votingFactory();
        console2.log("Caller: ", msg.sender);
    }

    function test_createElection() public {
        vm.prank(overseer);
        (address childElection) = votingfactory.createElection(
            10,
            "National Election 2023",
            "NEN-2023",
            "https://ipfs.io/ipfs/QmX84bZL51sJ4g4M8XoWQnBWQJ4Fh1TbT8TgfW2yyfNft",
            "Presidential Election",
            1692275457
        );

        console2.log(childElection);
        votingfactory.retElections();
        votingfactory.retElectionID(childElection);

        votingfactory.replcModerator(Moderator);
    }


    

}
