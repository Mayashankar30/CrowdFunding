import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Navbar } from './component';
import {CampaignDetails, CreateCampaign, Home} from './pages';

const App = () => {
  return (
    <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
      <Navbar />

      <Routes>
        <Route path="/" element ={<Home/>}/>

        <Route path="/create-campaign" element = {<CreateCampaign/>}/>
        <Route path = "/campaign-details/:id" element = {<CampaignDetails/>} />
      </Routes>
    </div>
  )
}

export default App