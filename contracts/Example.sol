// SPDX-License-Identifier: MPL-2.0
pragma solidity 0.6.12;

import {SafeMath} from "@openzeppelin/contracts/math/SafeMath.sol";

contract Example {
	using SafeMath for uint256;
	uint256 public value = 0;

	function add(uint256 v) external {
		value = value.add(v);
	}
}
