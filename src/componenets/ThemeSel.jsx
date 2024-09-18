import React, { useState, useEffect } from 'react';
import ThemeCard from './ThemeCard';
import { cardsData } from '../assets/Data';

const ThemeSel = ({ onSelectionChange }) => {
  const [activeCardIndices, setActiveCardIndices] = useState([]);

  const toggleActiveCard = (index) => {
    setActiveCardIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((i) => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  // Compute selected titles based on activeCardIndices
  const selectedTitles = cardsData
    .filter((_, index) => activeCardIndices.includes(index))
    .map((card) => card.title);

  // Notify parent component of selection changes
  useEffect(() => {
    onSelectionChange(selectedTitles);
  }, [activeCardIndices]);

  return (
    <div className="w-full items-center">
      <center>
        <p className="text-[#5E6282] text-base">THEME</p>

        <h1 className="text-4xl text-indigo-950">
          What Motivates You For This Journey
        </h1>
        <div className="mt-10 max-w-[1000px] flex flex-wrap align-middle justify-center gap-6 ">
          {cardsData.map((card, index) => (
            <ThemeCard
              key={index}
              title={card.title}
              imageUrl={card.imageUrl}
              isActive={activeCardIndices.includes(index)}
              onClick={() => toggleActiveCard(index)}
            />
          ))}
        </div>
      </center>
    </div>
  );
};

export default ThemeSel;
