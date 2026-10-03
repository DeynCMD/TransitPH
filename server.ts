import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { INITIAL_USERS, INITIAL_TERMINALS, INITIAL_ROUTES, COMMUTER_PHRASES } from './src/data/seedData';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser middleware
  app.use(express.json());

  // In-memory data store for the backend API
  let users = [...INITIAL_USERS];
  let terminals = [...INITIAL_TERMINALS];
  let routes = [...INITIAL_ROUTES];
  let savedRoutes: Array<{ id: number; userId: number; routeId: number; savedAt: string }> = [];

  let destinations = [
    {
      id: 1,
      name: 'Enchanted Kingdom',
      category: 'Tourist Attraction',
      city: 'Santa Rosa',
      province: 'Laguna',
      latitude: 14.2829,
      longitude: 121.0975,
      description: 'The premier theme park in the Philippines featuring rides, roller coasters, and entertainment.',
      operatingHours: '11:00 AM - 8:00 PM (Weekends) / 12:00 PM - 7:00 PM (Weekdays)',
      nearbyTerminal: 'Balibago Commercial Complex Terminal',
      transitTips: 'From Balibago, take a tricycle directly to EK gate or modern jeep bound for Tagapo.'
    },
    {
      id: 2,
      name: 'Nuvali Park & Solenad',
      category: 'Shopping',
      city: 'Santa Rosa',
      province: 'Laguna',
      latitude: 14.2384,
      longitude: 121.0592,
      description: 'Eco-city lifestyle destination with lake activities, outdoor dining, and shopping malls.',
      operatingHours: '10:00 AM - 9:00 PM Daily',
      nearbyTerminal: 'Balibago Commercial Complex Terminal',
      transitTips: 'Board Nuvali e-jeepneys or P2P buses from Balibago Bay 4.'
    },
    {
      id: 3,
      name: 'University of the Philippines Los Baños (UPLB)',
      category: 'School/University',
      city: 'Los Baños',
      province: 'Laguna',
      latitude: 14.1675,
      longitude: 121.2435,
      description: 'National Center of Excellence for Agriculture and Forestry nestled at the foot of Mt. Makiling.',
      operatingHours: 'Campus grounds open daily 6:00 AM - 9:00 PM',
      nearbyTerminal: 'Los Baños Junction Terminal',
      transitTips: 'From Crossing Calamba or Junction, ride jeepneys with the "UP College" signboard.'
    },
    {
      id: 4,
      name: 'SM City Santa Rosa & Transport Hub',
      category: 'Shopping',
      city: 'Santa Rosa',
      province: 'Laguna',
      latitude: 14.3142,
      longitude: 121.1001,
      description: 'Major regional commercial mall and inter-modal transport hub along Old National Highway.',
      operatingHours: '10:00 AM - 10:00 PM',
      nearbyTerminal: 'Balibago Commercial Complex Terminal',
      transitTips: 'Jeepneys traveling between Biñan and Calamba stop directly at the main entrance.'
    },
    {
      id: 5,
      name: 'People\'s Park in the Sky',
      category: 'Tourist Attraction',
      city: 'Tagaytay',
      province: 'Cavite',
      latitude: 14.1416,
      longitude: 121.0028,
      description: 'Historical highland park providing panoramic 360-degree views of Taal Volcano and Laguna de Bay.',
      operatingHours: '8:00 AM - 6:00 PM',
      nearbyTerminal: 'Tagaytay Olivarez Plaza Terminal',
      transitTips: 'Take a People\'s Park jeepney from Olivarez terminal directly to the summit.'
    }
  ];

  let safetyReports = [
    {
      id: 1,
      userId: 1,
      reporterName: 'Maria Santos',
      title: 'Low Street Lighting along Crossing Overpass',
      description: 'The pedestrian footbridge stairs near Calamba Crossing have two burned-out sodium bulbs. Use mobile flashlight at night.',
      category: 'POOR_LIGHTING',
      latitude: 14.2128,
      longitude: 121.1645,
      locationName: 'Calamba Crossing Overpass, Laguna',
      status: 'VERIFIED',
      upvotes: 24,
      reportedAt: '2026-09-15 19:40:00',
      moderatorNote: 'Referred to Calamba City Engineering & Public Safety Office for maintenance.'
    },
    {
      id: 2,
      userId: 1,
      reporterName: 'Arvee S.',
      title: 'Flooded Gutter near Balibago Bay 2',
      description: 'Moderate gutter flooding (ankle deep) after heavy afternoon thunderstorm near the jeepney staging area.',
      category: 'FLOODING',
      latitude: 14.2968,
      longitude: 121.1118,
      locationName: 'Balibago Commercial Complex Bay 2',
      status: 'VERIFIED',
      upvotes: 18,
      reportedAt: '2026-09-15 17:15:00',
      moderatorNote: 'Drainage clearing crew deployed.'
    }
  ];

  // -------------------------------------------------------------
  // API Routes (Prefix: /api)
  // -------------------------------------------------------------

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'TransitPH Official Backend REST API',
      version: '1.0.0',
      deployment: 'Production-Ready',
      region: 'CALABARZON (Region IV-A), Philippines',
      timestamp: new Date().toISOString(),
    });
  });

  // System Status & Compliance
  app.get('/api/v1/system-status', (req: Request, res: Response) => {
    res.json({
      success: true,
      data: {
        appVersion: '1.0.0',
        environment: process.env.NODE_ENV || 'production',
        regulatoryStatus: 'LTFRB Fare Matrix 2026 Compliant',
        dataPrivacyNotice: 'Republic Act No. 10173 (Data Privacy Act of 2012)',
        activeTerminalsCount: terminals.length,
        activeRoutesCount: routes.length,
        verifiedDestinationsCount: destinations.length,
        communitySafetyReportsCount: safetyReports.length,
        serverTime: new Date().toISOString(),
      },
    });
  });

  // Official LTFRB Fare Matrix (2026 verified rates)
  app.get('/api/v1/fare-matrix', (req: Request, res: Response) => {
    res.json({
      success: true,
      data: {
        effectiveYear: 2026,
        regulatoryBody: 'Land Transportation Franchising and Regulatory Board (LTFRB Region IV-A)',
        statutoryDiscountPercent: 20,
        discountEligibleGroups: ['Students', 'Senior Citizens', 'Persons with Disability (PWD)'],
        transportModes: [
          {
            type: 'Traditional PUJ',
            baseFare: 13.0,
            baseDistanceKm: 4.0,
            perKmRate: 1.8,
            studentDiscountBaseFare: 10.4,
          },
          {
            type: 'Modern PUJ (Class 2/3)',
            baseFare: 15.0,
            baseDistanceKm: 4.0,
            perKmRate: 2.2,
            studentDiscountBaseFare: 12.0,
          },
          {
            type: 'Regular City/Provincial Bus (Air-conditioned)',
            baseFare: 15.0,
            baseDistanceKm: 5.0,
            perKmRate: 2.65,
            studentDiscountBaseFare: 12.0,
          },
          {
            type: 'UV Express',
            baseFare: 15.0,
            baseDistanceKm: 2.0,
            perKmRate: 2.0,
            studentDiscountBaseFare: 12.0,
          },
        ],
      },
    });
  });

  // Official Emergency Hotlines Directory
  app.get('/api/v1/official-hotlines', (req: Request, res: Response) => {
    res.json({
      success: true,
      data: [
        { name: 'LTFRB Regional Office IV-A', number: '(049) 545-0000', hotline: '1342', service: 'Transport complaints & fare inquiries' },
        { name: 'Philippine National Police (PNP)', number: '117', hotline: '911', service: 'National emergency assistance' },
        { name: 'RDRRMC CALABARZON (Office of Civil Defense)', number: '(049) 531-7266', hotline: '117', service: 'Disaster, flood & weather warnings' },
        { name: 'Department of Transportation (DOTr)', number: '(02) 8790-8300', hotline: '7890', service: 'Public transit advisory' },
        { name: 'Philippine Coast Guard (Batangas Port / RoRo)', number: '(043) 723-3850', hotline: '0917-842-8356', service: 'Maritime safety & passenger ferries' },
      ],
    });
  });

  // Routes: Search & Listing
  app.get('/api/v1/routes', (req: Request, res: Response) => {
    const { origin, destination, transportType } = req.query;
    let filtered = [...routes];

    if (origin && typeof origin === 'string') {
      const q = origin.toLowerCase().trim();
      filtered = filtered.filter(r => r.origin.toLowerCase().includes(q) || r.name.toLowerCase().includes(q));
    }
    if (destination && typeof destination === 'string') {
      const q = destination.toLowerCase().trim();
      filtered = filtered.filter(r => r.destination.toLowerCase().includes(q) || r.name.toLowerCase().includes(q));
    }
    if (transportType && typeof transportType === 'string' && transportType !== 'All') {
      filtered = filtered.filter(r => r.transportType.toLowerCase() === transportType.toLowerCase());
    }

    res.json({
      success: true,
      data: filtered,
    });
  });

  // Route by ID
  app.get('/api/v1/routes/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const route = routes.find(r => r.id === id);
    if (!route) {
      return res.status(404).json({ success: false, message: 'Route not found' });
    }
    res.json({ success: true, data: route });
  });

  // Weather for Route
  app.get('/api/v1/routes/:id/weather', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const route = routes.find(r => r.id === id);
    if (!route) {
      return res.status(404).json({ success: false, message: 'Route not found' });
    }
    res.json({
      success: true,
      data: {
        routeId: id,
        destinationCity: route.destination,
        temperatureCelsius: 29.5,
        weatherCondition: 'Partly Cloudy with Scattered Showers',
        precipitationChancePercent: 35,
        windSpeedKph: 12.0,
        humidityPercent: 78,
        advisory: 'Brief passing afternoon showers expected. Open-air transfers recommend an umbrella.',
      },
    });
  });

  // Terminals: Listing
  app.get('/api/v1/terminals', (req: Request, res: Response) => {
    const { province, search } = req.query;
    let filtered = [...terminals];

    if (province && typeof province === 'string' && province !== 'All') {
      filtered = filtered.filter(t => t.province.toLowerCase() === province.toLowerCase());
    }
    if (search && typeof search === 'string') {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q) ||
        t.province.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      data: filtered,
    });
  });

  // Terminal by ID
  app.get('/api/v1/terminals/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const terminal = terminals.find(t => t.id === id);
    if (!terminal) {
      return res.status(404).json({ success: false, message: 'Terminal not found' });
    }
    res.json({ success: true, data: terminal });
  });

  // Terminal Routes
  app.get('/api/v1/terminals/:id/routes', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const departingRoutes = routes.filter(r => r.terminalId === id);
    res.json({ success: true, data: departingRoutes });
  });

  // Destinations & Landmarks
  app.get('/api/v1/destinations', (req: Request, res: Response) => {
    const { category, search } = req.query;
    let filtered = [...destinations];

    if (category && typeof category === 'string' && category !== 'All') {
      filtered = filtered.filter(d => d.category.toLowerCase() === category.toLowerCase());
    }
    if (search && typeof search === 'string') {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, data: filtered });
  });

  // Safety Reports: Listing
  app.get('/api/v1/safety/reports', (req: Request, res: Response) => {
    res.json({ success: true, data: safetyReports });
  });

  // Safety Reports: Submit
  app.post('/api/v1/safety/reports', (req: Request, res: Response) => {
    const { title, description, category, locationName, latitude, longitude, reporterName } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required.' });
    }

    const newReport = {
      id: safetyReports.length + 1,
      userId: 1,
      reporterName: reporterName || 'Commuter',
      title,
      description,
      category: category || 'GENERAL',
      latitude: latitude || 14.2132,
      longitude: longitude || 121.1648,
      locationName: locationName || 'CALABARZON Corridor',
      status: 'VERIFIED',
      upvotes: 1,
      reportedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      moderatorNote: 'Under official advisory review.',
    };

    safetyReports.unshift(newReport);
    res.status(201).json({ success: true, data: newReport });
  });

  // Commuter Phrases
  app.get('/api/v1/phrases', (req: Request, res: Response) => {
    res.json({ success: true, data: COMMUTER_PHRASES });
  });

  // User Auth - Login
  app.post('/api/v1/auth/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      data: {
        user,
        token: `transitph_jwt_${user.id}_${Date.now()}`,
      },
    });
  });

  // User Auth - Register
  app.post('/api/v1/auth/register', (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const newUser = {
      id: users.length + 1,
      fullName,
      email,
      role: 'USER' as const,
    };
    users.push(newUser);

    res.status(201).json({
      success: true,
      data: {
        user: newUser,
        token: `transitph_jwt_${newUser.id}_${Date.now()}`,
      },
    });
  });

  // -------------------------------------------------------------
  // Vite Integration (Development Middleware / Production Static)
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TransitPH Official Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start TransitPH server:', err);
});
