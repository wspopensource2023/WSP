// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package SBTv1

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
)

// SBTv1Config is an auto generated low-level Go binding around an user-defined struct.
type SBTv1Config struct {
	Name         string
	TokenURI     string
	MaxSupply    *big.Int
	StartTime    *big.Int
	EndTime      *big.Int
	Owner        common.Address
	Transferable bool
}

// SBTv1MetaData contains all meta data concerning the SBTv1 contract.
var SBTv1MetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"tokenURI\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"maxSupply\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"startTime\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"endTime\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"transferable\",\"type\":\"bool\"}],\"internalType\":\"structSBTv1.Config\",\"name\":\"config_\",\"type\":\"tuple\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"ApprovalCallerNotOwnerNorApproved\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ApprovalQueryForNonexistentToken\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"BalanceQueryForZeroAddress\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ErrContractSealed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ErrInvalidArguments\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ErrMaxQuotaExceed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ErrMaxSupplyExceed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ErrNotTransferable\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ErrTimeNotAllowed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"MintERC2309QuantityExceedsLimit\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"MintToZeroAddress\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"MintZeroQuantity\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"OwnerQueryForNonexistentToken\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"OwnershipNotInitializedForExtraData\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"TransferCallerNotOwnerNorApproved\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"TransferFromIncorrectOwner\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"TransferToNonERC721ReceiverImplementer\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"TransferToZeroAddress\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"URIQueryForNonexistentToken\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"approved\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"ApprovalForAll\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Attest\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Burn\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[],\"name\":\"ConfigUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"fromTokenId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"toTokenId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"ConsecutiveTransfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[],\"name\":\"ContractSealed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Revoke\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account_\",\"type\":\"address\"}],\"name\":\"attest\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address[]\",\"name\":\"accounts_\",\"type\":\"address[]\"}],\"name\":\"batchAttest\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"burn\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"contractSealed\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"getApproved\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"}],\"name\":\"isApprovedForAll\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ownerOf\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from_\",\"type\":\"address\"}],\"name\":\"revoke\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"sealContract\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"setApprovalForAll\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account_\",\"type\":\"address\"}],\"name\":\"tokenIdOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId_\",\"type\":\"uint256\"}],\"name\":\"tokenURI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"tokenURI\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"maxSupply\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"startTime\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"endTime\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"transferable\",\"type\":\"bool\"}],\"internalType\":\"structSBTv1.Config\",\"name\":\"config_\",\"type\":\"tuple\"}],\"name\":\"updateConfig\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
	Bin: "0x60806040523480156200001157600080fd5b506040516200205238038062002052833981016040819052620000349162000383565b6040805160208082018352600080835283519182019093529182529060026200005e8382620004f1565b5060036200006d8282620004f1565b50600160005550506001600855620000853362000121565b80518190600a9081906200009a9082620004f1565b5060208201516001820190620000b19082620004f1565b5060408201516002820155606082015160038201556080820151600482015560a0808301516005909201805460c0909401511515600160a01b026001600160a81b03199094166001600160a01b03909316929092179290921790558101516200011a9062000173565b50620005bd565b600980546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6200017d620001f6565b6001600160a01b038116620001e85760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b620001f38162000121565b50565b6009546001600160a01b03163314620002525760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401620001df565b565b634e487b7160e01b600052604160045260246000fd5b60405160e081016001600160401b03811182821017156200028f576200028f62000254565b60405290565b604051601f8201601f191681016001600160401b0381118282101715620002c057620002c062000254565b604052919050565b600082601f830112620002da57600080fd5b81516001600160401b03811115620002f657620002f662000254565b60206200030c601f8301601f1916820162000295565b82815285828487010111156200032157600080fd5b60005b838110156200034157858101830151828201840152820162000324565b506000928101909101919091529392505050565b80516001600160a01b03811681146200036d57600080fd5b919050565b805180151581146200036d57600080fd5b6000602082840312156200039657600080fd5b81516001600160401b0380821115620003ae57600080fd5b9083019060e08286031215620003c357600080fd5b620003cd6200026a565b825182811115620003dd57600080fd5b620003eb87828601620002c8565b8252506020830151828111156200040157600080fd5b6200040f87828601620002c8565b6020830152506040830151604082015260608301516060820152608083015160808201526200044160a0840162000355565b60a08201526200045460c0840162000372565b60c082015295945050505050565b600181811c908216806200047757607f821691505b6020821081036200049857634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620004ec57600081815260208120601f850160051c81016020861015620004c75750805b601f850160051c820191505b81811015620004e857828155600101620004d3565b5050505b505050565b81516001600160401b038111156200050d576200050d62000254565b62000525816200051e845462000462565b846200049e565b602080601f8311600181146200055d5760008415620005445750858301515b600019600386901b1c1916600185901b178555620004e8565b600085815260208120601f198616915b828110156200058e578886015182559484019460019091019084016200056d565b5085821015620005ad5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b611a8580620005cd6000396000f3fe6080604052600436106101665760003560e01c806370a08231116100d1578063a22cb4651161008a578063c87b56dd11610064578063c87b56dd146103cd578063e985e9c5146103ed578063eb31403f1461040d578063f2fde38b1461042d57600080fd5b8063a22cb46514610379578063b650163714610399578063b88d4fde146103ba57600080fd5b806370a08231146102e6578063715018a61461030657806374a8f1031461031b578063773c02d41461033b5780638da5cb5b1461035b57806395d89b41146101a057600080fd5b806340c179e91161012357806340c179e91461024957806342842e0e1461026957806344df8e701461027c5780636352211e1461029157806368bd580e146102b15780636c60144a146102c657600080fd5b806301ffc9a71461016b57806306fdde03146101a0578063081812fc146101c2578063095ea7b3146101fa57806318160ddd1461020f57806323b872dd14610236575b600080fd5b34801561017757600080fd5b5061018b61018636600461132b565b61044d565b60405190151581526020015b60405180910390f35b3480156101ac57600080fd5b506101b561049f565b604051610197919061138e565b3480156101ce57600080fd5b506101e26101dd3660046113a1565b610534565b6040516001600160a01b039091168152602001610197565b61020d6102083660046113cf565b610578565b005b34801561021b57600080fd5b5060015460005403600019015b604051908152602001610197565b61020d6102443660046113fb565b610618565b34801561025557600080fd5b5061020d61026436600461143c565b6107b6565b61020d6102773660046113fb565b610824565b34801561028857600080fd5b5061020d610844565b34801561029d57600080fd5b506101e26102ac3660046113a1565b610897565b3480156102bd57600080fd5b5061020d6108a2565b3480156102d257600080fd5b5061020d6102e1366004611477565b6108b4565b3480156102f257600080fd5b506102286103013660046114ec565b610951565b34801561031257600080fd5b5061020d6109a0565b34801561032757600080fd5b5061020d6103363660046114ec565b6109b2565b34801561034757600080fd5b506102286103563660046114ec565b610a17565b34801561036757600080fd5b506009546001600160a01b03166101e2565b34801561038557600080fd5b5061020d610394366004611517565b610a50565b3480156103a557600080fd5b5060095461018b90600160a01b900460ff1681565b61020d6103c8366004611566565b610abc565b3480156103d957600080fd5b506101b56103e83660046113a1565b610b06565b3480156103f957600080fd5b5061018b610408366004611646565b610bcc565b34801561041957600080fd5b506102286104283660046114ec565b610bfa565b34801561043957600080fd5b5061020d6104483660046114ec565b610c55565b60006301ffc9a760e01b6001600160e01b03198316148061047e57506380ac58cd60e01b6001600160e01b03198316145b806104995750635b5e139f60e01b6001600160e01b03198316145b92915050565b6060600a60000180546104b190611674565b80601f01602080910402602001604051908101604052809291908181526020018280546104dd90611674565b801561052a5780601f106104ff5761010080835404028352916020019161052a565b820191906000526020600020905b81548152906001019060200180831161050d57829003601f168201915b5050505050905090565b600061053f82610cd3565b61055c576040516333d1c03960e21b815260040160405180910390fd5b506000908152600660205260409020546001600160a01b031690565b600061058382610897565b9050336001600160a01b038216146105bc5761059f8133610bcc565b6105bc576040516367d9dca160e11b815260040160405180910390fd5b60008281526006602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b600061062382610d08565b9050836001600160a01b0316816001600160a01b0316146106565760405162a1148160e81b815260040160405180910390fd5b600082815260066020526040902080546106828187335b6001600160a01b039081169116811491141790565b6106ad576106908633610bcc565b6106ad57604051632ce44b5f60e11b815260040160405180910390fd5b6001600160a01b0385166106d457604051633a954ecd60e21b815260040160405180910390fd5b6106e18686866001610d7e565b80156106ec57600082555b6001600160a01b038681166000908152600560205260408082208054600019019055918716808252919020805460010190554260a01b17600160e11b17600085815260046020526040812091909155600160e11b8416900361077e5760018401600081815260046020526040812054900361077c57600054811461077c5760008181526004602052604090208490555b505b83856001600160a01b0316876001600160a01b0316600080516020611a3083398151915260405160405180910390a45b505050505050565b6107be610e3d565b600954600160a01b900460ff16156107e95760405163dfde68b560e01b815260040160405180910390fd5b80600a6107f6828261181d565b50506040517ffe891c6ab12cf73707f8deb6600c12ba382e4cc31eb2b0a2754cad13075ed2d190600090a150565b61083f83838360405180602001604052806000815250610abc565b505050565b600061084f33610a17565b905061085a81610e97565b33600081815260106020526040808220829055518392917fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca591a350565b600061049982610d08565b6108aa610e3d565b6108b2610ea2565b565b6108bc610e3d565b600d54158015906108ce5750600d5442105b806108e65750600e54158015906108e65750600e5442115b1561090457604051630aefe78d60e41b815260040160405180910390fd5b60005b8181101561083f5761093e8383838181106109245761092461197d565b905060200201602081019061093991906114ec565b610ee0565b5080610949816119a9565b915050610907565b60006001600160a01b03821661097a576040516323d3ad8160e21b815260040160405180910390fd5b506001600160a01b031660009081526005602052604090205467ffffffffffffffff1690565b6109a8610e3d565b6108b26000610fab565b6109ba610e3d565b60006109c582610a17565b90506109d081610e97565b6001600160a01b038216600081815260106020526040808220829055518392917fec9ab91322523c899ede7830ec9bfc992b5981cdcc27b91162fb23de5791117b91a35050565b6001600160a01b03811660009081526010602052604081205480820361049957604051632020e2a760e11b815260040160405180910390fd5b3360008181526007602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b610ac7848484610618565b6001600160a01b0383163b15610b0057610ae384848484610ffd565b610b00576040516368d2bf6b60e11b815260040160405180910390fd5b50505050565b60606000610b1383610897565b6001600160a01b031603610b3a57604051632020e2a760e11b815260040160405180910390fd5b600b8054610b4790611674565b80601f0160208091040260200160405190810160405280929190818152602001828054610b7390611674565b8015610bc05780601f10610b9557610100808354040283529160200191610bc0565b820191906000526020600020905b815481529060010190602001808311610ba357829003601f168201915b50505050509050919050565b6001600160a01b03918216600090815260076020908152604080832093909416825291909152205460ff1690565b6000610c04610e3d565b600d5415801590610c165750600d5442105b80610c2e5750600e5415801590610c2e5750600e5442115b15610c4c57604051630aefe78d60e41b815260040160405180910390fd5b61049982610ee0565b610c5d610e3d565b6001600160a01b038116610cc75760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b610cd081610fab565b50565b600081600111158015610ce7575060005482105b8015610499575050600090815260046020526040902054600160e01b161590565b60008180600111610d6557600054811015610d655760008181526004602052604081205490600160e01b82169003610d63575b80600003610d5c575060001901600081815260046020526040902054610d3b565b9392505050565b505b604051636f96cda160e11b815260040160405180910390fd5b6001600160a01b03841615801590610d9e57506001600160a01b03831615155b15610e3857600f54600160a01b900460ff16610dcd5760405163984d7ea760e01b815260040160405180910390fd5b6001811180610df357506001600160a01b03831660009081526010602052604090205415155b15610e1157604051637ffe8a7960e01b815260040160405180910390fd5b6001600160a01b038085166000908152601060205260408082208290559185168152208290555b610b00565b6009546001600160a01b031633146108b25760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610cbe565b610cd08160006110e8565b6009805460ff60a01b1916600160a01b1790556040517fa0058887862c892ade184993a48c672897bca2e36ebf7fa2b4703d4805fc3a0190600090a1565b600c54600090610ef36000546000190190565b610efe9060016119c2565b1115610f1d576040516362c3372160e01b815260040160405180910390fd5b6001600160a01b03821660009081526010602052604090205415610f5457604051637ffe8a7960e01b815260040160405180910390fd5b600054610f6283600161122e565b6001600160a01b038316600081815260106020526040808220849055518392917fe9274a84b19e9428826de6bae8c48329354f8f0e73f771b97cae2d9dccd45a2791a392915050565b600980546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b604051630a85bd0160e11b81526000906001600160a01b0385169063150b7a02906110329033908990889088906004016119d5565b6020604051808303816000875af192505050801561106d575060408051601f3d908101601f1916820190925261106a91810190611a12565b60015b6110cb573d80801561109b576040519150601f19603f3d011682016040523d82523d6000602084013e6110a0565b606091505b5080516000036110c3576040516368d2bf6b60e11b815260040160405180910390fd5b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050949350505050565b60006110f383610d08565b90508060008061111186600090815260066020526040902080549091565b9150915084156111515761112681843361066d565b611151576111348333610bcc565b61115157604051632ce44b5f60e11b815260040160405180910390fd5b61115f836000886001610d7e565b801561116a57600082555b6001600160a01b038316600081815260056020526040902080546fffffffffffffffffffffffffffffffff0190554260a01b17600360e01b17600087815260046020526040812091909155600160e11b851690036111f8576001860160008181526004602052604081205490036111f65760005481146111f65760008181526004602052604090208590555b505b60405186906000906001600160a01b03861690600080516020611a30833981519152908390a45050600180548101905550505050565b60008054908290036112535760405163b562e8dd60e01b815260040160405180910390fd5b6112606000848385610d7e565b6001600160a01b03831660008181526005602090815260408083208054680100000000000000018802019055848352600490915281206001851460e11b4260a01b17831790558284019083908390600080516020611a308339815191528180a4600183015b8181146112eb5780836000600080516020611a30833981519152600080a46001016112c5565b508160000361130c57604051622e076360e81b815260040160405180910390fd5b60005550505050565b6001600160e01b031981168114610cd057600080fd5b60006020828403121561133d57600080fd5b8135610d5c81611315565b6000815180845260005b8181101561136e57602081850181015186830182015201611352565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000610d5c6020830184611348565b6000602082840312156113b357600080fd5b5035919050565b6001600160a01b0381168114610cd057600080fd5b600080604083850312156113e257600080fd5b82356113ed816113ba565b946020939093013593505050565b60008060006060848603121561141057600080fd5b833561141b816113ba565b9250602084013561142b816113ba565b929592945050506040919091013590565b60006020828403121561144e57600080fd5b813567ffffffffffffffff81111561146557600080fd5b820160e08185031215610d5c57600080fd5b6000806020838503121561148a57600080fd5b823567ffffffffffffffff808211156114a257600080fd5b818501915085601f8301126114b657600080fd5b8135818111156114c557600080fd5b8660208260051b85010111156114da57600080fd5b60209290920196919550909350505050565b6000602082840312156114fe57600080fd5b8135610d5c816113ba565b8015158114610cd057600080fd5b6000806040838503121561152a57600080fd5b8235611535816113ba565b9150602083013561154581611509565b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b6000806000806080858703121561157c57600080fd5b8435611587816113ba565b93506020850135611597816113ba565b925060408501359150606085013567ffffffffffffffff808211156115bb57600080fd5b818701915087601f8301126115cf57600080fd5b8135818111156115e1576115e1611550565b604051601f8201601f19908116603f0116810190838211818310171561160957611609611550565b816040528281528a602084870101111561162257600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561165957600080fd5b8235611664816113ba565b91506020830135611545816113ba565b600181811c9082168061168857607f821691505b6020821081036116a857634e487b7160e01b600052602260045260246000fd5b50919050565b6000808335601e198436030181126116c557600080fd5b83018035915067ffffffffffffffff8211156116e057600080fd5b6020019150368190038213156116f557600080fd5b9250929050565b601f82111561083f57600081815260208120601f850160051c810160208610156117235750805b601f850160051c820191505b818110156107ae5782815560010161172f565b67ffffffffffffffff83111561175a5761175a611550565b61176e836117688354611674565b836116fc565b6000601f8411600181146117a2576000851561178a5750838201355b600019600387901b1c1916600186901b1783556117fc565b600083815260209020601f19861690835b828110156117d357868501358255602094850194600190920191016117b3565b50868210156117f05760001960f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b60008135610499816113ba565b6000813561049981611509565b61182782836116ae565b67ffffffffffffffff81111561183f5761183f611550565b6118538161184d8554611674565b856116fc565b6000601f821160018114611887576000831561186f5750838201355b600019600385901b1c1916600184901b1785556118e1565b600085815260209020601f19841690835b828110156118b85786850135825560209485019460019092019101611898565b50848210156118d55760001960f88660031b161c19848701351681555b505060018360011b0185555b505050506118f260208301836116ae565b611900818360018601611742565b50506040820135600282015560608201356003820155608082013560048201556005810161195061193360a08501611803565b82546001600160a01b0319166001600160a01b0391909116178255565b61083f61195f60c08501611810565b82805460ff60a01b191691151560a01b60ff60a01b16919091179055565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016119bb576119bb611993565b5060010190565b8082018082111561049957610499611993565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611a0890830184611348565b9695505050505050565b600060208284031215611a2457600080fd5b8151610d5c8161131556feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa2646970667358221220563f76dec090b853239aad6f2c859d1cdbc538dab72cc52990a3b7fea798ebfa64736f6c63430008110033",
}

