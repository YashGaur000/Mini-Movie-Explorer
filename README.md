# 🎬 Mini Movie Explorer

A modern, responsive React TypeScript application for discovering movies and managing your personal watchlist. Built with Vite, Tailwind CSS, and the OMDb API.

## ✨ Features

### 🎯 Core Functionality
- **Movie Search**: Real-time search with debounced API calls
- **Watchlist Management**: Add/remove movies to your personal watchlist
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### 🆕 New Features
- **Movie Details Drawer**: Click any movie to view comprehensive details
  - Full plot summary and ratings
  - Cast and crew information
  - Runtime, release date, and genre
  - IMDb rating with vote count
  - Additional ratings from other sources
- **Watchlist Reordering**: Organize your watchlist with drag-and-drop style controls
  - Up/down arrow buttons for reordering
  - Hover controls for easy access
  - Persistent ordering saved to localStorage

### 🎨 User Experience
- **Smooth Animations**: Hover effects and transitions throughout
- **Loading States**: Spinners and skeleton loaders
- **Error Handling**: Graceful error messages with retry options
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Debounced search and optimized re-renders

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OMDb API key (free at [omdbapi.com](https://www.omdbapi.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-movie-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_OMDB_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: OMDb (Open Movie Database)
- **State Management**: React Hooks
- **Local Storage**: Custom utilities for persistence

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MovieCard.tsx           # Individual movie display
│   ├── MovieDetailsDrawer.tsx  # Movie details side panel
│   ├── WatchlistPanel.tsx      # Watchlist management
│   ├── SearchInput.tsx         # Search functionality
│   ├── LoadingSpinner.tsx      # Loading indicators
│   ├── ErrorMessage.tsx        # Error display
│   └── ThemeToggle.tsx         # Dark mode toggle
├── hooks/              # Custom React hooks
│   ├── useDebounce.ts          # Search debouncing
│   ├── useWatchlist.ts         # Watchlist state management
│   ├── useTheme.ts             # Theme management
│   └── useMovieDetails.ts      # Movie details fetching
├── utils/              # Utility functions
│   ├── api.ts                 # API integration
│   └── localStorage.ts        # Local storage helpers
├── types/              # TypeScript type definitions
│   └── movie.ts              # Movie-related types
├── styles/             # Global styles
│   └── globals.css           # Base styles and utilities
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🎮 How to Use

### Searching Movies
1. Type in the search bar to find movies
2. Results appear automatically after 500ms delay
3. Click "Add to Watchlist" to save movies

### Viewing Movie Details
1. **Click any movie card** to open the details drawer
2. View comprehensive information including:
   - Plot summary
   - IMDb rating and votes
   - Cast and crew
   - Release date and runtime
   - Additional ratings

### Managing Watchlist
1. **Add movies**: Click "Add to Watchlist" on any movie card
2. **Remove movies**: Click the trash icon on watchlist items
3. **Reorder movies**: Use up/down arrows that appear on hover
4. **View details**: Click any watchlist item to see full details

### Theme Toggle
- Click the theme toggle button to switch between light and dark modes
- Your preference is automatically saved

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Environment Variables
- `VITE_OMDB_API_KEY`: Your OMDb API key (required)

### API Integration
The app uses the OMDb API for movie data:
- **Search endpoint**: `/api/?s={query}&type=movie`
- **Details endpoint**: `/api/?i={imdbId}&plot=full`

## 🎨 Design Features

### Responsive Layout
- **Mobile**: Single column layout with full-width components
- **Tablet**: Two-column grid with optimized spacing
- **Desktop**: Three-column layout with sidebar watchlist

### Dark Mode
- **Automatic detection** of system preference
- **Manual toggle** with persistent storage
- **Consistent theming** across all components

### Accessibility
- **Keyboard navigation** support
- **Screen reader** friendly
- **High contrast** ratios
- **Focus indicators** for interactive elements

## 🚀 Performance Optimizations

- **Debounced search** to reduce API calls
- **Lazy loading** of movie details
- **Optimized re-renders** with React hooks
- **Efficient state management** with custom hooks
- **Minimal bundle size** with Vite

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OMDb API](https://www.omdbapi.com/) for movie data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons
- [Vite](https://vitejs.dev/) for build tooling

---

**Happy movie exploring! 🎬✨**