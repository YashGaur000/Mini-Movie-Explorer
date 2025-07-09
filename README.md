# 🎬 Mini Movie Explorer

A modern, responsive React TypeScript application for discovering movies and managing your personal watchlist. Built with Vite, Tailwind CSS, and the OMDb API.

## 🌐 Live Demo

**[🚀 Try it now!](https://mini-movie-explorer-one.vercel.app/)** - Experience the app live on Vercel

---

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

### Environment Variables
- `VITE_OMDB_API_KEY`: Your OMDb API key (required)

**Happy movie exploring! 🎬✨**
