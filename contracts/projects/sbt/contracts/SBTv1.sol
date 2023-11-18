// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "erc721a/contracts/ERC721A.sol";

pragma solidity ^0.8.17;

/**
 * @title Sealable
 * @author BaseLabs
 */
contract Sealable {
    error ErrContractSealed();
    event ContractSealed();

    /// @notice whether the contract is sealed
    bool public contractSealed;

    /**
     * @notice when the project is stable enough, the issuer will call sealContract
     * to give up the permission to call emergencyPause and unpause.
     */
    function _sealContract() internal {
        contractSealed = true;
        emit ContractSealed();
    }

    /**
     * @notice function call is only allowed when the contract has not been sealed
     */
    modifier onlyNotSealed() {
        if (contractSealed) revert ErrContractSealed();
        _;
    }
}

/// @notice define a set of error types
error ErrMaxQuotaExceed();
error ErrTimeNotAllowed();
error ErrNotTransferable();
error ErrInvalidArguments();
error ErrMaxSupplyExceed();

contract SBTv1 is ERC721A, ReentrancyGuard, Ownable, Sealable {
    /**
     * @dev This emits when a new token is created and bound to an account by
     * any mechanism.
     * Note: For a reliable `to` parameter, retrieve the transaction's
     * authenticated `to` field.
     */
    event Attest(address indexed to, uint256 indexed tokenId);

    /**
     * @dev This emits when an existing SBT is revoked from an account and
     * destroyed by any mechanism.
     * Note: For a reliable `from` parameter, retrieve the transaction's
     * authenticated `from` field.
     */
    event Revoke(address indexed from, uint256 indexed tokenId);
    /**
     * @dev This emits when an existing SBT is burned by an account
     */
    event Burn(address indexed from, uint256 indexed tokenId);
    /**
     * @dev This emits when the config of contract is updated
     */
    event ConfigUpdated();

    struct Config {
        string name;
        string tokenURI;
        uint256 maxSupply;
        uint256 startTime;
        uint256 endTime;
        address owner;
        bool transferable;
    }
    Config internal _config;
    mapping(address => uint256) internal _accountTokens;

    constructor(Config memory config_) ERC721A("", "") {
        _config = config_;
        transferOwnership(config_.owner);
    }

    /**
     * @notice attest allows the owner to mint a new token for a specified account,
     * assuming that the current time is appropriate.
     * @param account_ the account to mint the token for
     * @return the ID of the newly minted token
     */
    function attest(
        address account_
    ) external onlyOwner onlyRightTime returns (uint256) {
        return _attest(account_);
    }

    /**
     * @notice batchAttest is a function that allows the owner to mint multiple tokens for specified accounts,
     * assuming that the current time is appropriate.
     * @param accounts_ an array of accounts to mint the tokens for
     */
    function batchAttest(
        address[] calldata accounts_
    ) external onlyOwner onlyRightTime {
        for (uint256 i = 0; i < accounts_.length; i++) {
            _attest(accounts_[i]);
        }
    }

    /**
     * @notice _attest is an internal function used to mint a new token for a specified account,
     * assuming that the current time is appropriate.
     * @param account_ the account to mint the token for
     * @return the ID of the newly minted token
     */
    function _attest(address account_) internal returns (uint256) {
        if (_totalMinted() + 1 > _config.maxSupply) revert ErrMaxSupplyExceed();
        if (_accountTokens[account_] > 0) revert ErrMaxQuotaExceed();
        uint256 tokenId = _nextTokenId();
        _mint(account_, 1);
        _accountTokens[account_] = tokenId;
        emit Attest(account_, tokenId);
        return tokenId;
    }

    /**
     * @notice burn is used to burn the token of the caller and emits a Burn event
     */
    function burn() external {
        uint256 tokenId = tokenIdOf(msg.sender);
        _burn(tokenId);
        _accountTokens[msg.sender] = 0;
        emit Burn(msg.sender, tokenId);
    }

    /**
     * @notice revoke allows the owner to revoke a token from a specific address,
     * burning the token and emitting a Revoke event.
     * @param from_ the address of the token owner to revoke the token from
     */
    function revoke(address from_) external onlyOwner {
        uint256 tokenId = tokenIdOf(from_);
        _burn(tokenId);
        _accountTokens[from_] = 0;
        emit Revoke(from_, tokenId);
    }

    /***********************************|
    |               Getter              |
    |__________________________________*/

    /**
     * @notice tokenURI returns the URI associated with a given token ID.
     * It reverts with an error if the token does not exist.
     * @param tokenId_ the ID of the token to retrieve the URI for
     * @return the URI associated with the given token ID
     */
    function tokenURI(
        uint256 tokenId_
    ) public view virtual override returns (string memory) {
        if (ownerOf(tokenId_) == address(0)) revert ErrInvalidArguments();
        return _config.tokenURI;
    }

    /**
     * @notice name is a public view function that returns the name of the token
     * @return a string representing the name of the token
     */
    function name() public view virtual override returns (string memory) {
        return _config.name;
    }

    /**
     * @notice symbol is a public view function that returns the symbol of the token
     * @return a string representing the symbol of the token
     */
    function symbol() public view virtual override returns (string memory) {
        return _config.name;
    }

    /**
     * @param account_ The address of the SBT owner
     * @return The tokenId of the owner's SBT, and throw an error if there is no SBT belongs to the given address
     */
    function tokenIdOf(address account_) public view returns (uint256) {
        uint256 tokenId = _accountTokens[account_];
        if (tokenId == 0) revert ErrInvalidArguments();
        return tokenId;
    }

    /**
     * @notice updateConfig allows the owner to update the configuration of the token,
     * assuming that the token is not sealed and the current time is appropriate.
     * @param config_ the new configuration for the token
     */
    function updateConfig(
        Config calldata config_
    ) external onlyOwner onlyNotSealed {
        _config = config_;
        emit ConfigUpdated();
    }

    /**
     * @notice when the project is stable enough, the issuer will call sealContract
     * to give up the permission to call emergencyPause and unpause.
     */
    function sealContract() external onlyOwner {
        _sealContract();
    }

    /**
     * @notice _startTokenId is an internal view function that returns the starting token ID
     * @return the starting token ID
     */
    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    /**
     * @notice hook function, used to intercept the transfer of token.
     */
    function _beforeTokenTransfers(
        address from,
        address to,
        uint256 startTokenId,
        uint256 quantity
    ) internal virtual override {
        if (from != address(0) && to != address(0)) {
            if (!_config.transferable) {
                revert ErrNotTransferable();
            }
            if (quantity > 1 || _accountTokens[to] > 0) {
                revert ErrMaxQuotaExceed();
            }
            _accountTokens[from] = 0;
            _accountTokens[to] = startTokenId;
        }
        super._beforeTokenTransfers(from, to, startTokenId, quantity);
    }

    /**
     * @notice onlyRightTime is a modifier used to check whether the current time is appropriate
     * based on the token's configuration. If the current time is not appropriate, it will revert with an error message.
     */
    modifier onlyRightTime() {
        if (
            (_config.startTime > 0 && block.timestamp < _config.startTime) ||
            (_config.endTime > 0 && block.timestamp > _config.endTime)
        ) revert ErrTimeNotAllowed();
        _;
    }
}
