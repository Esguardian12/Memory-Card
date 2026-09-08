import { useState, useEffect } from 'react';
import './styles/App.css';

export default function App() {
  const [cards, setCards] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // 1. Fetch Data on Mount 
  useEffect(() => {
    const fetchCards = async () => {
      try {
        // Fetch the first 12 Pokemon
        const response = await fetch ('https://pokeapi.co/api/v2/pokemon?limit=12');
        const data = await response.json();
        
        // Map the results to a cleaner array of objects with just what we need
        const formattedCards = data.results.map((pokemon, index) => ({
          id: index + 1,
          name: pokemon.name,
          // PokeAPI stores default sprites at this URL pattern
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
      [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
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
      setScore(Score + 1);
      setClickedIds([...clickedIds, id]);
    }
    // Always shuffle after a click
    setCards(shuffleArray(cards));
  };

  return (
    <div className="app-container">
      <header>
        <h1>Memory Card Game</h1>
        {/* <Scoreboard score={score} bestScore={bestScore} /> */}
      </header>
      
      <main className="card-grid">
        {/* Map over your cards state here and pass data to <Card /> components */}
      </main>
    </div>
  );
}