pragma solidity 0.8.4;

import "./IERC20Minimal.sol";

contract SellCar {
    struct CarEntity {
        uint256 car_id;
        address car_owner;
        uint256 car_price;
        bool car_sold;
    }

    uint256 public car_count;
    uint256[] public carIdList;
    mapping(uint256 => CarEntity) public carObjectList;
    
    function newCarEntity (
        address car_owner, 
        uint256 car_price
    )   public returns (uint256) {
        uint256 car_count_ = ++ car_count;

        CarEntity storage carEntity_ = carObjectList[car_count_];
        carEntity_.car_id = car_count_;
        carEntity_.car_owner = car_owner;
        carEntity_.car_price = car_price;
        carEntity_.car_sold = false;

        carObjectList[car_count_] = carEntity_;

        carIdList.push(car_count_);

        return car_count_;
    }

    function sellCarEntity (
        uint256 car_id, 
        address car_token
    ) public {
        require(
            car_id < car_count,
            "Car id is out of range."
        );

        CarEntity storage carEntity_ = carObjectList[car_id];

        require(
            carEntity_.car_sold = false,
            "Car is already sold."
        );

        require(
            IERC20Minimal(car_token).transferFrom(msg.sender, carEntity_.car_owner, carEntity_.car_price),
            "Failed to transfer tokens"
        );

        carEntity_.car_sold = true;
        carObjectList[car_id] = carEntity_;
    }

    function getCarIdList () 
        public view 
        returns (uint256 [] memory) {
        return carIdList;
    }
}
