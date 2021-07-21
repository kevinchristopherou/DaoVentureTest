// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./interfaces/IERC20Minimal.sol";

contract CarShop {
    struct Car {
        uint256 id;
        address owner;
        uint256 price;
        bool isSell;
    }

    uint256 public _currCarId;
    uint256[] public carIds;
    uint256[] public carSellIds;
    mapping(uint256 => Car) public carById;
    
    // Add a car into inventory list - add id into carIds list and make car object with mapping id into Car struct object
    function addCar (address owner, uint256 price) 
        public 
        returns (uint256) {
        uint256 currCarId_ = ++_currCarId;
        Car storage _car = carById[currCarId_];
        _car.id = currCarId_;
        _car.owner = owner;
        _car.price = price;
        _car.isSell = false;

        carIds.push(currCarId_);

        return currCarId_;
    }

    // Sell a car with carId - transfer token from buyer to car owner based on car price and set isSell flag true
    function sellCar (
        uint256 carId, address token
    ) public {
        require(
            carId < _currCarId,
            "Car id is out of range"
        );

        Car storage _car = carById[carId];
        require(
            IERC20Minimal(token).transferFrom(msg.sender, _car.owner, _car.price),
            "Failed to transfer tokens"
        );
        _car.isSell = true;
        carSellIds.push(carId);
    }

    // Return car Ids list
    function getCarIds () 
        public view 
        returns (uint256 [] memory) {
        return carIds;
    }

    // Return Sell car Ids list
    function getSellCarIds () 
        public view
        returns (uint256 [] memory) {
        return carSellIds;
    }
}
