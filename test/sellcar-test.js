const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Selling car in SellCar", function() {
  const initialAmount = 100;
  let owner, account1, account2, token, sellCar;

  beforeEach("create and deploy contracts", async () => {
    [ owner, account1, account2 ] = await ethers.getSigners();

    MockERC20 = await ethers.getContractFactory("MockERC20");
    token = await MockERC20.deploy(initialAmount);

    const SellCar = await ethers.getContractFactory("SellCar");
    sellCar = await SellCar.deploy();
    await sellCar.deployed();
  });

  it("Add new car is correct", async function() {   
    await sellCar.addCar(token.address, 10)
    const carIdList = await sellCar.getCarIds();
    expect(carIdList.length).to.equal(1);   
  })
});
