// components/ActionButtons.tsx
import React from 'react';
import { CryptoDetail } from '../../utils/types';

interface ActionButtonsProps {
  data: CryptoDetail;
  formatNumber: (num: string) => string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ data, formatNumber }) => {
  const message = `Welcome to Pi42! Today's update on ${data.s}.\n` +
                  `Symbol name: ${data.s}\n` +
                  `Last price: ₹${formatNumber(data.c)}\n` +
                  `24 hour change percentage: ${data.P}%\n` +
                  `24 hour volume: ${formatNumber(data.v)}\n` +
                  `24 hour high: ₹${formatNumber(data.h)}\n` +
                  `24 hour low: ₹${formatNumber(data.l)}`;

  const downloadData = () => {
    const element = document.createElement("a");
    const file = new Blob([message], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${data.s}_details.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.s} Crypto Details`,
          text: message
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="flex justify-start items-center space-x-2">
        <button onClick={handleShare} className="p-1">
            <img src="/send.svg" alt="Share" className="invert brightness-0 opacity-30 hover:scale-110 hover:opacity-100 w-6 h-6" />
        </button>
        <button onClick={downloadData} className="p-1">
            <img src="/download.svg" alt="Download" className="invert brightness-0 opacity-30 hover:scale-110 hover:opacity-100 w-6 h-6" />
        </button>
    </div>
  );
}

export default ActionButtons;
