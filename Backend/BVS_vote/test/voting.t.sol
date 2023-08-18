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


    address user = 0x5D319012daEA8Fa10BbE8eBe79E4572988ecf0Ab;
    address user2 = 0x6d2e03b7EfFEae98BD302A9F836D0d6Ab0002766;
    address user3 = 0x388C818CA8B9251b393131C08a736A67ccB19297;
    address user4 = 0x763c396673F9c391DCe3361A9A71C8E161388000;
    address user5 = 0x814FaE9f487206471B6B0D713cD51a2D35980000;

    address c1 = 0xFA5f9EAa65FFb2A75de092eB7f3fc84FC86B5b18;
    address c2 = 0x6ED60d1b94b0bB67DcA1c3e69b4Ee2F2eF10136F;
    address c3 = 0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5;


    function setUp() public {
        vm.prank(Moderator);
        votingfactory = new votingFactory();
    }

    function test_createElection() public {
        vm.prank(overseer);
        address childElection = votingfactory.createElection(
            10,
            "National Election 2023",
            "NEN-2023",
            "https://ipfs.io/ipfs/QmX84bZL51sJ4g4M8XoWQnBWQJ4Fh1TbT8TgfW2yyfNft",
            "Presidential Election",
            1
        );

        votingfactory.rc(10);

        vm.prank(user);
        (bytes32 hsh) = IVoting(childElection).verify("A102567T");
        // console2.log("hash2", hsh);

        vm.prank(user2);
        IVoting(childElection).verify("1014332777");

        vm.prank(user3);
        IVoting(childElection).verify("101433277");

        vm.prank(user4);
        IVoting(childElection).verify("10143327");

        vm.prank(user5);
        IVoting(childElection).verify("10143327");

        vm.startPrank(overseer);
        IVoting(childElection).addCandidate(1, 49, c1, "Festus", "Secretary", "A doctor by profession, trustworthy");
        IVoting(childElection).addCandidate(1, 49, c2, "Olorun", "Secretary", "A lawyer by profession");

        IVoting(childElection).startVote(1692275459);
        vm.stopPrank();

        vm.prank(user);
        IVoting(childElection).vote(c1);

        vm.prank(user2);
        IVoting(childElection).vote(c2);

        vm.prank(user3);
        IVoting(childElection).vote(c2);

        vm.prank(user4);
        IVoting(childElection).vote(c2);

        vm.prank(user5);
        IVoting(childElection).vote(c2);


        IVoting(childElection).winnerName();

    }

    // function test_tokenId() public {
    //     test_createElection();

    // }
}
