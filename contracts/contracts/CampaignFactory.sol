// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Campaign.sol";

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    event CampaignCreated(
        address indexed campaignAddress,
        address indexed creator,
        string title,
        uint256 target,
        uint256 deadline
    );

    function createCampaign(
        string memory title,
        string memory description,
        uint256 target,
        uint256 deadline,
        string memory image
    ) external returns (address) {
        require(deadline > block.timestamp, "Deadline must be in the future");
        
        Campaign newCampaign = new Campaign(
            msg.sender,
            title,
            description,
            target,
            deadline,
            image
        );
        
        address campaignAddress = address(newCampaign);
        deployedCampaigns.push(campaignAddress);
        
        emit CampaignCreated(
            campaignAddress,
            msg.sender,
            title,
            target,
            deadline
        );
        
        return campaignAddress;
    }

    function getDeployedCampaigns() external view returns (address[] memory) {
        return deployedCampaigns;
    }
    
    function getCampaignCount() external view returns (uint256) {
        return deployedCampaigns.length;
    }
}