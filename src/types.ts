export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  passwordHash?: string;
}

export interface Terminal {
  id: string;
  name: string;
  city: string;
  province: string;
  latitude: number;
  longitude: number;
  description: string;
}

export type TransportType = 'Jeepney' | 'Bus' | 'UV Express' | 'Modern Jeepney';

export interface RouteStop {
  id: string;
  name: string;
  sequence: number;
}

export interface TimelineStep {
  stepNumber: number;
  icon: string;
  titleEn: string;
  titleFil: string;
  instructionEn: string;
  instructionFil: string;
  meta: string;
}

export interface Route {
  id: string;
  terminalId: string;
  name: string;
  origin: string;
  destination: string;
  transportType: TransportType;
  fare: number;
  estimatedTravelTime: number; // in minutes
  description: string;
  transfers?: number;
  walkingDistanceMeters?: number;
  stops?: string[];
  timeline?: TimelineStep[];
}

export interface SavedRoute {
  id: string;
  userId: string;
  routeId: string;
  route: Route;
  savedAt: string;
}

export type PhraseCategory = 'Directions' | 'Transportation' | 'Fare' | 'Getting Off' | 'Courtesy';

export interface CommuterPhrase {
  id: string;
  category: PhraseCategory;
  english: string;
  filipino: string;
  bikol: string;
  context: string;
}
