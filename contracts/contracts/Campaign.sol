// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Campaign {
    struct CampaignDetails {
        address creator;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
    }

    CampaignDetails public campaign;
    mapping(address => uint256) public pledges;
    address[] public pledgers;
    bool public finalized = false;

    event Pledge(address indexed pledger, uint256 amount);
    event Unpledge(address indexed pledger, uint256 amount);
    event Finalize(bool success, uint256 amountCollected);
    event CreatorWithdraw(uint256 amount);
    event RefundClaimed(address indexed pledger, uint256 amount);

    constructor(
        address _creator,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) {
        campaign = CampaignDetails({
            creator: _creator,
            title: _title,
            description: _description,
            target: _target,
            deadline: _deadline,
            amountCollected: 0,
            image: _image
        });
    }

    modifier onlyCreator() {
        require(msg.sender == campaign.creator, "Only creator can call this function");
        _;
    }

    modifier campaignActive() {
        require(block.timestamp < campaign.deadline, "Campaign has ended");
        _;
    }

    modifier campaignEnded() {
        require(block.timestamp >= campaign.deadline, "Campaign is still active");
        _;
    }

    modifier notFinalized() {
        require(!finalized, "Campaign already finalized");
        _;
    }

    function pledge() external payable campaignActive {
        require(msg.value > 0, "Pledge amount must be greater than 0");
        
        if (pledges[msg.sender] == 0) {
            pledgers.push(msg.sender);
        }
        
        pledges[msg.sender] += msg.value;
        campaign.amountCollected += msg.value;
        
        emit Pledge(msg.sender, msg.value);
    }

    function unpledge(uint256 amount) external campaignActive {
        require(pledges[msg.sender] >= amount, "Insufficient pledged amount");
        
        pledges[msg.sender] -= amount;
        campaign.amountCollected -= amount;
        
        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "Failed to send SHM");
        
        emit Unpledge(msg.sender, amount);
    }

    function finalize() external campaignEnded notFinalized {
        finalized = true;
        bool success = campaign.amountCollected >= campaign.target;
        
        emit Finalize(success, campaign.amountCollected);
    }

    function withdrawFunds() external onlyCreator {
        require(finalized, "Campaign not finalized yet");
        require(campaign.amountCollected >= campaign.target, "Campaign did not reach target");
        
        uint256 amount = campaign.amountCollected;
        campaign.amountCollected = 0;
        
        (bool sent, ) = payable(campaign.creator).call{value: amount}("");
        require(sent, "Failed to send SHM");
        
        emit CreatorWithdraw(amount);
    }

    function claimRefund() external {
        require(finalized, "Campaign not finalized yet");
        require(campaign.amountCollected < campaign.target, "Campaign was successful");
        
        uint256 amount = pledges[msg.sender];
        require(amount > 0, "No funds to claim");
        
        pledges[msg.sender] = 0;
        
        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "Failed to send SHM");
        
        emit RefundClaimed(msg.sender, amount);
    }

    function getCampaignDetails() external view returns (
        address creator,
        string memory title,
        string memory description,
        uint256 target,
        uint256 deadline,
        uint256 amountCollected,
        string memory image,
        bool isFinalized
    ) {
        return (
            campaign.creator,
            campaign.title,
            campaign.description,
            campaign.target,
            campaign.deadline,
            campaign.amountCollected,
            campaign.image,
            finalized
        );
    }

    function getPledgerCount() external view returns (uint256) {
        return pledgers.length;
    }

    function getPledgerAtIndex(uint256 index) external view returns (address) {
        require(index < pledgers.length, "Index out of bounds");
        return pledgers[index];
    }
}