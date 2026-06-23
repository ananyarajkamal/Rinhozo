import React from 'react';
import type { UIStrings } from '../locales/strings';

interface LandingPageProps {
  strings: UIStrings;
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="w-screen h-screen bg-[#faf6f0] flex items-center justify-center p-0 m-0 overflow-hidden select-none">
      
      {/* 3:2 Aspect Ratio Mockup Container */}
      <div className="relative aspect-[1920/1280] w-full max-w-full max-h-full shadow-2xl overflow-hidden bg-[#faf6f0]">
        
        {/* Mockup Image */}
        <img 
          src="/assets/hero_page.jpg" 
          alt="Rinhozo Landing Page" 
          className="w-full h-full object-contain pointer-events-none"
        />

        {/* CLICKABLE OVERLAYS (Pixel-Perfect Buttons matching Mockup Coordinates) */}
        
        {/* Top-Right "Get Started" Button */}
        <button 
          onClick={onGetStarted}
          className="absolute top-[3.3%] right-[5.2%] w-[10.8%] h-[4.5%] rounded-full cursor-pointer hover:bg-black/5 active:bg-black/10 transition-colors border-0 focus:outline-none"
          title="Get Started"
        />

        {/* Left Column "Start Your Journey" Button */}
        <button 
          onClick={onGetStarted}
          className="absolute bottom-[29.7%] left-[5.2%] w-[14.8%] h-[5.2%] rounded-full cursor-pointer hover:bg-white/10 active:bg-white/20 transition-colors border-0 focus:outline-none"
          title="Start Your Journey"
        />

        {/* Left Column "See How It Works" Button */}
        <button 
          onClick={onGetStarted}
          className="absolute bottom-[29.7%] left-[21.3%] w-[16%] h-[5.2%] rounded-full cursor-pointer hover:bg-black/5 active:bg-black/10 transition-colors border-0 focus:outline-none"
          title="See How It Works"
        />

      </div>

    </div>
  );
};

export default LandingPage;
