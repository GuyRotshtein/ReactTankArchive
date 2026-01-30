# 🎖️ ArmorAtlas

A comprehensive React web application showcasing military tanks throughout history with **Theme Context** and **React Router** navigation.

## 📖 About This Project

ArmorAtlas is an educational web application that allows users to explore historical and modern military tanks. Users can browse through a collection of tanks, add new tanks to the encyclopedia, view detailed information including museum locations on an interactive map, and manage the database through an admin panel. The app features **light/dark theme switching** using React Context API.

---

## 🎯 Homework 2: Router & Context ✨ NEW

### **🧭 React Router Implementation**

The application uses **React Router** for client-side navigation with the following routes:

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Main tank gallery with search functionality |
| `/add-tank` | Add Tank Form | Form to add new tanks with locations |
| `/tank/:id` | Tank Details | Detailed view with API integration (weather, map) |
| `/admin` | Admin Panel | Password-protected management interface |
| `*` | 404 Not Found | Fallback for unknown routes |

**Navigation Features:**
- ✅ Navigation menu with `<Link>` components in Navbar
- ✅ URL changes when switching pages
- ✅ 404 page for invalid routes (`/blabla` shows "Page Not Found")
- ✅ Active route highlighting
- ✅ `<BrowserRouter>` wraps entire app
- ✅ Routes defined with `<Routes>` and `<Route>`

### **🎨 ThemeContext - Global State Management**

The app implements a **ThemeContext** for managing light/dark theme across all pages.

**What the Context Stores:**
```javascript
{
  theme: 'light' | 'dark',     // Current theme
  isDark: boolean,              // Helper boolean
  toggleTheme: () => void       // Function to switch themes
}
```

**How It's Used:**

**1. Navbar Component** (`src/components/Navbar.jsx`):
   - Theme toggle button (🌙 for light mode, ☀️ for dark mode)
   - Logo switches based on theme:
     - Light mode: `logo_brown.png` (brown colored)
     - Dark mode: `logo_grey.png` (grey colored)
   - Navbar gradient changes color in dark mode
   - Hamburger menu button opens sidebar navigation

**2. All Page Components:**
   - Automatic dark mode styling via `body.dark` CSS class
   - Background colors adapt
   - Text colors adjust for readability
   - Cards and UI elements change styling

**Context Provider:**
- Located in: `src/context/ThemeContext.jsx`
- Wraps entire app in `src/App.jsx`
- Accessible via `useTheme()` custom hook

**Data Persistence:**
- Theme preference saved to localStorage
- Persists across browser sessions
- Auto-applied on page load

**Usage Example:**
```javascript
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme, isDark } = useTheme();
  
  return (
    <div>
      <button onClick={toggleTheme}>
        {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      <p>Current theme: {theme}</p>
    </div>
  );
}
```

**Dark Mode Colors:**
- Navbar: Different gradient shades (customizable in CSS)
- Hero section: Darker background
- Cards: Dark gray with adjusted shadows
- Text: Light colors for contrast

---

## 📋 Homework 1: Three Required Pages

### 1️⃣ **Home / Content Page** (`/`)
**Component:** `src/pages/Home.jsx`

**Requirements Met:**
- ✅ Uses `useState` to manage tanks data and search term
- ✅ Renders tank list using `.map()`
- ✅ Passes data to child component (`TankCard`) via **props**
- ✅ Basic styling with CSS
- ✅ Search functionality to filter tanks

**Features:**
- Tank gallery with grid layout
- Live search by name or country
- Statistics display (total tanks, showing count)
- Responsive design
- Dark mode support

### 2️⃣ **Form Page** (`/add-tank`)
**Component:** `src/pages/AddTank.jsx`

**Requirements Met:**
- ✅ **6 controlled inputs** (exceeds requirement of 3)
- ✅ All inputs controlled with `useState`
- ✅ **Comprehensive validation:**
  - Name: minimum 3 characters
  - Country: must be selected
  - Year: number between 1900 and current year
  - Weight: required field
  - Crew: number between 1 and 10
  - Description: minimum 10 characters
- ✅ Validation messages displayed under each field
- ✅ Form data logged to console on submit

**Bonus Features:**
- 📍 Add multiple museum locations
- 🗺️ Live map preview when entering coordinates
- ✅ Coordinate validation (lat: -90 to 90, lng: -180 to 180)
- 📸 Optional image URLs for locations

### 3️⃣ **API Page** (`/tank/:id`)
**Component:** `src/pages/TankDetails.jsx`

**Requirements Met:**
- ✅ Uses `fetch` to call **real API** (Open-Meteo Weather API)
- ✅ Loading state with spinner
- ✅ Error state with message
- ✅ Displays locations using `.map()`
- ✅ Proper `key` prop on all list items
- ✅ Meaningful data display

**Features:**
- Full tank specifications
- Museum locations with GPS coordinates
- **Real-time weather data** for each location
- Interactive Leaflet map with markers
- Beautiful card-based layout
- Dark mode support

---

## 🎁 Bonus Features (Not Required)

### **Admin Control Panel** (`/admin`)
- 🔐 Password protected (password: `admin123`)
- ✏️ Edit any tank's details
- 🗑️ Delete tanks
- 🔄 Reset to default data
- 💾 Data persists in localStorage
- Real-time sync with Home page

