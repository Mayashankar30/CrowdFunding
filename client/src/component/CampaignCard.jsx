import React from 'react';

import { tagType, thirdweb } from '../assets';
import { daysLeft } from '../utils';

const CampaignCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
  const remainingDays = daysLeft(deadline);

  return (
    <div
      className="w-full max-w-[1500px] flex flex-row rounded-xl bg-[#990033]/80 backdrop-blur-md hover:shadow-magentaGlow transition-shadow duration-300 cursor-pointer border border-[#990033] overflow-hidden"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative w-[540px] min-w-[240px] h-[245px]">
        <img
          src={image}
          alt="campaign"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 rounded text-xs text-white font-medium">
          {remainingDays} days left
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-5 gap-3 flex-1">
        {/* Tag */}
        {/* <div className="flex items-center gap-2">
          <img src={tagType} alt="tag" className="w-[18px] h-[18px]" />
          <span className="text-xs text-[#808191] font-epilogue">Education</span>
        </div> */}

        {/* Title */}
        <h3 className="text-white font-epilogue font-semibold text-[18px] truncate">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[#b2b3bd] font-epilogue text-sm line-clamp-2">
          {description}
        </p>

        {/* Stats */}
        <div className="flex justify-between items-center border-t border-[#2e2e30] pt-3 mt-2 text-sm">
          <div className="flex flex-col">
            <span className="text-[#ffffff] font-semibold text-[15px]">{amountCollected}</span>
            <span className="text-[#808191] text-xs">Raised of {target}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[#ffffff] font-semibold text-[15px]">{remainingDays}</span>
            <span className="text-[#808191] text-xs">Days Left</span>
          </div>
        </div>

        {/* Owner */}
        <div className="flex items-center gap-3">
          <div className="w-[34px] h-[34px] bg-[#13131a] rounded-full flex items-center justify-center">
            <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain" />
          </div>
          <p className="text-xs text-[#808191] truncate">
            by <span className="text-[#ffffff] font-medium">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CampaignCard
