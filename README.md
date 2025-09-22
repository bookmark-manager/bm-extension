# 🔖 Bookmark Manager Browser Extension

A lightweight browser extension for Chrome and Firefox that seamlessly integrates with the Bookmark Manager API, allowing you to save and manage bookmarks directly from your browser.

## ✨ Features

- **One-Click Bookmarking** - Save current page with a single click
- **Smart Detection** - Visual indicators when a page is already bookmarked
- **Dynamic Icons** - Extension icon changes based on bookmark status
- **Auto-Fill Forms** - Automatically fills title and URL from current tab
- **Duplicate Prevention** - Prevents saving duplicate bookmarks
- **Cross-Browser Support** - Works on both Chrome and Firefox
- **Real-time Sync** - Instant updates with the backend API
- **Minimal UI** - Clean, unobtrusive popup interface

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **State Management**: TanStack Query (React Query)
- **Form Handling**: Mantine Form
- **Browser APIs**: Chrome Extension API / WebExtensions
- **Styling**: CSS Modules

## 🚀 Installation

### Prerequisites

- Node.js 18+ and pnpm
- Running Bookmark Manager API backend
- Chrome or Firefox browser

### Development Setup

1. **Clone and install dependencies**

   ```bash
   git clone <repository-url>
   cd bookmark-manager-extension
   pnpm install
   ```

2. **Configure environment**

   ```bash
   # Create .env file
   echo "VITE_BASE_URL=http://localhost:8080/api/v1" > .env
   ```

3. **Build for your browser**

   ```bash
   # For Chrome
   pnpm run build:chrome

   # For Firefox
   pnpm run build:firefox
   ```

4. **Load extension in browser**

   **Chrome:**

   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

   **Firefox:**

   - Open `about:debugging`
   - Click "This Firefox"
   - Click "Load Temporary Add-on"
   - Select `manifest.json` from `dist` folder

### Production Build

```bash
# Build for Chrome
pnpm run build:chrome

# Build for Firefox
pnpm run build:firefox

# Development build with hot reload
pnpm run dev
```

## 📋 Available Scripts

| Command         | Description                 |
| --------------- | --------------------------- |
| `dev`           | Start development server    |
| `build`         | Build extension (generic)   |
| `build:chrome`  | Build with Chrome manifest  |
| `build:firefox` | Build with Firefox manifest |
| `lint`          | Run ESLint                  |
| `preview`       | Preview production build    |

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
# Backend API base URL
VITE_BASE_URL=http://localhost:8080/api/v1
```

### API Integration

The extension connects to these backend endpoints:

- `POST /api/v1/bookmarks` - Create bookmark
- `GET /api/v1/bookmarks/exists` - Check if bookmark exists
- `DELETE /api/v1/bookmarks/:id` - Remove bookmark

## 🎯 How It Works

### Core Functionality

1. **Icon States**: Extension icon changes color based on bookmark status

   - **Inactive** (gray): Current page not bookmarked
   - **Active** (colored): Current page is bookmarked

2. **Background Script**: Monitors tab changes and updates icon state automatically

3. **Popup Interface**:
   - Shows bookmark form for new pages
   - Shows removal option for existing bookmarks
   - Auto-fills title and URL from current tab

### User Flow

1. User navigates to a webpage
2. Extension checks if page is already bookmarked
3. Icon updates to reflect bookmark status
4. User clicks extension icon to open popup
5. If not bookmarked: Shows form to add bookmark
6. If bookmarked: Shows option to remove bookmark

## 📦 Distribution

### Chrome Web Store

1. Build with `pnpm run build:chrome`
2. Zip the `dist` folder
3. Upload to Chrome Web Store Developer Dashboard

### Firefox Add-ons

1. Build with `pnpm run build:firefox`
2. Zip the `dist` folder
3. Submit to Firefox Add-on Developer Hub
