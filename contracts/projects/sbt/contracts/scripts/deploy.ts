import { ethers } from "hardhat";

async function main() {
    console.log("starting....");
    const factory = await ethers.getContractFactory(
        "contracts/SBTv1.sol:SBTv1"
    );
    const contract = await factory.deploy({
        name: "SBTv1 Test",
        tokenURI:
            "",
        maxSupply: 1000,
        startTime: 0,
        endTime: 0,
        owner: "",
        transferable: true,
    });
    await contract.deployed();
    console.log("contract", contract);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
