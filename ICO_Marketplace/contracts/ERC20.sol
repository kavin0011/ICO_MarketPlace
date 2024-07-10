//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeeplin/contracts/token/ERC@)/ERC20.sol";

contract ERC20Token is ERC20{
     contructor()ERC20("@mystery","KGF"){
         _mint(msg.sender,50000**18);
     }
}