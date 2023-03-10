// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const S2LToken = await hre.ethers.getContractFactory("S2LToken"); 
  const s2lToken = await S2LToken.deploy(); 
  await s2lToken.deployed(); 
  console.log("Tokens contract deployed to address: ", s2lToken.address);

  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(s2lToken.address);
  await marketplace.deployed();
  await s2lToken.setMarketplaceContractAddress(marketplace.address);
  console.log("Marketplace contract deployed to address: ", marketplace.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
