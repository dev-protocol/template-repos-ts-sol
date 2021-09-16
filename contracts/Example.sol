// SPDX-License-Identifier: MPL-2.0
pragma solidity =0.8.7;

import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {
	Initializable
} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Example is Initializable {
	using SafeMath for uint256;
	uint256 public value;

	function initialize(uint256 initialValue) external initializer {
		value = initialValue;
	}

	function add(uint256 v) external {
		value = value.add(v);
	}
}
