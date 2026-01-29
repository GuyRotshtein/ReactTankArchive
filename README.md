# 🛡️ Tank Encyclopedia

A comprehensive React web application showcasing military tanks throughout history.

## 📖 About This Project

Tank Encyclopedia is an educational web application that allows users to explore historical and modern military tanks. Users can browse through a collection of tanks, add new tanks to the encyclopedia, and view detailed information including museum locations on an interactive map.

## 🎯 Three Required Pages

### 1️⃣ **Home / Content Page** (`/`)
- **Component:** `src/pages/Home.jsx`
- **Features:**
  - ✅ Uses `useState` to manage tanks data and search functionality
  - ✅ Renders list of tanks using `.map()`
  - ✅ Passes data to child component (`TankCard`) via **props**
  - ✅ Includes search functionality to filter tanks
  - ✅ Basic styling with CSS

### 2️⃣ **Form Page** (`/add-tank`)
- **Component:** `src/pages/AddTank.jsx`
- **Features:**
  - ✅ **6 controlled inputs** (name, country, year, weight, crew, description)
  - ✅ All inputs are controlled components using `useState`
  - ✅ **Comprehensive validation:**
    - Name must be at least 3 characters
    - Country must be selected
    - Year must be a number between 1900 and current year
    - Weight is required
    - Crew must be a number between 1 and 10
    - Description must be at least 10 characters
  - ✅ Validation messages displayed to user
  - ✅ Form data logged to console on submit

### 3️⃣ **API Page** (`/tank/:id`)
- **Component:** `src/pages/TankDetails.jsx`
- **Features:**
  - ✅ Uses `fetch` to call **real API** (Open-Meteo Weather API)
  - ✅ Shows **loading state** with spinner
  - ✅ Shows **error state** with error message
  - ✅ Displays data using `.map()` for locations
  - ✅ Each list item has proper **key** prop
  - ✅ Shows meaningful data: tank specs, locations with weather, interactive map
  - ✅ **Bonus:** Interactive Leaflet map showing museum locations

## 🚀 Technologies Used

- **React 18** - UI framework
- **React Router DOM** - Page navigation
- **Vite** - Build tool and dev server
- **Leaflet & React-Leaflet** - Interactive maps
- **Open-Meteo API** - Real-time weather data for tank locations
- **CSS Modules** - Component styling

## 📁 Project Structure

```
tank-encyclopedia/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation component
│   │   ├── Navbar.css
│   │   ├── TankCard.jsx        # Reusable tank card component (receives props)
│   │   └── TankCard.css
│   ├── pages/
│   │   ├── Home.jsx            # Page 1: Home/Content page
│   │   ├── Home.css
│   │   ├── AddTank.jsx         # Page 2: Form page
│   │   ├── AddTank.css
│   │   ├── TankDetails.jsx     # Page 3: API page
│   │   └── TankDetails.css
│   ├── data/
│   │   └── tanksData.js        # Mock tank data
│   ├── App.jsx                 # Main app with routing
│   ├── App.css
│   └── main.jsx
├── package.json
└── README.md
```

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
   - The app will automatically open at `http://localhost:5173`
   - Or manually navigate to the URL shown in the terminal

## 🎨 Features Implemented

### React Concepts Demonstrated

- **useState Hook**: Managing component state (tank data, form inputs, loading states)
- **useEffect Hook**: Fetching data and side effects
- **Props**: Passing data from parent to child components
- **Controlled Components**: All form inputs are controlled by React state
- **Conditional Rendering**: Loading states, error states, success messages
- **List Rendering**: Using `.map()` with proper keys
- **React Router**: Client-side routing between pages
- **Component Composition**: Breaking UI into reusable components

### Best Practices

- ✅ Proper component structure and file organization
- ✅ Controlled form inputs with validation
- ✅ Error handling for API calls
- ✅ Loading states for better UX
- ✅ Responsive design
- ✅ Clean, semantic HTML
- ✅ Reusable components
- ✅ Proper key props for mapped elements

## 📊 Available Data

The app includes 6 pre-loaded tanks with the following information:
- M4 Sherman (USA, 1942)
- Tiger I (Germany, 1942)
- T-34 (Soviet Union, 1940)
- Panther (Germany, 1943)
- Churchill (UK, 1941)
- M1 Abrams (USA, 1980)

Each tank includes:
- Specifications (country, year, weight, crew)
- Historical description
- Museum locations with coordinates
- Real-time weather data for each location

## 🌐 API Integration

The app integrates with **Open-Meteo API** to fetch real-time weather data for each tank's museum locations. This demonstrates:
- Asynchronous data fetching with `fetch`
- Promise handling
- Error handling
- Loading states
- API response processing

## 🎓 Assignment Requirements Met

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Home/Content Page with useState | ✅ | `Home.jsx` - manages tanks and search state |
| Render list using .map() | ✅ | `Home.jsx` - maps over filtered tanks |
| Use props | ✅ | `TankCard` receives tank data as props |
| Basic styling | ✅ | CSS files for all components |
| Form with 3+ inputs | ✅ | `AddTank.jsx` - 6 controlled inputs |
| Controlled components | ✅ | All inputs use useState |
| Simple validation | ✅ | Multiple validation rules implemented |
| Show validation messages | ✅ | Error messages displayed below inputs |
| Console.log on submit | ✅ | Form data logged to console |
| API call with fetch | ✅ | `TankDetails.jsx` - Open-Meteo API |
| Loading state | ✅ | Spinner shown while loading |
| Error state | ✅ | Error message with retry option |
| Display with .map() | ✅ | Locations and weather data |
| Proper keys | ✅ | Unique keys for all mapped items |

## 📝 Notes

- The application uses mock data for tank information stored in `src/data/tanksData.js`
- The "Add Tank" form currently only logs to console (as per assignment requirements)
- Real API integration is demonstrated via weather data fetching
- The map uses OpenStreetMap tiles (free, no API key needed)

## 👨‍💻 Developer

Created for React Web Development course assignment.

**Course:** Advanced Web Development
**Assignment:** Homework 1 - Build 3 Pages from Your Site
**Instructor:** Yuval Ozeri

---

Built with ❤️ using React + Vite
