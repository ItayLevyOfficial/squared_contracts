pragma solidity 0.6.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FakeSQRD is Ownable, ERC20 {
    constructor() public Ownable() ERC20("FakeSQRD", "SQRD") {
        _setupDecimals(6);
    }

    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
    }

    /**
     * @notice Give the caller 10 SQRD (10,000,000 units)
     */
    function gimmeSome() external {
        _mint(msg.sender, 10e6);
    }
}