// SBTv1ABI is the input ABI used to generate the binding from.
// Deprecated: Use SBTv1MetaData.ABI instead.
var SBTv1ABI = SBTv1MetaData.ABI

// SBTv1Bin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use SBTv1MetaData.Bin instead.
var SBTv1Bin = SBTv1MetaData.Bin

// DeploySBTv1 deploys a new Ethereum contract, binding an instance of SBTv1 to it.
func DeploySBTv1(auth *bind.TransactOpts, backend bind.ContractBackend, config_ SBTv1Config) (common.Address, *types.Transaction, *SBTv1, error) {
	parsed, err := SBTv1MetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(SBTv1Bin), backend, config_)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &SBTv1{SBTv1Caller: SBTv1Caller{contract: contract}, SBTv1Transactor: SBTv1Transactor{contract: contract}, SBTv1Filterer: SBTv1Filterer{contract: contract}}, nil
}

// SBTv1 is an auto generated Go binding around an Ethereum contract.
type SBTv1 struct {
	SBTv1Caller     // Read-only binding to the contract
	SBTv1Transactor // Write-only binding to the contract
	SBTv1Filterer   // Log filterer for contract events
}

// SBTv1Caller is an auto generated read-only Go binding around an Ethereum contract.
type SBTv1Caller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SBTv1Transactor is an auto generated write-only Go binding around an Ethereum contract.
type SBTv1Transactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SBTv1Filterer is an auto generated log filtering Go binding around an Ethereum contract events.
type SBTv1Filterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SBTv1Session is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type SBTv1Session struct {
	Contract     *SBTv1            // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// SBTv1CallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type SBTv1CallerSession struct {
	Contract *SBTv1Caller  // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// SBTv1TransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type SBTv1TransactorSession struct {
	Contract     *SBTv1Transactor  // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// SBTv1Raw is an auto generated low-level Go binding around an Ethereum contract.
type SBTv1Raw struct {
	Contract *SBTv1 // Generic contract binding to access the raw methods on
}

// SBTv1CallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type SBTv1CallerRaw struct {
	Contract *SBTv1Caller // Generic read-only contract binding to access the raw methods on
}

