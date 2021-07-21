// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { BigNumber } = require("@ethersproject/bignumber");
const hh = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  await hh.run('compile');
  [ owner, acc1, acc2 ] = await ethers.getSigners();

  const accounts = await ethers.getSigners();

  const MockERC20 = await hh.ethers.getContractFactory("MockERC20");
  const mockERC20 = await MockERC20.deploy(100);

  await mockERC20.deployed();

  const CarShop = await hh.ethers.getContractFactory("CarShop");

  const carShop = await CarShop.deploy();
  
  await carShop.deployed();

  await carShop.addCar('0x1cbd3b2770909d4e10f157cabc84c7264073c9ec', 10);
  await carShop.addCar('0xcd3b766ccdd6ae721141f452c550ca635964ce71', 20);

  const carIds = await carShop.getCarIds();
  console.log(carIds);

  console.log("MockERC20:", mockERC20.address,
    "\nCarShop:", carShop.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
