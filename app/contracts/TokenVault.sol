//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Remove the Uniswap import and add the interface definition
interface IUniswapV2Router02 {
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
}

contract TokenVault is ERC4626, Ownable {
    using SafeERC20 for IERC20;

    mapping(address => uint256) public shareHolders;

    // Add new state variables
    IERC20 public constant XBNB = IERC20(0x4A468E0793bD3c434aa81A66F66D8Cf467cf68Ea);
    IERC20 public constant GAS = IERC20(0x1CE16390FD09040486221e912B87551E4e44Ab17);
    IUniswapV2Router02 public constant CARROT_FI_ROUTER = IUniswapV2Router02(0x327382865404847b9Bb074e69A976337d866BE35);

    constructor(
        IERC20 _asset,
        string memory _name,
        string memory _symbol
    ) ERC4626(_asset) ERC20(_name, _symbol) {}


    function depositAssets(uint _assets) public {
        require(_assets > 0, "Deposit less than Zero");
        shareHolders[msg.sender] = shareHolders[msg.sender] + deposit(_assets, msg.sender);
        // TODO Swap half of the deposit assets for GAS
        uint256 halfAssets = _assets / 2;
        _swapAssetsForGAS(halfAssets);
    }

    /**
     * @notice Swaps the amount of assets from the vault for GAS using Carrot-Fi
     * @param _amount Amount of assets to swap
     */
    function _swapAssetsForGAS(uint256 _amount) internal {
        // Approve the router to spend XBNB
        XBNB.approve(address(CARROT_FI_ROUTER), _amount);

        // Set up the path for the swap
        address[] memory path = new address[](2);
        path[0] = address(XBNB);
        path[1] = address(GAS);

        // Perform the swap
        CARROT_FI_ROUTER.swapExactTokensForTokens(
            _amount,
            0, // Accept any amount of GAS
            path,
            address(this),
            block.timestamp + 15 minutes
        );
    }

    /**
     * @notice Function to allow msg.sender to withdraw their deposit plus accrued interest
     * @param _shares Amount of shares the user wants to convert
     * @param _receiver Address of the user who will receive the assets
     */
    function withdrawAssets(uint256 _shares, address _receiver) public {
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

    // Add this function to allow the contract to receive GAS
    receive() external payable {}
}