// SBTv1TransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type SBTv1TransactorRaw struct {
	Contract *SBTv1Transactor // Generic write-only contract binding to access the raw methods on
}

// NewSBTv1 creates a new instance of SBTv1, bound to a specific deployed contract.
func NewSBTv1(address common.Address, backend bind.ContractBackend) (*SBTv1, error) {
	contract, err := bindSBTv1(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &SBTv1{SBTv1Caller: SBTv1Caller{contract: contract}, SBTv1Transactor: SBTv1Transactor{contract: contract}, SBTv1Filterer: SBTv1Filterer{contract: contract}}, nil
}

// NewSBTv1Caller creates a new read-only instance of SBTv1, bound to a specific deployed contract.
func NewSBTv1Caller(address common.Address, caller bind.ContractCaller) (*SBTv1Caller, error) {
	contract, err := bindSBTv1(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &SBTv1Caller{contract: contract}, nil
}

// NewSBTv1Transactor creates a new write-only instance of SBTv1, bound to a specific deployed contract.
func NewSBTv1Transactor(address common.Address, transactor bind.ContractTransactor) (*SBTv1Transactor, error) {
	contract, err := bindSBTv1(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &SBTv1Transactor{contract: contract}, nil
}

// NewSBTv1Filterer creates a new log filterer instance of SBTv1, bound to a specific deployed contract.
func NewSBTv1Filterer(address common.Address, filterer bind.ContractFilterer) (*SBTv1Filterer, error) {
	contract, err := bindSBTv1(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &SBTv1Filterer{contract: contract}, nil
}

// bindSBTv1 binds a generic wrapper to an already deployed contract.
func bindSBTv1(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(SBTv1ABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SBTv1 *SBTv1Raw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _SBTv1.Contract.SBTv1Caller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SBTv1 *SBTv1Raw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SBTv1.Contract.SBTv1Transactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SBTv1 *SBTv1Raw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SBTv1.Contract.SBTv1Transactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SBTv1 *SBTv1CallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _SBTv1.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SBTv1 *SBTv1TransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SBTv1.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SBTv1 *SBTv1TransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SBTv1.Contract.contract.Transact(opts, method, params...)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address owner) view returns(uint256)
func (_SBTv1 *SBTv1Caller) BalanceOf(opts *bind.CallOpts, owner common.Address) (*big.Int, error) {
	var out []interface{}
	err := _SBTv1.contract.Call(opts, &out, "balanceOf", owner)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address owner) view returns(uint256)
func (_SBTv1 *SBTv1Session) BalanceOf(owner common.Address) (*big.Int, error) {
	return _SBTv1.Contract.BalanceOf(&_SBTv1.CallOpts, owner)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(address owner) view returns(uint256)
func (_SBTv1 *SBTv1CallerSession) BalanceOf(owner common.Address) (*big.Int, error) {
	return _SBTv1.Contract.BalanceOf(&_SBTv1.CallOpts, owner)
}

// ContractSealed is a free data retrieval call binding the contract method 0xb6501637.
//
// Solidity: function contractSealed() view returns(bool)
func (_SBTv1 *SBTv1Caller) ContractSealed(opts *bind.CallOpts) (bool, error) {
	var out []interface{}
	err := _SBTv1.contract.Call(opts, &out, "contractSealed")

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// ContractSealed is a free data retrieval call binding the contract method 0xb6501637.
//
// Solidity: function contractSealed() view returns(bool)
func (_SBTv1 *SBTv1Session) ContractSealed() (bool, error) {
	return _SBTv1.Contract.ContractSealed(&_SBTv1.CallOpts)
}

// ContractSealed is a free data retrieval call binding the contract method 0xb6501637.
//
// Solidity: function contractSealed() view returns(bool)
func (_SBTv1 *SBTv1CallerSession) ContractSealed() (bool, error) {
	return _SBTv1.Contract.ContractSealed(&_SBTv1.CallOpts)
}

// GetApproved is a free data retrieval call binding the contract method 0x081812fc.
//
// Solidity: function getApproved(uint256 tokenId) view returns(address)
func (_SBTv1 *SBTv1Caller) GetApproved(opts *bind.CallOpts, tokenId *big.Int) (common.Address, error) {
	var out []interface{}
	err := _SBTv1.contract.Call(opts, &out, "getApproved", tokenId)

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// GetApproved is a free data retrieval call binding the contract method 0x081812fc.
//
// Solidity: function getApproved(uint256 tokenId) view returns(address)
func (_SBTv1 *SBTv1Session) GetApproved(tokenId *big.Int) (common.Address, error) {
	return _SBTv1.Contract.GetApproved(&_SBTv1.CallOpts, tokenId)
}

// GetApproved is a free data retrieval call binding the contract method 0x081812fc.
//
// Solidity: function getApproved(uint256 tokenId) view returns(address)
func (_SBTv1 *SBTv1CallerSession) GetApproved(tokenId *big.Int) (common.Address, error) {
	return _SBTv1.Contract.GetApproved(&_SBTv1.CallOpts, tokenId)
}

// IsApprovedForAll is a free data retrieval call binding the contract method 0xe985e9c5.
//
// Solidity: function isApprovedForAll(address owner, address operator) view returns(bool)
func (_SBTv1 *SBTv1Caller) IsApprovedForAll(opts *bind.CallOpts, owner common.Address, operator common.Address) (bool, error) {
	var out []interface{}
	err := _SBTv1.contract.Call(opts, &out, "isApprovedForAll", owner, operator)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// IsApprovedForAll is a free data retrieval call binding the contract method 0xe985e9c5.
//
// Solidity: function isApprovedForAll(address owner, address operator) view returns(bool)
func (_SBTv1 *SBTv1Session) IsApprovedForAll(owner common.Address, operator common.Address) (bool, error) {
	return _SBTv1.Contract.IsApprovedForAll(&_SBTv1.CallOpts, owner, operator)
}

// IsApprovedForAll is a free data retrieval call binding the contract method 0xe985e9c5.
//
// Solidity: function isApprovedForAll(address owner, address operator) view returns(bool)
func (_SBTv1 *SBTv1CallerSession) IsApprovedForAll(owner common.Address, operator common.Address) (bool, error) {
	return _SBTv1.Contract.IsApprovedForAll(&_SBTv1.CallOpts, owner, operator)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() view returns(string)
func (_SBTv1 *SBTv1Caller) Name(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _SBTv1.contract.Call(opts, &out, "name")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() view returns(string)
func (_SBTv1 *SBTv1Session) Name() (string, error) {
	return _SBTv1.Contract.Name(&_SBTv1.CallOpts)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() view returns(string)
func (_SBTv1 *SBTv1CallerSession) Name() (string, error) {
	return _SBTv1.Contract.Name(&_SBTv1.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_SBTv1 *SBTv1Caller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _SBTv1.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_SBTv1 *SBTv1Session) Owner() (common.Address, error) {
	return _SBTv1.Contract.Owner(&_SBTv1.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_SBTv1 *SBTv1CallerSession) Owner() (common.Address, error) {
	return _SBTv1.Contract.Owner(&_SBTv1.CallOpts)
}

// OwnerOf is a free data retrieval call binding the contract method 0x6352211e.
//
// Solidity: function ownerOf(uint256 tokenId) view returns(address)
func (_SBTv1 *SBTv1Caller) OwnerOf(opts *bind.CallOpts, tokenId *big.Int) (common.Address, error) {
	var out []interface{}
	err := _SBTv1.contract.Call(opts, &out, "ownerOf", tokenId)

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// OwnerOf is a free data retrieval call binding the contract method 0x6352211e.
//
// Solidity: function ownerOf(uint256 tokenId) view returns(address)
func (_SBTv1 *SBTv1Session) OwnerOf(tokenId *big.Int) (common.Address, error) {
	return _SBTv1.Contract.OwnerOf(&_SBTv1.CallOpts, tokenId)
}

// OwnerOf is a free data retrieval call binding the contract method 0x6352211e.
//
// Solidity: function ownerOf(uint256 tokenId) view returns(address)
func (_SBTv1 *SBTv1CallerSession) OwnerOf(tokenId *big.Int) (common.Address, error) {
	return _SBTv1.Contract.OwnerOf(&_SBTv1.CallOpts, tokenId)
}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_SBTv1 *SBTv1Caller) SupportsInterface(opts *bind.CallOpts, interfaceId [4]byte) (bool, error) {
	var out []interface{}
	err := _SBTv1.contract.Call(opts, &out, "supportsInterface", interfaceId)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_SBTv1 *SBTv1Session) SupportsInterface(interfaceId [4]byte) (bool, error) {
	return _SBTv1.Contract.SupportsInterface(&_SBTv1.CallOpts, interfaceId)
}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_SBTv1 *SBTv1CallerSession) SupportsInterface(interfaceId [4]byte) (bool, error) {
	return _SBTv1.Contract.SupportsInterface(&_SBTv1.CallOpts, interfaceId)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() view returns(string)
func (_SBTv1 *SBTv1Caller) Symbol(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _SBTv1.contract.Call(opts, &out, "symbol")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() view returns(string)
func (_SBTv1 *SBTv1Session) Symbol() (string, error) {
	return _SBTv1.Contract.Symbol(&_SBTv1.CallOpts)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() view returns(string)
func (_SBTv1 *SBTv1CallerSession) Symbol() (string, error) {
	return _SBTv1.Contract.Symbol(&_SBTv1.CallOpts)
}

// TokenIdOf is a free data retrieval call binding the contract method 0x773c02d4.
//
// Solidity: function tokenIdOf(address account_) view returns(uint256)
func (_SBTv1 *SBTv1Caller) TokenIdOf(opts *bind.CallOpts, account_ common.Address) (*big.Int, error) {
	var out []interface{}
	err := _SBTv1.contract.Call(opts, &out, "tokenIdOf", account_)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TokenIdOf is a free data retrieval call binding the contract method 0x773c02d4.
//
// Solidity: function tokenIdOf(address account_) view returns(uint256)
func (_SBTv1 *SBTv1Session) TokenIdOf(account_ common.Address) (*big.Int, error) {
	return _SBTv1.Contract.TokenIdOf(&_SBTv1.CallOpts, account_)
}

// TokenIdOf is a free data retrieval call binding the contract method 0x773c02d4.
//
// Solidity: function tokenIdOf(address account_) view returns(uint256)
func (_SBTv1 *SBTv1CallerSession) TokenIdOf(account_ common.Address) (*big.Int, error) {
	return _SBTv1.Contract.TokenIdOf(&_SBTv1.CallOpts, account_)
}

// TokenURI is a free data retrieval call binding the contract method 0xc87b56dd.
//
// Solidity: function tokenURI(uint256 tokenId_) view returns(string)
func (_SBTv1 *SBTv1Caller) TokenURI(opts *bind.CallOpts, tokenId_ *big.Int) (string, error) {
	var out []interface{}
	err := _SBTv1.contract.Call(opts, &out, "tokenURI", tokenId_)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// TokenURI is a free data retrieval call binding the contract method 0xc87b56dd.
//
// Solidity: function tokenURI(uint256 tokenId_) view returns(string)
func (_SBTv1 *SBTv1Session) TokenURI(tokenId_ *big.Int) (string, error) {
	return _SBTv1.Contract.TokenURI(&_SBTv1.CallOpts, tokenId_)
}

// TokenURI is a free data retrieval call binding the contract method 0xc87b56dd.
//
// Solidity: function tokenURI(uint256 tokenId_) view returns(string)
func (_SBTv1 *SBTv1CallerSession) TokenURI(tokenId_ *big.Int) (string, error) {
	return _SBTv1.Contract.TokenURI(&_SBTv1.CallOpts, tokenId_)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() view returns(uint256)
func (_SBTv1 *SBTv1Caller) TotalSupply(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _SBTv1.contract.Call(opts, &out, "totalSupply")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() view returns(uint256)
func (_SBTv1 *SBTv1Session) TotalSupply() (*big.Int, error) {
	return _SBTv1.Contract.TotalSupply(&_SBTv1.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() view returns(uint256)
func (_SBTv1 *SBTv1CallerSession) TotalSupply() (*big.Int, error) {
	return _SBTv1.Contract.TotalSupply(&_SBTv1.CallOpts)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(address to, uint256 tokenId) payable returns()
func (_SBTv1 *SBTv1Transactor) Approve(opts *bind.TransactOpts, to common.Address, tokenId *big.Int) (*types.Transaction, error) {
	return _SBTv1.contract.Transact(opts, "approve", to, tokenId)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(address to, uint256 tokenId) payable returns()
func (_SBTv1 *SBTv1Session) Approve(to common.Address, tokenId *big.Int) (*types.Transaction, error) {
	return _SBTv1.Contract.Approve(&_SBTv1.TransactOpts, to, tokenId)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(address to, uint256 tokenId) payable returns()
func (_SBTv1 *SBTv1TransactorSession) Approve(to common.Address, tokenId *big.Int) (*types.Transaction, error) {
	return _SBTv1.Contract.Approve(&_SBTv1.TransactOpts, to, tokenId)
}

// Attest is a paid mutator transaction binding the contract method 0xeb31403f.
//
// Solidity: function attest(address account_) returns(uint256)
func (_SBTv1 *SBTv1Transactor) Attest(opts *bind.TransactOpts, account_ common.Address) (*types.Transaction, error) {
	return _SBTv1.contract.Transact(opts, "attest", account_)
}

// Attest is a paid mutator transaction binding the contract method 0xeb31403f.
//
// Solidity: function attest(address account_) returns(uint256)
func (_SBTv1 *SBTv1Session) Attest(account_ common.Address) (*types.Transaction, error) {
	return _SBTv1.Contract.Attest(&_SBTv1.TransactOpts, account_)
}

// Attest is a paid mutator transaction binding the contract method 0xeb31403f.
//
// Solidity: function attest(address account_) returns(uint256)
func (_SBTv1 *SBTv1TransactorSession) Attest(account_ common.Address) (*types.Transaction, error) {
	return _SBTv1.Contract.Attest(&_SBTv1.TransactOpts, account_)
}

// BatchAttest is a paid mutator transaction binding the contract method 0x6c60144a.
//
// Solidity: function batchAttest(address[] accounts_) returns()
func (_SBTv1 *SBTv1Transactor) BatchAttest(opts *bind.TransactOpts, accounts_ []common.Address) (*types.Transaction, error) {
	return _SBTv1.contract.Transact(opts, "batchAttest", accounts_)
}

// BatchAttest is a paid mutator transaction binding the contract method 0x6c60144a.
//
// Solidity: function batchAttest(address[] accounts_) returns()
func (_SBTv1 *SBTv1Session) BatchAttest(accounts_ []common.Address) (*types.Transaction, error) {
	return _SBTv1.Contract.BatchAttest(&_SBTv1.TransactOpts, accounts_)
}

// BatchAttest is a paid mutator transaction binding the contract method 0x6c60144a.
//
// Solidity: function batchAttest(address[] accounts_) returns()
func (_SBTv1 *SBTv1TransactorSession) BatchAttest(accounts_ []common.Address) (*types.Transaction, error) {
	return _SBTv1.Contract.BatchAttest(&_SBTv1.TransactOpts, accounts_)
}

// Burn is a paid mutator transaction binding the contract method 0x44df8e70.
//
// Solidity: function burn() returns()
func (_SBTv1 *SBTv1Transactor) Burn(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SBTv1.contract.Transact(opts, "burn")
}

// Burn is a paid mutator transaction binding the contract method 0x44df8e70.
//
// Solidity: function burn() returns()
func (_SBTv1 *SBTv1Session) Burn() (*types.Transaction, error) {
	return _SBTv1.Contract.Burn(&_SBTv1.TransactOpts)
}

// Burn is a paid mutator transaction binding the contract method 0x44df8e70.
//
// Solidity: function burn() returns()
func (_SBTv1 *SBTv1TransactorSession) Burn() (*types.Transaction, error) {
	return _SBTv1.Contract.Burn(&_SBTv1.TransactOpts)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_SBTv1 *SBTv1Transactor) RenounceOwnership(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SBTv1.contract.Transact(opts, "renounceOwnership")
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_SBTv1 *SBTv1Session) RenounceOwnership() (*types.Transaction, error) {
	return _SBTv1.Contract.RenounceOwnership(&_SBTv1.TransactOpts)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_SBTv1 *SBTv1TransactorSession) RenounceOwnership() (*types.Transaction, error) {
	return _SBTv1.Contract.RenounceOwnership(&_SBTv1.TransactOpts)
}

// Revoke is a paid mutator transaction binding the contract method 0x74a8f103.
//
// Solidity: function revoke(address from_) returns()
func (_SBTv1 *SBTv1Transactor) Revoke(opts *bind.TransactOpts, from_ common.Address) (*types.Transaction, error) {
	return _SBTv1.contract.Transact(opts, "revoke", from_)
}

// Revoke is a paid mutator transaction binding the contract method 0x74a8f103.
//
// Solidity: function revoke(address from_) returns()
func (_SBTv1 *SBTv1Session) Revoke(from_ common.Address) (*types.Transaction, error) {
	return _SBTv1.Contract.Revoke(&_SBTv1.TransactOpts, from_)
}

// Revoke is a paid mutator transaction binding the contract method 0x74a8f103.
//
// Solidity: function revoke(address from_) returns()
func (_SBTv1 *SBTv1TransactorSession) Revoke(from_ common.Address) (*types.Transaction, error) {
	return _SBTv1.Contract.Revoke(&_SBTv1.TransactOpts, from_)
}

// SafeTransferFrom is a paid mutator transaction binding the contract method 0x42842e0e.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 tokenId) payable returns()
func (_SBTv1 *SBTv1Transactor) SafeTransferFrom(opts *bind.TransactOpts, from common.Address, to common.Address, tokenId *big.Int) (*types.Transaction, error) {
	return _SBTv1.contract.Transact(opts, "safeTransferFrom", from, to, tokenId)
}

// SafeTransferFrom is a paid mutator transaction binding the contract method 0x42842e0e.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 tokenId) payable returns()
func (_SBTv1 *SBTv1Session) SafeTransferFrom(from common.Address, to common.Address, tokenId *big.Int) (*types.Transaction, error) {
	return _SBTv1.Contract.SafeTransferFrom(&_SBTv1.TransactOpts, from, to, tokenId)
}

// SafeTransferFrom is a paid mutator transaction binding the contract method 0x42842e0e.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 tokenId) payable returns()
func (_SBTv1 *SBTv1TransactorSession) SafeTransferFrom(from common.Address, to common.Address, tokenId *big.Int) (*types.Transaction, error) {
	return _SBTv1.Contract.SafeTransferFrom(&_SBTv1.TransactOpts, from, to, tokenId)
}

// SafeTransferFrom0 is a paid mutator transaction binding the contract method 0xb88d4fde.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 tokenId, bytes _data) payable returns()
func (_SBTv1 *SBTv1Transactor) SafeTransferFrom0(opts *bind.TransactOpts, from common.Address, to common.Address, tokenId *big.Int, _data []byte) (*types.Transaction, error) {
	return _SBTv1.contract.Transact(opts, "safeTransferFrom0", from, to, tokenId, _data)
}

// SafeTransferFrom0 is a paid mutator transaction binding the contract method 0xb88d4fde.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 tokenId, bytes _data) payable returns()
func (_SBTv1 *SBTv1Session) SafeTransferFrom0(from common.Address, to common.Address, tokenId *big.Int, _data []byte) (*types.Transaction, error) {
	return _SBTv1.Contract.SafeTransferFrom0(&_SBTv1.TransactOpts, from, to, tokenId, _data)
}

// SafeTransferFrom0 is a paid mutator transaction binding the contract method 0xb88d4fde.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 tokenId, bytes _data) payable returns()
func (_SBTv1 *SBTv1TransactorSession) SafeTransferFrom0(from common.Address, to common.Address, tokenId *big.Int, _data []byte) (*types.Transaction, error) {
	return _SBTv1.Contract.SafeTransferFrom0(&_SBTv1.TransactOpts, from, to, tokenId, _data)
}

// SealContract is a paid mutator transaction binding the contract method 0x68bd580e.
//
// Solidity: function sealContract() returns()
func (_SBTv1 *SBTv1Transactor) SealContract(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SBTv1.contract.Transact(opts, "sealContract")
}

// SealContract is a paid mutator transaction binding the contract method 0x68bd580e.
//
// Solidity: function sealContract() returns()
func (_SBTv1 *SBTv1Session) SealContract() (*types.Transaction, error) {
	return _SBTv1.Contract.SealContract(&_SBTv1.TransactOpts)
}

// SealContract is a paid mutator transaction binding the contract method 0x68bd580e.
//
// Solidity: function sealContract() returns()
func (_SBTv1 *SBTv1TransactorSession) SealContract() (*types.Transaction, error) {
	return _SBTv1.Contract.SealContract(&_SBTv1.TransactOpts)
}

// SetApprovalForAll is a paid mutator transaction binding the contract method 0xa22cb465.
//
// Solidity: function setApprovalForAll(address operator, bool approved) returns()
func (_SBTv1 *SBTv1Transactor) SetApprovalForAll(opts *bind.TransactOpts, operator common.Address, approved bool) (*types.Transaction, error) {
	return _SBTv1.contract.Transact(opts, "setApprovalForAll", operator, approved)
}

// SetApprovalForAll is a paid mutator transaction binding the contract method 0xa22cb465.
//
// Solidity: function setApprovalForAll(address operator, bool approved) returns()
func (_SBTv1 *SBTv1Session) SetApprovalForAll(operator common.Address, approved bool) (*types.Transaction, error) {
	return _SBTv1.Contract.SetApprovalForAll(&_SBTv1.TransactOpts, operator, approved)
}

// SetApprovalForAll is a paid mutator transaction binding the contract method 0xa22cb465.
//
// Solidity: function setApprovalForAll(address operator, bool approved) returns()
func (_SBTv1 *SBTv1TransactorSession) SetApprovalForAll(operator common.Address, approved bool) (*types.Transaction, error) {
	return _SBTv1.Contract.SetApprovalForAll(&_SBTv1.TransactOpts, operator, approved)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(address from, address to, uint256 tokenId) payable returns()
func (_SBTv1 *SBTv1Transactor) TransferFrom(opts *bind.TransactOpts, from common.Address, to common.Address, tokenId *big.Int) (*types.Transaction, error) {
	return _SBTv1.contract.Transact(opts, "transferFrom", from, to, tokenId)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(address from, address to, uint256 tokenId) payable returns()
func (_SBTv1 *SBTv1Session) TransferFrom(from common.Address, to common.Address, tokenId *big.Int) (*types.Transaction, error) {
	return _SBTv1.Contract.TransferFrom(&_SBTv1.TransactOpts, from, to, tokenId)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(address from, address to, uint256 tokenId) payable returns()
func (_SBTv1 *SBTv1TransactorSession) TransferFrom(from common.Address, to common.Address, tokenId *big.Int) (*types.Transaction, error) {
	return _SBTv1.Contract.TransferFrom(&_SBTv1.TransactOpts, from, to, tokenId)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_SBTv1 *SBTv1Transactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _SBTv1.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_SBTv1 *SBTv1Session) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _SBTv1.Contract.TransferOwnership(&_SBTv1.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_SBTv1 *SBTv1TransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _SBTv1.Contract.TransferOwnership(&_SBTv1.TransactOpts, newOwner)
}

// UpdateConfig is a paid mutator transaction binding the contract method 0x40c179e9.
//
// Solidity: function updateConfig((string,string,uint256,uint256,uint256,address,bool) config_) returns()
func (_SBTv1 *SBTv1Transactor) UpdateConfig(opts *bind.TransactOpts, config_ SBTv1Config) (*types.Transaction, error) {
	return _SBTv1.contract.Transact(opts, "updateConfig", config_)
}

// UpdateConfig is a paid mutator transaction binding the contract method 0x40c179e9.
//
// Solidity: function updateConfig((string,string,uint256,uint256,uint256,address,bool) config_) returns()
func (_SBTv1 *SBTv1Session) UpdateConfig(config_ SBTv1Config) (*types.Transaction, error) {
	return _SBTv1.Contract.UpdateConfig(&_SBTv1.TransactOpts, config_)
}

// UpdateConfig is a paid mutator transaction binding the contract method 0x40c179e9.
//
// Solidity: function updateConfig((string,string,uint256,uint256,uint256,address,bool) config_) returns()
func (_SBTv1 *SBTv1TransactorSession) UpdateConfig(config_ SBTv1Config) (*types.Transaction, error) {
	return _SBTv1.Contract.UpdateConfig(&_SBTv1.TransactOpts, config_)
}

// SBTv1ApprovalIterator is returned from FilterApproval and is used to iterate over the raw logs and unpacked data for Approval events raised by the SBTv1 contract.
type SBTv1ApprovalIterator struct {
	Event *SBTv1Approval // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *SBTv1ApprovalIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SBTv1Approval)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(SBTv1Approval)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *SBTv1ApprovalIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SBTv1ApprovalIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SBTv1Approval represents a Approval event raised by the SBTv1 contract.
type SBTv1Approval struct {
	Owner    common.Address
	Approved common.Address
	TokenId  *big.Int
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterApproval is a free log retrieval operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)
func (_SBTv1 *SBTv1Filterer) FilterApproval(opts *bind.FilterOpts, owner []common.Address, approved []common.Address, tokenId []*big.Int) (*SBTv1ApprovalIterator, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var approvedRule []interface{}
	for _, approvedItem := range approved {
		approvedRule = append(approvedRule, approvedItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _SBTv1.contract.FilterLogs(opts, "Approval", ownerRule, approvedRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return &SBTv1ApprovalIterator{contract: _SBTv1.contract, event: "Approval", logs: logs, sub: sub}, nil
}

// WatchApproval is a free log subscription operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)
func (_SBTv1 *SBTv1Filterer) WatchApproval(opts *bind.WatchOpts, sink chan<- *SBTv1Approval, owner []common.Address, approved []common.Address, tokenId []*big.Int) (event.Subscription, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var approvedRule []interface{}
	for _, approvedItem := range approved {
		approvedRule = append(approvedRule, approvedItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _SBTv1.contract.WatchLogs(opts, "Approval", ownerRule, approvedRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SBTv1Approval)
				if err := _SBTv1.contract.UnpackLog(event, "Approval", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseApproval is a log parse operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)
func (_SBTv1 *SBTv1Filterer) ParseApproval(log types.Log) (*SBTv1Approval, error) {
	event := new(SBTv1Approval)
	if err := _SBTv1.contract.UnpackLog(event, "Approval", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SBTv1ApprovalForAllIterator is returned from FilterApprovalForAll and is used to iterate over the raw logs and unpacked data for ApprovalForAll events raised by the SBTv1 contract.
type SBTv1ApprovalForAllIterator struct {
	Event *SBTv1ApprovalForAll // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *SBTv1ApprovalForAllIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SBTv1ApprovalForAll)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(SBTv1ApprovalForAll)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *SBTv1ApprovalForAllIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SBTv1ApprovalForAllIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SBTv1ApprovalForAll represents a ApprovalForAll event raised by the SBTv1 contract.
type SBTv1ApprovalForAll struct {
	Owner    common.Address
	Operator common.Address
	Approved bool
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterApprovalForAll is a free log retrieval operation binding the contract event 0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31.
//
// Solidity: event ApprovalForAll(address indexed owner, address indexed operator, bool approved)
func (_SBTv1 *SBTv1Filterer) FilterApprovalForAll(opts *bind.FilterOpts, owner []common.Address, operator []common.Address) (*SBTv1ApprovalForAllIterator, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}

	logs, sub, err := _SBTv1.contract.FilterLogs(opts, "ApprovalForAll", ownerRule, operatorRule)
	if err != nil {
		return nil, err
	}
	return &SBTv1ApprovalForAllIterator{contract: _SBTv1.contract, event: "ApprovalForAll", logs: logs, sub: sub}, nil
}

// WatchApprovalForAll is a free log subscription operation binding the contract event 0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31.
//
// Solidity: event ApprovalForAll(address indexed owner, address indexed operator, bool approved)
func (_SBTv1 *SBTv1Filterer) WatchApprovalForAll(opts *bind.WatchOpts, sink chan<- *SBTv1ApprovalForAll, owner []common.Address, operator []common.Address) (event.Subscription, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}

	logs, sub, err := _SBTv1.contract.WatchLogs(opts, "ApprovalForAll", ownerRule, operatorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SBTv1ApprovalForAll)
				if err := _SBTv1.contract.UnpackLog(event, "ApprovalForAll", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseApprovalForAll is a log parse operation binding the contract event 0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31.
//
// Solidity: event ApprovalForAll(address indexed owner, address indexed operator, bool approved)
func (_SBTv1 *SBTv1Filterer) ParseApprovalForAll(log types.Log) (*SBTv1ApprovalForAll, error) {
	event := new(SBTv1ApprovalForAll)
	if err := _SBTv1.contract.UnpackLog(event, "ApprovalForAll", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SBTv1AttestIterator is returned from FilterAttest and is used to iterate over the raw logs and unpacked data for Attest events raised by the SBTv1 contract.
type SBTv1AttestIterator struct {
	Event *SBTv1Attest // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *SBTv1AttestIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SBTv1Attest)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(SBTv1Attest)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *SBTv1AttestIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SBTv1AttestIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SBTv1Attest represents a Attest event raised by the SBTv1 contract.
type SBTv1Attest struct {
	To      common.Address
	TokenId *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterAttest is a free log retrieval operation binding the contract event 0xe9274a84b19e9428826de6bae8c48329354f8f0e73f771b97cae2d9dccd45a27.
//
// Solidity: event Attest(address indexed to, uint256 indexed tokenId)
func (_SBTv1 *SBTv1Filterer) FilterAttest(opts *bind.FilterOpts, to []common.Address, tokenId []*big.Int) (*SBTv1AttestIterator, error) {

	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _SBTv1.contract.FilterLogs(opts, "Attest", toRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return &SBTv1AttestIterator{contract: _SBTv1.contract, event: "Attest", logs: logs, sub: sub}, nil
}

// WatchAttest is a free log subscription operation binding the contract event 0xe9274a84b19e9428826de6bae8c48329354f8f0e73f771b97cae2d9dccd45a27.
//
// Solidity: event Attest(address indexed to, uint256 indexed tokenId)
func (_SBTv1 *SBTv1Filterer) WatchAttest(opts *bind.WatchOpts, sink chan<- *SBTv1Attest, to []common.Address, tokenId []*big.Int) (event.Subscription, error) {

	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _SBTv1.contract.WatchLogs(opts, "Attest", toRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SBTv1Attest)
				if err := _SBTv1.contract.UnpackLog(event, "Attest", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseAttest is a log parse operation binding the contract event 0xe9274a84b19e9428826de6bae8c48329354f8f0e73f771b97cae2d9dccd45a27.
//
// Solidity: event Attest(address indexed to, uint256 indexed tokenId)
func (_SBTv1 *SBTv1Filterer) ParseAttest(log types.Log) (*SBTv1Attest, error) {
	event := new(SBTv1Attest)
	if err := _SBTv1.contract.UnpackLog(event, "Attest", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SBTv1BurnIterator is returned from FilterBurn and is used to iterate over the raw logs and unpacked data for Burn events raised by the SBTv1 contract.
type SBTv1BurnIterator struct {
	Event *SBTv1Burn // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *SBTv1BurnIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SBTv1Burn)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(SBTv1Burn)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *SBTv1BurnIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SBTv1BurnIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SBTv1Burn represents a Burn event raised by the SBTv1 contract.
type SBTv1Burn struct {
	From    common.Address
	TokenId *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterBurn is a free log retrieval operation binding the contract event 0xcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5.
//
// Solidity: event Burn(address indexed from, uint256 indexed tokenId)
func (_SBTv1 *SBTv1Filterer) FilterBurn(opts *bind.FilterOpts, from []common.Address, tokenId []*big.Int) (*SBTv1BurnIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _SBTv1.contract.FilterLogs(opts, "Burn", fromRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return &SBTv1BurnIterator{contract: _SBTv1.contract, event: "Burn", logs: logs, sub: sub}, nil
}

// WatchBurn is a free log subscription operation binding the contract event 0xcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5.
//
// Solidity: event Burn(address indexed from, uint256 indexed tokenId)
func (_SBTv1 *SBTv1Filterer) WatchBurn(opts *bind.WatchOpts, sink chan<- *SBTv1Burn, from []common.Address, tokenId []*big.Int) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _SBTv1.contract.WatchLogs(opts, "Burn", fromRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SBTv1Burn)
				if err := _SBTv1.contract.UnpackLog(event, "Burn", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseBurn is a log parse operation binding the contract event 0xcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5.
//
// Solidity: event Burn(address indexed from, uint256 indexed tokenId)
func (_SBTv1 *SBTv1Filterer) ParseBurn(log types.Log) (*SBTv1Burn, error) {
	event := new(SBTv1Burn)
	if err := _SBTv1.contract.UnpackLog(event, "Burn", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SBTv1ConfigUpdatedIterator is returned from FilterConfigUpdated and is used to iterate over the raw logs and unpacked data for ConfigUpdated events raised by the SBTv1 contract.
type SBTv1ConfigUpdatedIterator struct {
	Event *SBTv1ConfigUpdated // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *SBTv1ConfigUpdatedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SBTv1ConfigUpdated)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(SBTv1ConfigUpdated)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *SBTv1ConfigUpdatedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SBTv1ConfigUpdatedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SBTv1ConfigUpdated represents a ConfigUpdated event raised by the SBTv1 contract.
type SBTv1ConfigUpdated struct {
	Raw types.Log // Blockchain specific contextual infos
}

// FilterConfigUpdated is a free log retrieval operation binding the contract event 0xfe891c6ab12cf73707f8deb6600c12ba382e4cc31eb2b0a2754cad13075ed2d1.
//
// Solidity: event ConfigUpdated()
func (_SBTv1 *SBTv1Filterer) FilterConfigUpdated(opts *bind.FilterOpts) (*SBTv1ConfigUpdatedIterator, error) {

	logs, sub, err := _SBTv1.contract.FilterLogs(opts, "ConfigUpdated")
	if err != nil {
		return nil, err
	}
	return &SBTv1ConfigUpdatedIterator{contract: _SBTv1.contract, event: "ConfigUpdated", logs: logs, sub: sub}, nil
}

// WatchConfigUpdated is a free log subscription operation binding the contract event 0xfe891c6ab12cf73707f8deb6600c12ba382e4cc31eb2b0a2754cad13075ed2d1.
//
// Solidity: event ConfigUpdated()
func (_SBTv1 *SBTv1Filterer) WatchConfigUpdated(opts *bind.WatchOpts, sink chan<- *SBTv1ConfigUpdated) (event.Subscription, error) {

	logs, sub, err := _SBTv1.contract.WatchLogs(opts, "ConfigUpdated")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SBTv1ConfigUpdated)
				if err := _SBTv1.contract.UnpackLog(event, "ConfigUpdated", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseConfigUpdated is a log parse operation binding the contract event 0xfe891c6ab12cf73707f8deb6600c12ba382e4cc31eb2b0a2754cad13075ed2d1.
//
// Solidity: event ConfigUpdated()
func (_SBTv1 *SBTv1Filterer) ParseConfigUpdated(log types.Log) (*SBTv1ConfigUpdated, error) {
	event := new(SBTv1ConfigUpdated)
	if err := _SBTv1.contract.UnpackLog(event, "ConfigUpdated", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SBTv1ConsecutiveTransferIterator is returned from FilterConsecutiveTransfer and is used to iterate over the raw logs and unpacked data for ConsecutiveTransfer events raised by the SBTv1 contract.
type SBTv1ConsecutiveTransferIterator struct {
	Event *SBTv1ConsecutiveTransfer // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *SBTv1ConsecutiveTransferIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SBTv1ConsecutiveTransfer)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(SBTv1ConsecutiveTransfer)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *SBTv1ConsecutiveTransferIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SBTv1ConsecutiveTransferIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SBTv1ConsecutiveTransfer represents a ConsecutiveTransfer event raised by the SBTv1 contract.
type SBTv1ConsecutiveTransfer struct {
	FromTokenId *big.Int
	ToTokenId   *big.Int
	From        common.Address
	To          common.Address
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterConsecutiveTransfer is a free log retrieval operation binding the contract event 0xdeaa91b6123d068f5821d0fb0678463d1a8a6079fe8af5de3ce5e896dcf9133d.
//
// Solidity: event ConsecutiveTransfer(uint256 indexed fromTokenId, uint256 toTokenId, address indexed from, address indexed to)
func (_SBTv1 *SBTv1Filterer) FilterConsecutiveTransfer(opts *bind.FilterOpts, fromTokenId []*big.Int, from []common.Address, to []common.Address) (*SBTv1ConsecutiveTransferIterator, error) {

	var fromTokenIdRule []interface{}
	for _, fromTokenIdItem := range fromTokenId {
		fromTokenIdRule = append(fromTokenIdRule, fromTokenIdItem)
	}

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SBTv1.contract.FilterLogs(opts, "ConsecutiveTransfer", fromTokenIdRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &SBTv1ConsecutiveTransferIterator{contract: _SBTv1.contract, event: "ConsecutiveTransfer", logs: logs, sub: sub}, nil
}

// WatchConsecutiveTransfer is a free log subscription operation binding the contract event 0xdeaa91b6123d068f5821d0fb0678463d1a8a6079fe8af5de3ce5e896dcf9133d.
//
// Solidity: event ConsecutiveTransfer(uint256 indexed fromTokenId, uint256 toTokenId, address indexed from, address indexed to)
func (_SBTv1 *SBTv1Filterer) WatchConsecutiveTransfer(opts *bind.WatchOpts, sink chan<- *SBTv1ConsecutiveTransfer, fromTokenId []*big.Int, from []common.Address, to []common.Address) (event.Subscription, error) {

	var fromTokenIdRule []interface{}
	for _, fromTokenIdItem := range fromTokenId {
		fromTokenIdRule = append(fromTokenIdRule, fromTokenIdItem)
	}

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _SBTv1.contract.WatchLogs(opts, "ConsecutiveTransfer", fromTokenIdRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SBTv1ConsecutiveTransfer)
				if err := _SBTv1.contract.UnpackLog(event, "ConsecutiveTransfer", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseConsecutiveTransfer is a log parse operation binding the contract event 0xdeaa91b6123d068f5821d0fb0678463d1a8a6079fe8af5de3ce5e896dcf9133d.
//
// Solidity: event ConsecutiveTransfer(uint256 indexed fromTokenId, uint256 toTokenId, address indexed from, address indexed to)
func (_SBTv1 *SBTv1Filterer) ParseConsecutiveTransfer(log types.Log) (*SBTv1ConsecutiveTransfer, error) {
	event := new(SBTv1ConsecutiveTransfer)
	if err := _SBTv1.contract.UnpackLog(event, "ConsecutiveTransfer", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SBTv1ContractSealedIterator is returned from FilterContractSealed and is used to iterate over the raw logs and unpacked data for ContractSealed events raised by the SBTv1 contract.
type SBTv1ContractSealedIterator struct {
	Event *SBTv1ContractSealed // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *SBTv1ContractSealedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SBTv1ContractSealed)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(SBTv1ContractSealed)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *SBTv1ContractSealedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SBTv1ContractSealedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SBTv1ContractSealed represents a ContractSealed event raised by the SBTv1 contract.
type SBTv1ContractSealed struct {
	Raw types.Log // Blockchain specific contextual infos
}

// FilterContractSealed is a free log retrieval operation binding the contract event 0xa0058887862c892ade184993a48c672897bca2e36ebf7fa2b4703d4805fc3a01.
//
// Solidity: event ContractSealed()
func (_SBTv1 *SBTv1Filterer) FilterContractSealed(opts *bind.FilterOpts) (*SBTv1ContractSealedIterator, error) {

	logs, sub, err := _SBTv1.contract.FilterLogs(opts, "ContractSealed")
	if err != nil {
		return nil, err
	}
	return &SBTv1ContractSealedIterator{contract: _SBTv1.contract, event: "ContractSealed", logs: logs, sub: sub}, nil
}

// WatchContractSealed is a free log subscription operation binding the contract event 0xa0058887862c892ade184993a48c672897bca2e36ebf7fa2b4703d4805fc3a01.
//
// Solidity: event ContractSealed()
func (_SBTv1 *SBTv1Filterer) WatchContractSealed(opts *bind.WatchOpts, sink chan<- *SBTv1ContractSealed) (event.Subscription, error) {

	logs, sub, err := _SBTv1.contract.WatchLogs(opts, "ContractSealed")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SBTv1ContractSealed)
				if err := _SBTv1.contract.UnpackLog(event, "ContractSealed", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseContractSealed is a log parse operation binding the contract event 0xa0058887862c892ade184993a48c672897bca2e36ebf7fa2b4703d4805fc3a01.
//
// Solidity: event ContractSealed()
func (_SBTv1 *SBTv1Filterer) ParseContractSealed(log types.Log) (*SBTv1ContractSealed, error) {
	event := new(SBTv1ContractSealed)
	if err := _SBTv1.contract.UnpackLog(event, "ContractSealed", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SBTv1OwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the SBTv1 contract.
type SBTv1OwnershipTransferredIterator struct {
	Event *SBTv1OwnershipTransferred // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *SBTv1OwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SBTv1OwnershipTransferred)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(SBTv1OwnershipTransferred)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *SBTv1OwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SBTv1OwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SBTv1OwnershipTransferred represents a OwnershipTransferred event raised by the SBTv1 contract.
type SBTv1OwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_SBTv1 *SBTv1Filterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*SBTv1OwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _SBTv1.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &SBTv1OwnershipTransferredIterator{contract: _SBTv1.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_SBTv1 *SBTv1Filterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *SBTv1OwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _SBTv1.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SBTv1OwnershipTransferred)
				if err := _SBTv1.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseOwnershipTransferred is a log parse operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_SBTv1 *SBTv1Filterer) ParseOwnershipTransferred(log types.Log) (*SBTv1OwnershipTransferred, error) {
	event := new(SBTv1OwnershipTransferred)
	if err := _SBTv1.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SBTv1RevokeIterator is returned from FilterRevoke and is used to iterate over the raw logs and unpacked data for Revoke events raised by the SBTv1 contract.
type SBTv1RevokeIterator struct {
	Event *SBTv1Revoke // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *SBTv1RevokeIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SBTv1Revoke)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(SBTv1Revoke)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *SBTv1RevokeIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SBTv1RevokeIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SBTv1Revoke represents a Revoke event raised by the SBTv1 contract.
type SBTv1Revoke struct {
	From    common.Address
	TokenId *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterRevoke is a free log retrieval operation binding the contract event 0xec9ab91322523c899ede7830ec9bfc992b5981cdcc27b91162fb23de5791117b.
//
// Solidity: event Revoke(address indexed from, uint256 indexed tokenId)
func (_SBTv1 *SBTv1Filterer) FilterRevoke(opts *bind.FilterOpts, from []common.Address, tokenId []*big.Int) (*SBTv1RevokeIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _SBTv1.contract.FilterLogs(opts, "Revoke", fromRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return &SBTv1RevokeIterator{contract: _SBTv1.contract, event: "Revoke", logs: logs, sub: sub}, nil
}

// WatchRevoke is a free log subscription operation binding the contract event 0xec9ab91322523c899ede7830ec9bfc992b5981cdcc27b91162fb23de5791117b.
//
// Solidity: event Revoke(address indexed from, uint256 indexed tokenId)
func (_SBTv1 *SBTv1Filterer) WatchRevoke(opts *bind.WatchOpts, sink chan<- *SBTv1Revoke, from []common.Address, tokenId []*big.Int) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _SBTv1.contract.WatchLogs(opts, "Revoke", fromRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SBTv1Revoke)
				if err := _SBTv1.contract.UnpackLog(event, "Revoke", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseRevoke is a log parse operation binding the contract event 0xec9ab91322523c899ede7830ec9bfc992b5981cdcc27b91162fb23de5791117b.
//
// Solidity: event Revoke(address indexed from, uint256 indexed tokenId)
func (_SBTv1 *SBTv1Filterer) ParseRevoke(log types.Log) (*SBTv1Revoke, error) {
	event := new(SBTv1Revoke)
	if err := _SBTv1.contract.UnpackLog(event, "Revoke", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SBTv1TransferIterator is returned from FilterTransfer and is used to iterate over the raw logs and unpacked data for Transfer events raised by the SBTv1 contract.
type SBTv1TransferIterator struct {
	Event *SBTv1Transfer // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *SBTv1TransferIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SBTv1Transfer)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(SBTv1Transfer)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *SBTv1TransferIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SBTv1TransferIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SBTv1Transfer represents a Transfer event raised by the SBTv1 contract.
type SBTv1Transfer struct {
	From    common.Address
	To      common.Address
	TokenId *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterTransfer is a free log retrieval operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)
func (_SBTv1 *SBTv1Filterer) FilterTransfer(opts *bind.FilterOpts, from []common.Address, to []common.Address, tokenId []*big.Int) (*SBTv1TransferIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _SBTv1.contract.FilterLogs(opts, "Transfer", fromRule, toRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return &SBTv1TransferIterator{contract: _SBTv1.contract, event: "Transfer", logs: logs, sub: sub}, nil
}

// WatchTransfer is a free log subscription operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)
func (_SBTv1 *SBTv1Filterer) WatchTransfer(opts *bind.WatchOpts, sink chan<- *SBTv1Transfer, from []common.Address, to []common.Address, tokenId []*big.Int) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _SBTv1.contract.WatchLogs(opts, "Transfer", fromRule, toRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SBTv1Transfer)
				if err := _SBTv1.contract.UnpackLog(event, "Transfer", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseTransfer is a log parse operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)
func (_SBTv1 *SBTv1Filterer) ParseTransfer(log types.Log) (*SBTv1Transfer, error) {
	event := new(SBTv1Transfer)
	if err := _SBTv1.contract.UnpackLog(event, "Transfer", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
