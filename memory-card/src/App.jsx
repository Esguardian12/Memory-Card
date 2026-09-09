import { useState, useEffect } from 'react';
import Scoreboard from './components/Scoreboard';
import Card from './components/Card';
import './App.css';

export default function App() {
  const [cards, setCards] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // 1. Fetch Data on Mount
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
        const data = await response.json();
        
        const formattedCards = data.results.map((pokemon, index) => ({
          id: index + 1,
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        }));

        setCards(shuffleArray(formattedCards));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCards();
  }, []);

  // 2. Shuffle Function (Fisher-Yates Algorithm)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 3. Click Handler Logic
  const handleCardClick = (id) => {
    if (clickedIds.includes(id)) {
      // Game Over state
      if (score > bestScore) setBestScore(score);
      setScore(0);
      setClickedIds([]);
    } else {
      // Continue game state
      setScore(score + 1);
      setClickedIds([...clickedIds, id]);
    }
    // Always shuffle after a click
    setCards(shuffleArray(cards));
  };

  return (
    <div className="app-container">
      <header>
        <h1>Pokemon Memory Game</h1>
        <Scoreboard score={score} bestScore={bestScore} />
      </header>
      
      <main className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            name={card.name}
            image={card.image}
            handleClick={handleCardClick}
          />
        ))}
      </main>
    </div>
  );
}