import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre, { ethers, upgrades } from "hardhat";
import { getAddress } from "viem";

describe("Donate3SBT", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    const Donate3SBT = await ethers.getContractFactory("Donate3SBT");
    const donate3SBT = await upgrades.deployProxy(Donate3SBT, [
      owner.account.address,
      "name",
      "symbol",
      "baseURI",
    ]);

    const publicClient = await hre.viem.getPublicClient();

    return {
      donate3SBT,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { owner, donate3SBT } = await loadFixture(deployOneYearLockFixture);

      expect(await donate3SBT.owner()).to.equal(
        getAddress(owner.account.address)
      );
    });

    it("Should MintTo", async function () {
      const { owner, donate3SBT, otherAccount } = await loadFixture(
        deployOneYearLockFixture
      );
      await donate3SBT.mintTo(otherAccount.account.address);

      expect(await donate3SBT.tokenURI(0)).to.equal(
        "baseURI/0x70997970c51812dc3a010c7d01b50e0d17dc79c8/0"
      );
    });
  });
});
