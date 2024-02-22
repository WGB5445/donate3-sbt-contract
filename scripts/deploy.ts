import hre, { ethers, upgrades } from "hardhat";

async function main() {
  const Donate3SBT = await ethers.getContractFactory("Donate3SBT");
  const donate3SBT = await upgrades.deployProxy(Donate3SBT, [
    "0x0000000000000000000000000000000000000001",
    "name",
    "symbol",
    "baseURI",
  ]);
  await donate3SBT.waitForDeployment();
  console.log(`Donate3 SBT deployed to ${await donate3SBT.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
