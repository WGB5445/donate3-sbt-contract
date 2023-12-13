// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Donate3SBT} from "../src/Donate3SBT.sol";

contract CounterTest is Test {
    Donate3SBT public donate3SBT;
    address public owner;

    function setUp() public {
        donate3SBT = new Donate3SBT(address(this), "Donate3SBT", "DBT");
        owner = address(0x1234);
    }

    function test_mint_to() public {
        donate3SBT.mintTo(owner);
        assertEq(donate3SBT.balanceOf(owner), 1);
    }

    function test_not_mint_to() public {
        donate3SBT.mintTo(owner);
        vm.expectRevert("Token already minted");
        donate3SBT.mintTo(owner);
    }

    function test_not_transfer() public {
        donate3SBT.mintTo(owner);
        vm.expectRevert();
        donate3SBT.safeTransferFrom(owner, address(0x4321), 0);
    }
}
