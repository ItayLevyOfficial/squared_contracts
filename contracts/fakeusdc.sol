pragma solidity 0.6.11;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FakeUSDC is Ownable, ERC20 {
    constructor() public Ownable() ERC20("FakeUSDC", "USDC") {
        _setupDecimals(6);
    }

    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
    }

    /**
     * @notice Give the caller 10 USDC (10,000,000 units)
     */
    function gimmeSome() external {
        _mint(msg.sender, 10e6);
    }
}
