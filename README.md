# Memory Game

A fun and interactive 4x4 memory card game built with React.

## Game Features

- 🎮 4x4 grid with 16 cards (8 pairs)
- ⏱️ Timer to track your completion time
- 🏆 Best score tracking (saved locally)
- 🎯 Match pairs to clear the board
- 🔄 Restart game functionality
- 📱 Responsive design for all devices

## How to Play

1. Click any card to reveal its number
2. Click a second card to reveal its number
3. If both cards match, they disappear
4. If they don't match, they flip back over
5. Continue until all pairs are matched
6. Try to beat your best time!

## Demo

🎮 **Play Online:** [Live Demo on Render](https://your-app-name.onrender.com)

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development
```bash
# Clone the repository
git clone https://github.com/SaiVidyaSri/Memory-Game.git

# Navigate to project directory
cd Memory-Game

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## Technologies Used

- **React** - Frontend framework
- **CSS3** - Styling and animations
- **Local Storage** - Best score persistence
- **React Hooks** - State management

## Game Rules

- Only 2 cards can be flipped at once
- Cards automatically flip back if they don't match
- Matched pairs are removed from the board
- Game ends when all pairs are found
- Timer tracks completion time

## Project Structure

```
src/
├── components/
│   ├── MemoryGame.js      # Main game component
│   └── MemoryGame.css     # Game styling
├── App.js                 # Root component
├── App.css               # App styling
├── index.js              # App entry point
└── index.css             # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

**SaiVidyaSri**
- GitHub: [@SaiVidyaSri](https://github.com/SaiVidyaSri)

---

🎮 **Enjoy playing the Memory Game!** 🧠
