import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStateContext } from '../context';
import { Loader, CustomButton, UtilityBox } from '../component';
import { thirdweb } from '../assets';
import { calculateBarPercentage, daysLeft } from '../utils';
const CampaignDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { contract, donateToCampaign, getDonators, address } = useStateContext();

  const [donators, setDonators] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');

  const remainingDays = daysLeft(state.deadline);

  useEffect(() => {
    const fetchDonors = async () => {
      if (contract) {
        const donations = await getDonators(state.campaignId);
        setDonators(donations);
      }
    };

    fetchDonors();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);
    await donateToCampaign(state.campaignId, amount);
    setIsLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-black">
      {isLoading && <Loader />}

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <header className="grid lg:grid-cols-3 gap-10">
          <div className="col-span-1 lg:col-span-2">
            <img src={state.image} alt="Campaign" className="w-full h-[450px] object-cover rounded-xl shadow-lg" />
          </div>

          <aside className="space-y-4">
            <div className="grid grid-cols-1 grid-row-2 gap-4">
              <UtilityBox title="Days Left" value={remainingDays} />
              <UtilityBox title={`Raised of ${state.target}`} value={state.amountCollected} />
              <UtilityBox title="Backers" value={donators.length} />
            </div>

            <div className="w-full h-3 bg-gray-300 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%` }}
              ></div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-black font-semibold mb-2">Created By</h3>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <img src={thirdweb} alt="creator" className="w-5 h-5 object-contain" />
                </div>
                <div>
                  <p className="font-medium break-all text-black">{state.owner}</p>
                  <p className="text-xs text-black">Verified Campaigner</p>
                </div>
              </div>
            </div>
          </aside>
        </header>

        <section className="grid md:grid-cols-2 gap-10">
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-black font-bold">Campaign Description</h2>
            <p className="text-black text-sm leading-relaxed text-justify">
              {state.description}
            </p>
          </div>

          <div className="bg-indigo-100 p-6 rounded-xl space-y-6">
            <h3 className="text-center text-black font-bold">Donate to this Campaign</h3>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="ETH Amount"
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <CustomButton
              btnType="button"
              title="Donate Now"
              styles="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
              handleClick={handleDonate}
            />
          </div>
        </section>

        <footer className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-black font-bold mb-4">Backers List</h3>
          {donators.length > 0 ? (
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {donators.map((item, index) => (
                <li key={`${item.donator}-${index}`} className="flex justify-between text-sm bg-gray-100 p-2 rounded">
                  <span>{index + 1}. {item.donator}</span>
                  <span className="font-semibold">{item.donation} ETH</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-black">No donations yet.</p>
          )}
        </footer>
      </div>
    </div>
  );
};

export default CampaignDetails;