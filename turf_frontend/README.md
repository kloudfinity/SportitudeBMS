# Turf Booking System - Frontend

A modern React-based frontend application for the Turf Booking Management System.

## Features

### User Features
- 🏠 Browse and search turfs by city
- 🔍 View detailed turf information
- 📅 Real-time slot availability
- 💳 Quick and easy booking process
- 📱 User dashboard to manage bookings
- 🔐 Secure authentication

### Admin Features
- 🏙️ City management
- ⚽ Turf management
- 🏟️ Venue management
- ⏰ Slot management
- 📊 Booking management and monitoring

## Tech Stack

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool and dev server
- **CSS3** - Styling with custom CSS
- **date-fns** - Date formatting

## Project Structure

```
turf_frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── TurfCard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── AdminRoute.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── TurfList.jsx
│   │   ├── TurfDetails.jsx
│   │   ├── MyBookings.jsx
│   │   └── admin/          # Admin pages
│   │       ├── AdminLogin.jsx
│   │       ├── AdminDashboard.jsx
│   │       ├── CityManagement.jsx
│   │       ├── TurfManagement.jsx
│   │       ├── VenueManagement.jsx
│   │       ├── SlotManagement.jsx
│   │       └── BookingManagement.jsx
│   ├── context/            # React context
│   │   └── AuthContext.jsx
│   ├── services/           # API services
│   │   ├── api.js
│   │   └── apiService.js
│   ├── styles/             # CSS files
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 5000

### Installation

1. Navigate to the frontend directory:
```bash
cd turf_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional):
```bash
# Create .env file in root
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## API Configuration

The frontend communicates with the backend API. By default, it uses:
- Development: `http://localhost:5000/api`
- Can be configured via `VITE_API_URL` environment variable

## Authentication

The app uses JWT token-based authentication:
- Tokens are stored in localStorage
- Automatic token injection in API requests
- Auto-redirect on 401 errors
- Separate auth flows for users and admins

## Routes

### Public Routes
- `/` - Home page
- `/login` - User login
- `/register` - User registration
- `/turfs` - Browse turfs
- `/turfs/:id` - Turf details

### Protected User Routes
- `/my-bookings` - User's booking history

### Admin Routes
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/admin/cities` - City management
- `/admin/turfs` - Turf management
- `/admin/venues` - Venue management
- `/admin/slots` - Slot management
- `/admin/bookings` - Booking management

## Features in Detail

### User Booking Flow
1. Browse turfs by city or search
2. View turf details and available venues
3. Select date and venue
4. Choose available time slot
5. Confirm booking
6. View booking in dashboard

### Admin Management
- Full CRUD operations for all entities
- Real-time booking status updates
- Responsive data tables
- Modal-based forms for editing

## Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- Uses Vite for fast HMR (Hot Module Replacement)
- Proxy configured for API requests in development
- CSS custom properties for theming
- Modular component architecture

## Troubleshooting

### Port already in use
If port 3000 is busy, Vite will automatically use the next available port.

### API Connection Issues
Ensure the backend server is running on port 5000, or update the proxy configuration in `vite.config.js`.

### Build Errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is proprietary and confidential.
