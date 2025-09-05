import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const generateShuffledCards = () => {
  const numbers = [];
  // Create pairs of numbers (0-7, two of each)
  for (let i = 0; i < 8; i++) {
    numbers.push(i, i);
  }
  
  // Shuffle the array
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  
  // Create card objects
  return numbers.map((num, idx) => ({
    id: idx,
    value: num,
    flipped: false,
    matched: false,
  }));
};

const MemoryGame = () => {
  const [cards, setCards] = useState(generateShuffledCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('memoryGameBestScore');
    return saved ? parseInt(saved) : null;
  });

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isActive && !gameWon) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, gameWon]);

  // Handle card flipping logic
  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.value === secondCard.value) {
        // Match found
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map((card, idx) =>
              idx === firstIndex || idx === secondIndex
                ? { ...card, matched: true, flipped: false }
                : card
            )
          );
          setMatchedCount(prev => prev + 1);
          setFlippedIndices([]);
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map((card, idx) =>
              idx === firstIndex || idx === secondIndex
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedIndices([]);
        }, 1000);
      }
    }
  }, [flippedIndices, cards]);

  // Check for game completion
  useEffect(() => {
    if (matchedCount === 8) {
      setGameWon(true);
      setIsActive(false);
      
      // Update best score
      if (!bestScore || timer < bestScore) {
        setBestScore(timer);
        localStorage.setItem('memoryGameBestScore', timer.toString());
      }
    }
  }, [matchedCount, timer, bestScore]);

  const handleCardClick = (index) => {
    // Prevent clicking if card is already flipped, matched, or if two cards are already flipped
    if (
      cards[index].flipped || 
      cards[index].matched || 
      flippedIndices.length === 2 ||
      gameWon
    ) {
      return;
    }

    // Flip the card
    setCards(prevCards =>
      prevCards.map((card, idx) =>
        idx === index ? { ...card, flipped: true } : card
      )
    );

    // Add to flipped indices
    setFlippedIndices(prev => [...prev, index]);
  };

  const handleRestart = () => {
    setCards(generateShuffledCards());
    setFlippedIndices([]);
    setMatchedCount(0);
    setTimer(0);
    setIsActive(true);
    setGameWon(false);
  };

  const formatTime = (seconds) => {
    return `${seconds}s`;
  };

  return (
    <div className="memory-game">
      <h1>Memory Game</h1>
      
      <div className="game-stats">
        <span>Time: {formatTime(timer)}</span>
        <span>Best: {bestScore ? formatTime(bestScore) : '8s'}</span>
      </div>

      <div className="cards-grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
            style={{
              visibility: card.matched ? 'hidden' : 'visible'
            }}
          >
            <div className="card-content">
              {card.flipped ? card.value : '?'}
            </div>
          </div>
        ))}
      </div>

      <button 
        id="restart" 
        className="restart-btn" 
        onClick={handleRestart}
      >
        Restart Game
      </button>

      {gameWon && (
        <div className="game-won-message">
          🎉 Congratulations! You won in {formatTime(timer)}! 🎉
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