---

## 🚀 Technologies Used

- **React 18** - UI framework
- **React Router DOM** - Client-side routing ✨
- **React Context API** - Global state management ✨
- **Vite** - Build tool and dev server
- **Leaflet & React-Leaflet** - Interactive maps
- **Open-Meteo API** - Real-time weather data
- **localStorage** - Data persistence
- **CSS** - Component styling with dark mode

---

## 📁 Project Structure

```
tank-encyclopedia/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation with theme toggle ✨
│   │   ├── Navbar.css          # Dark mode navbar styles
│   │   ├── TankCard.jsx        # Reusable tank card
│   │   └── TankCard.css        # Dark mode card styles
│   ├── context/
│   │   └── ThemeContext.jsx    # ✨ Theme management
│   ├── pages/
│   │   ├── Home.jsx            # Page 1: Home/Content
│   │   ├── Home.css
│   │   ├── AddTank.jsx         # Page 2: Form with locations
│   │   ├── AddTank.css
│   │   ├── TankDetails.jsx     # Page 3: API integration
│   │   ├── TankDetails.css
│   │   ├── Admin.jsx           # Bonus: Admin panel
│   │   ├── Admin.css
│   │   ├── NotFound.jsx        # ✨ 404 page
│   │   └── NotFound.css
│   ├── data/
│   │   └── tanksData.js        # Mock tank data
│   ├── App.jsx                 # Router + ThemeProvider ✨
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
│   └── images/
│       ├── logo_brown.png      # ✨ Light mode logo
│       └── logo_grey.png       # ✨ Dark mode logo
├── package.json
├── vite.config.js
└── README.md
```

---

## 💻 Installation & Running

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Extract the project** (if from zip)

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to: `http://localhost:5173`
   - The app will automatically reload on code changes

---

## 🎨 Customizing Theme Colors

To customize the dark mode colors:

**Navbar Colors** (`src/components/Navbar.css`):
```css
/* Light mode navbar */
.navbar {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

/* Dark mode navbar - customize these! */
body.dark .navbar {
  background: linear-gradient(135deg, #1a252f 0%, #2c3e50 100%);
}
```

**Hero Section** (`src/pages/Home.css`):
```css
/* Light mode hero */
.hero-section {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

/* Dark mode hero - customize these! */
body.dark .hero-section {
  background: linear-gradient(135deg, #1a252f 0%, #2c3e50 100%);
}
```

### **Changing Logos**

The project uses:
- Light mode: `logo_brown.png`
- Dark mode: `logo_grey.png`

To replace with your own logos:

1. Add your logos to `public/images/`:
   - `logo_brown.png` - for light mode
   - `logo_grey.png` - for dark mode

2. Make sure they're the same dimensions (recommended: 200x200px or larger, transparent background preferred)

3. The code in `src/components/Navbar.jsx` will automatically use them!

---

## 🎓 Assignment Requirements Checklist

### **Homework 2 Requirements:**
- ✅ React Router installed and configured
- ✅ App wrapped with `<BrowserRouter>`
- ✅ Route definitions using `<Routes>` and `<Route>`
- ✅ Navigation menu with `<Link>` components
- ✅ URL changes when switching pages
- ✅ 404 "Not Found" page for unknown routes
- ✅ Context created (`ThemeContext`)
- ✅ Provider component with useState
- ✅ Context used in 2+ pages/components (Navbar, all pages)
- ✅ Provider wraps app
- ✅ Theme persists with localStorage

### **Homework 1 Requirements:**
- ✅ Home page with useState, .map(), props, styling
- ✅ Form with 3+ inputs, controlled components, validation
- ✅ API page with fetch, loading/error states, .map()

---

## 📊 Available Data

The app includes 6 pre-loaded tanks:
- M4 Sherman (USA, 1942)
- Tiger I (Germany, 1942)
- T-34 (Soviet Union, 1940)
- Panther (Germany, 1943)
- Churchill (UK, 1941)
- M1 Abrams (USA, 1980)

Each tank includes specifications, description, and museum locations with real-time weather data.

---

## 🧪 Testing the Features

### **Test Theme Context:**
1. Click the theme toggle button (🌙/☀️) in navbar
2. Observe:
   - Logo changes (beige ↔ brown)
   - Navbar color changes
   - All page backgrounds/colors change
   - Theme persists on page refresh

### **Test Routing:**
1. Click navigation links - URL should change
2. Use browser back/forward buttons
3. Visit `/nonexistent-page` - should show 404

### **Test Admin:**
1. Go to `/admin`
2. Login with `admin123`
3. Edit/delete tanks
4. Check Home page - changes should appear

---

## 🐛 Troubleshooting

**Logos not showing?**
- Check that logo files exist in `public/images/`
- Verify file extensions match in Navbar.jsx
- Try hard refresh (Ctrl+Shift+R)

**Theme not persisting?**
- Check if localStorage is enabled in browser
- Clear browser cache and try again

**Dark mode colors not right?**
- Customize the gradients in CSS (see customization section above)
- Look for `body.dark` classes in CSS files

---

## 👨‍💻 Developer

Created for React Web Development course assignments.

**Course:** Advanced Web Development  
**Assignment:** Homework 1 & 2  
**Instructor:** Yuval Ozeri

---

Built with ❤️ using React + Vite
