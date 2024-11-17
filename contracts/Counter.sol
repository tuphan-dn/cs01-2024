// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Counter is Ownable {
  uint256 public counter;

  event Increase(address indexed account, uint256 counter);

  constructor() Ownable(msg.sender) {
    counter = 0;
  }

  function increase() public onlyOwner {
    counter = counter + 1;
    emit Increase(msg.sender, counter);
  }
}