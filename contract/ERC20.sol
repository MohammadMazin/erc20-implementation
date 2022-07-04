//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract ERC20 {

    uint constant MAX_SUPPLY = 100000;
    uint private _totalSupply;
    address public admin;

    string private name;
    string private symbol;
    uint private decimal;

    mapping (address => uint) private balance;
    mapping(address => mapping(address => uint)) private allowances;

    constructor(string memory _name, string memory _symbol, uint256 _decimal) {
        admin = msg.sender;
        name = _name;
        symbol = _symbol;
        decimal = _decimal;
    }

    
    function _name() public view returns(string memory){
        return name;
    }
    function _symbol() public view returns(string memory){
        return symbol;
    }
    function _decimals() public view returns(uint256){
        return decimal;
    }
    function totalSupply() public view returns(uint256){
        return _totalSupply;
    }

    function balanceOf(address owner) public view returns(uint256) {
        return balance[owner];
    } 

    function mint(uint256 amount) public {
        require(msg.sender != address(0), "ERC20: mint to the zero address");
        require(msg.sender == admin, "Only the admin can mint token");
        require((_totalSupply + amount) <= MAX_SUPPLY , "Total supply cannot exceed Max Supply. Please enter a smaller amount to mint");

        _totalSupply += amount;
        balance[msg.sender] += amount;
    }

    function burn(uint256 amount) public {
        require((balance[msg.sender]-amount) >= 0 , "Burn amount cannot result in a balance less than 0. Please enter a smaller amount to burn");
        balance[msg.sender] -= amount;
        _totalSupply -= amount;
    }

    function transfer(address to, uint256 amount) public {
        _transfer(msg.sender, to, amount);
    }

    function _transfer(address from, address to, uint256 amount) private {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        require(balance[from] >= amount, "You do not have enough tokens to carry out this transaction.");
        
        unchecked{
            balance[from] -= amount;
        }
        balance[to] += amount;    
    }

    function approveAmount(address spender, uint256 amount) public {
  
        uint256 owner = balance[msg.sender];
        require(owner >= amount, "You do not have enough tokens to approve the given user.");
        allowances[msg.sender][spender] += amount;
    }

    function allowance(address owner) public view returns(uint256){
        return allowances[owner][msg.sender];
    }

    function transferFrom (address from, address to, uint256 amount) public {
        
        require(allowances[from][msg.sender] >= amount, "You do not have enough allowance to carry out this transaction");
        
        balance[from] -= amount;
        balance[to] += amount;
        allowances[from][msg.sender] -= amount;
    }


}