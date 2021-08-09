const { BigNumber } = require("@ethersproject/bignumber");
const hh = require("hardhat");

async function main() {
  await hh.run('compile');
  [ owner, accout1, accout2 ] = await ethers.getSigners();

  const MockERC20 = await hh.ethers.getContractFactory("MockERC20");
  const mockERC20 = await MockERC20.deploy(100);

  await mockERC20.deployed();

  const SellCar = await hh.ethers.getContractFactory("SellCar");

  const sellCar = await SellCar.deploy();
  
  await sellCar.deployed();

  await sellCar.addCar(mockERC20.address, 10);

  const carIdList = await sellCar.getCarIdList();
  console.log(carIdList);

  console.log("MockERC20:", mockERC20.address,
    "\nSellCar:", sellCar.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
