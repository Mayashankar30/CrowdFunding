

import React from 'react';
import { useNavigate } from 'react-router-dom';

import CampaignCard from './CampaignCard';
import { loader } from '../assets';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.campaignId}`, { state: campaign });
  };

  return (
    <div className="w-full py-10">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <h2 className="font-sansserif font-bold text-[22px] text-[#17202a ]">
          {title}
        </h2>
        <p className="text-sm text-[#34495e] font-epilogue">
          {campaigns.length} Campaign{campaigns.length !== 1 && 's'}
        </p>
      </div>


      <div className="min-h-[120px]">
        {isLoading ? (
          // Loading state
          <div className="flex justify-center items-center">
            <img src={loader} alt="loader" className="w-[70px] h-[70px] opacity-60" />
          </div>
        ) : campaigns.length === 0 ? (
          // Empty State
          <p className="text-center font-epilogue text-[15px] text-[#34495e]">
            No campaigns found. Be the first to create one!
          </p>
        ) : (
          // Horizontal Card Layout (vertical stack)
          <div className="flex flex-col gap-6">
            {campaigns.map((campaign) => (
              <CampaignCard
                key={campaign.campaignId}
                {...campaign}
                handleClick={() => handleNavigate(campaign)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayCampaigns;