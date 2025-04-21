pragma solidity ^0.8.9;


contract CrowdFunding {
    
    struct Campaign {
        address owner;          
        string title;           
        string description;     
        uint256 target;         
        uint256 deadline;      
        uint256 amountCollected;
        string image;           
        address[] donators;     
        uint256[] donations;    
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    
    event CampaignCreated(uint256 indexed campaignId, address indexed owner, uint256 target, uint256 deadline);
    event DonationReceived(uint256 indexed campaignId, address indexed donor, uint256 amount);

 
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(_deadline > block.timestamp, "The deadline should be a future date.");

        require(_target > 0, "Funding target should be greater than 0.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;
        campaign.amountCollected = 0;

        numberOfCampaigns++;

        emit CampaignCreated(numberOfCampaigns - 1, _owner, _target, _deadline);

        return numberOfCampaigns - 1; //id of campaign
    }

   //donate to specific ID
    function donateToCampaign(uint256 _id) public payable {
        require(_id < numberOfCampaigns, "Campaign does not exist.");

        require(msg.value > 0, "Donation amount must be greater than 0.");

        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        require(block.timestamp < campaign.deadline, "Campaign deadline has passed.");

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected += amount;
            emit DonationReceived(_id, msg.sender, amount);
        } else {
            revert("Failed to send donation.");
        }
    }


    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        require(_id < numberOfCampaigns, "Campaign does not exist.");
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}