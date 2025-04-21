

import React, { useState, useEffect } from 'react';
import { DisplayCampaigns } from '../component';
import { useStateContext } from '../context';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div className="min-h-screen px-8 py-7 bg-[#f9f9f9]  text-black  rounded-[20px]">
      <div className="max-w-7xl mx-auto">

        <DisplayCampaigns
          title="Ongoing Campaigns"
          isLoading={isLoading}
          campaigns={campaigns}
          layout="horizontal"
        />
      </div>
    </div>
  );
};

export default Home;
