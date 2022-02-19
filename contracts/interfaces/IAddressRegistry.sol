// SPDX-License-Identifier: MIT

pragma solidity 0.6.11;
pragma experimental ABIEncoderV2;

interface IAddressRegistry {
    function get_registry() external view returns (address);
}