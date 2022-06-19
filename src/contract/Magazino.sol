   // SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;


interface IERC20Token {
   function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract Magazino {
     uint internal magazinesLength = 0;
      address internal cUsdTokenAddress =  0x686c626E48bfC5DC98a30a9992897766fed4Abd3;
       uint256 internal magazinesId = 0;


        event unpublishMagazineEvent(uint256 magazineId);
        event createMagazineEvent(
        string image,
        string name,
        string edition,
        uint price
    );



         

       struct Magazine{
           address payable owner;
           string image;
           string name;
            string edition;
            uint price;
            uint256 magazineId;
             uint createdAt;
       }

        mapping (uint =>  Magazine) internal magazines;

        function getMagazine(uint _index) public view returns (
        address payable,
        string memory,
        string memory,
        string memory,
        uint,
        uint256,
         uint256


         ) {
        return (  
            magazines[_index].owner,
             magazines[_index].image,
              magazines[_index].name,
               magazines[_index].edition,
                magazines[_index].price,
                 magazines[_index].magazineId,
                  magazines[_index].createdAt

                 
        );
       
    }


           function addMagazine (
        string memory _image,
        string memory _name,
        string memory _edition,
        uint _price
         ) public {

              magazines [magazinesLength] =  Magazine(
            payable(msg.sender),
             _image,
             _name,
             _edition,
             _price,
             magazinesId,
             block.timestamp

              );
                emit createMagazineEvent(_image, _name, _edition, _price);

                magazinesLength++;
          magazinesId++;
         }


          function buyMagazine(uint _index) public payable  {
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            magazines[_index].owner,
            magazines[_index].price
          ),
          "Transfer failed."
        );

        
         
    }


     function unpublishMagazine(uint _index) external {
	         require(msg.sender == magazines[_index].owner, "Only owner can unublish magazine");      
            uint256 magazineId = magazines[_index].magazineId;      
            magazines[_index] = magazines[magazinesLength - 1];
            delete magazines[magazinesLength - 1];
                  
                  magazinesLength--; 
                   emit unpublishMagazineEvent(magazineId);
                   
}

  function getmagazineslength() public view returns (uint) {
        return (magazinesLength);
  }


}

