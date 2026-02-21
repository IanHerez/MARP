// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/BlitzCollection.sol";

contract DeployScript is Script {
    function run() external {
        // Lee private key del environment o flag --private-key
        vm.startBroadcast();

        // Base URI para metadata (puedes cambiar después)
        string memory baseURI = "https://api.example.com/metadata/";
        
        // Deploy
        BlitzCollection collection = new BlitzCollection(baseURI);

        console.log("============================================");
        console.log("BlitzCollection deployed!");
        console.log("Address:", address(collection));
        console.log("Network: Monad Testnet (10143)");
        console.log("============================================");
        console.log("");
        console.log("Items iniciales:");
        console.log("  1. Blitz Badge (ilimitado)");
        console.log("  2. Builder Pass (max 100)");
        console.log("  3. Monad OG (max 50)");
        console.log("");
        console.log("Siguiente paso:");
        console.log("  Copia la direccion a frontend/.env.local");
        console.log("============================================");

        vm.stopBroadcast();
    }
}
