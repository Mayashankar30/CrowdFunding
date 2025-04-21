


//centralized interface to interact with smart contracts and thirdweb

import React, { createContext, useContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const CrowdFundingContext = createContext();

export const StateContextProvider = ({ children }) => {
  // Connection & Contract Setup
  const address = useAddress();
  const connect = useMetamask();
  const { contract } = useContract('0x089752a6868679b67f866e4f72725b4f25305af6');
  const { mutateAsync: createCampaignAsync } = useContractWrite(contract, 'createCampaign');

  //create new campaign 
  const createCampaign = async (form) => {
    try {
      const data = await createCampaignAsync({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });
      console.log('Campaign created successfully', data);
      return data;
    } catch (error) {
      console.error('Failed to create campaign', error);
      throw error;
    }
  };

 //fetch all campaign
  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      campaignId: i,
    }));

    return parsedCampaigns;
  };

 //fetch all campaign by the user 
  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    return allCampaigns.filter((campaign) => campaign.owner === address);
  };

  //donate to specific campaignId and specific amount 
  //this ampunt is converted into wei from ETH to be stored int blockchain via smart contract
  const donateToCampaign = async (campaignId, amount) => {
    const data = await contract.call('donateToCampaign', [campaignId], {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  //get list of donators at specific campaignId and the donated amount
  const getDonators = async (campaignId) => {
    const donations = await contract.call('getDonators', [campaignId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];
    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <CrowdFundingContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign,
        getCampaigns,
        getUserCampaigns,
        donateToCampaign,
        getDonators,
      }}
    >
      {children}
    </CrowdFundingContext.Provider>
  );
};

  
export const useStateContext = () => useContext(CrowdFundingContext);