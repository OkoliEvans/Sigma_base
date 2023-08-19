// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/contract/votingFactory.sol";
import "../src/interface/IVoting.sol";

contract CounterScript is Script {
    votingFactory public votingfactory;
    function setUp() public {}

    function run() public {
        address deployer = 0xc6d123c51c7122d0b23e8B6ff7eC10839677684d;
        address overseer = 0x49207A3567EF6bdD0bbEc88e94206f1cf53c5AfC;

        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        uint256 overseerKey = vm.envUint("PRIVATE_KEY3");

        vm.startBroadcast(deployerKey);
    }
}
