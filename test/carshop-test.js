const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Car sell in Carshop", function() {
  const initialAmount = 100;
  let owner, acc1, acc2, token1, carShop;

  beforeEach("create and deploy contracts", async () => {
    [ owner, acc1, acc2 ] = await ethers.getSigners();

    MockERC20 = await ethers.getContractFactory("MockERC20");
    token1 = await MockERC20.deploy(initialAmount);

    const CarShop = await ethers.getContractFactory("CarShop");
    carShop = await CarShop.deploy();
    await carShop.deployed();
  });

  it("Add car is working", async function() {   
    await carShop.addCar('0x1cbd3b2770909d4e10f157cabc84c7264073c9ec', 10)
    const carIds = await carShop.getCarIds();
    expect(carIds.length).to.equal(1);   
  })
});
