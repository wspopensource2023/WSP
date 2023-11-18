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

// SealableMetaData contains all meta data concerning the Sealable contract.
var SealableMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[],\"name\":\"ErrContractSealed\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[],\"name\":\"ContractSealed\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"contractSealed\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
	Bin: "0x6080604052348015600f57600080fd5b5060838061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063b650163714602d575b600080fd5b60005460399060ff1681565b604051901515815260200160405180910390f3fea2646970667358221220bcd313bb7e1331b1e40b712978276c9c1f9411258d94aea4ceee531e37e1dda464736f6c63430008110033",
}

// SealableABI is the input ABI used to generate the binding from.
// Deprecated: Use SealableMetaData.ABI instead.
var SealableABI = SealableMetaData.ABI

// SealableBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use SealableMetaData.Bin instead.
var SealableBin = SealableMetaData.Bin

// DeploySealable deploys a new Ethereum contract, binding an instance of Sealable to it.
func DeploySealable(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *Sealable, error) {
	parsed, err := SealableMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(SealableBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &Sealable{SealableCaller: SealableCaller{contract: contract}, SealableTransactor: SealableTransactor{contract: contract}, SealableFilterer: SealableFilterer{contract: contract}}, nil
}

// Sealable is an auto generated Go binding around an Ethereum contract.
type Sealable struct {
	SealableCaller     // Read-only binding to the contract
	SealableTransactor // Write-only binding to the contract
	SealableFilterer   // Log filterer for contract events
}

// SealableCaller is an auto generated read-only Go binding around an Ethereum contract.
type SealableCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SealableTransactor is an auto generated write-only Go binding around an Ethereum contract.
type SealableTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SealableFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type SealableFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SealableSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type SealableSession struct {
	Contract     *Sealable         // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// SealableCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type SealableCallerSession struct {
	Contract *SealableCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts   // Call options to use throughout this session
}

// SealableTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type SealableTransactorSession struct {
	Contract     *SealableTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts   // Transaction auth options to use throughout this session
}

// SealableRaw is an auto generated low-level Go binding around an Ethereum contract.
type SealableRaw struct {
	Contract *Sealable // Generic contract binding to access the raw methods on
}

// SealableCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type SealableCallerRaw struct {
	Contract *SealableCaller // Generic read-only contract binding to access the raw methods on
}

// SealableTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type SealableTransactorRaw struct {
	Contract *SealableTransactor // Generic write-only contract binding to access the raw methods on
}

// NewSealable creates a new instance of Sealable, bound to a specific deployed contract.
func NewSealable(address common.Address, backend bind.ContractBackend) (*Sealable, error) {
	contract, err := bindSealable(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Sealable{SealableCaller: SealableCaller{contract: contract}, SealableTransactor: SealableTransactor{contract: contract}, SealableFilterer: SealableFilterer{contract: contract}}, nil
}

// NewSealableCaller creates a new read-only instance of Sealable, bound to a specific deployed contract.
func NewSealableCaller(address common.Address, caller bind.ContractCaller) (*SealableCaller, error) {
	contract, err := bindSealable(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &SealableCaller{contract: contract}, nil
}

// NewSealableTransactor creates a new write-only instance of Sealable, bound to a specific deployed contract.
func NewSealableTransactor(address common.Address, transactor bind.ContractTransactor) (*SealableTransactor, error) {
	contract, err := bindSealable(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &SealableTransactor{contract: contract}, nil
}

// NewSealableFilterer creates a new log filterer instance of Sealable, bound to a specific deployed contract.
func NewSealableFilterer(address common.Address, filterer bind.ContractFilterer) (*SealableFilterer, error) {
	contract, err := bindSealable(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &SealableFilterer{contract: contract}, nil
}

// bindSealable binds a generic wrapper to an already deployed contract.
func bindSealable(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(SealableABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Sealable *SealableRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Sealable.Contract.SealableCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Sealable *SealableRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Sealable.Contract.SealableTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Sealable *SealableRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Sealable.Contract.SealableTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Sealable *SealableCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Sealable.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Sealable *SealableTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Sealable.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Sealable *SealableTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Sealable.Contract.contract.Transact(opts, method, params...)
}

// ContractSealed is a free data retrieval call binding the contract method 0xb6501637.
//
// Solidity: function contractSealed() view returns(bool)
func (_Sealable *SealableCaller) ContractSealed(opts *bind.CallOpts) (bool, error) {
	var out []interface{}
	err := _Sealable.contract.Call(opts, &out, "contractSealed")

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// ContractSealed is a free data retrieval call binding the contract method 0xb6501637.
//
// Solidity: function contractSealed() view returns(bool)
func (_Sealable *SealableSession) ContractSealed() (bool, error) {
	return _Sealable.Contract.ContractSealed(&_Sealable.CallOpts)
}

// ContractSealed is a free data retrieval call binding the contract method 0xb6501637.
//
// Solidity: function contractSealed() view returns(bool)
func (_Sealable *SealableCallerSession) ContractSealed() (bool, error) {
	return _Sealable.Contract.ContractSealed(&_Sealable.CallOpts)
}

// SealableContractSealedIterator is returned from FilterContractSealed and is used to iterate over the raw logs and unpacked data for ContractSealed events raised by the Sealable contract.
type SealableContractSealedIterator struct {
	Event *SealableContractSealed // Event containing the contract specifics and raw log

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
func (it *SealableContractSealedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SealableContractSealed)
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
		it.Event = new(SealableContractSealed)
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
func (it *SealableContractSealedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SealableContractSealedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SealableContractSealed represents a ContractSealed event raised by the Sealable contract.
type SealableContractSealed struct {
	Raw types.Log // Blockchain specific contextual infos
}

// FilterContractSealed is a free log retrieval operation binding the contract event 0xa0058887862c892ade184993a48c672897bca2e36ebf7fa2b4703d4805fc3a01.
//
// Solidity: event ContractSealed()
func (_Sealable *SealableFilterer) FilterContractSealed(opts *bind.FilterOpts) (*SealableContractSealedIterator, error) {

	logs, sub, err := _Sealable.contract.FilterLogs(opts, "ContractSealed")
	if err != nil {
		return nil, err
	}
	return &SealableContractSealedIterator{contract: _Sealable.contract, event: "ContractSealed", logs: logs, sub: sub}, nil
}

// WatchContractSealed is a free log subscription operation binding the contract event 0xa0058887862c892ade184993a48c672897bca2e36ebf7fa2b4703d4805fc3a01.
//
// Solidity: event ContractSealed()
func (_Sealable *SealableFilterer) WatchContractSealed(opts *bind.WatchOpts, sink chan<- *SealableContractSealed) (event.Subscription, error) {

	logs, sub, err := _Sealable.contract.WatchLogs(opts, "ContractSealed")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SealableContractSealed)
				if err := _Sealable.contract.UnpackLog(event, "ContractSealed", log); err != nil {
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
func (_Sealable *SealableFilterer) ParseContractSealed(log types.Log) (*SealableContractSealed, error) {
	event := new(SealableContractSealed)
	if err := _Sealable.contract.UnpackLog(event, "ContractSealed", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
