// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;


interface IERC20Token {

    function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(address, address, uint256) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Magazino {

    uint internal magazinesLength = 0;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    uint256 internal magazinesId = 0;
    
    event unpublishMagazineEvent(uint256 magazineId);

    struct Magazine{
        address payable owner;
        string image;
        string name;
        string edition;
        uint price;
        uint256 magazineId;
        
    }

    mapping (uint =>  Magazine) internal magazines;

    function getMagazine(uint _index) public view returns 
    (address payable, string memory, string memory, string memory, uint, uint256){
        require(_index >= 0, "Enter a valid index");
        return  (  
                magazines[_index].owner,
                magazines[_index].image,
                magazines[_index].name,
                magazines[_index].edition,
                magazines[_index].price,
                magazines[_index].magazineId
                );
       
    }


    function addMagazine (string memory _image, string memory _name, string memory _edition, uint _price) public {
        require(bytes(_image).length > 0, "Enter valid image url");
        require(bytes(_name).length > 0, "Enter valid name");
        require(bytes(_edition).length > 0, "Enter a valid edition");
        require(_price > 0, "Enter a valid price");
        magazines [magazinesLength] =  Magazine(
                    payable(msg.sender),
                    _image,
                    _name,
                    _edition,
                    _price,
                    magazinesId
                    );
        magazinesLength++;
        magazinesId++;
    }


    function buyMagazine(uint _index) public payable  {
        require(msg.sender != magazines[_index].owner, "You can't buy your own magazine");
        require(_index >= 0, "Enter a valid index");
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            magazines[_index].owner,
            magazines[_index].price
                ), "Transfer failed.");
         
    }


    function unpublishMagazine(uint _index) external {
        require(_index >= 0, "Enter a valid index");
	    require(msg.sender == magazines[_index].owner, "Only owner can unpublish magazine");      
        uint256 magazineId = magazines[_index].magazineId;      
        magazines[_index] = magazines[magazinesLength - 1];
        delete magazines[magazinesLength - 1];              
        magazinesLength--; 
        emit unpublishMagazineEvent(magazineId);               
    }

    function getmagazinesLength() public view returns (uint) {
        return (magazinesLength);
    }


}
