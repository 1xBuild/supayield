//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract TokenVault is ERC4626, Ownable {
    using SafeERC20 for IERC20;

    mapping(address => uint256) public shareHolders;

    constructor(
        IERC20 _asset,
        string memory _name,
        string memory _symbol
    ) ERC4626(_asset) ERC20(_name, _symbol) {}

    /**
     * @notice Function to deposit assets and receive vault tokens in exchange
     * @param _assets Amount of the asset token
     */
    function _deposit(uint256 _assets) public {
        require(_assets > 0, "Deposit amount must be greater than zero");
        shareHolders[msg.sender] += deposit(_assets, msg.sender);
    }

    /**
     * @notice Function to allow msg.sender to withdraw their deposit plus accrued interest
     * @param _shares Amount of shares the user wants to convert
     * @param _receiver Address of the user who will receive the assets
     */
    function _withdraw(uint256 _shares, address _receiver) public {
        require(_shares > 0, "Withdraw amount must be greater than zero");
        require(_receiver != address(0), "Receiver address cannot be zero");
        require(shareHolders[msg.sender] >= _shares, "Insufficient shares");
        redeem(_shares, _receiver, msg.sender);
        shareHolders[msg.sender] -= _shares;
    }

    /**
     * @notice Returns the total balance of a user
     * @param _user Address of the user
     */
    function totalAssetsOfUser(address _user) public view returns (uint256) {
        return shareHolders[_user];
    }

    function _decimalsOffset() internal pure returns (uint8) {
        return 3;
    }
}