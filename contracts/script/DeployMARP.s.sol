// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/MARP.sol";

contract DeployMARPScript is Script {
    function run() external {
        vm.startBroadcast();
        MARP marp = new MARP();
        console.log("============================================");
        console.log("MARP deployed!");
        console.log("Address:", address(marp));
        console.log("Network: Monad Testnet (10143)");
        console.log("============================================");
        console.log("Add to .env.local: NEXT_PUBLIC_MARP_ADDRESS=%s", address(marp));
        console.log("============================================");
        vm.stopBroadcast();
    }
}
