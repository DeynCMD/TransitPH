var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");

// src/data/seedData.ts
var INITIAL_USERS = [
  {
    id: 1,
    fullName: "Maria Santos",
    email: "user@transitph.test",
    role: "USER"
  },
  {
    id: 2,
    fullName: "TransitPH Administrator",
    email: "admin@transitph.test",
    role: "ADMIN"
  }
];
var INITIAL_TERMINALS = [
  {
    id: 1,
    name: "Calamba Central Jeepney Terminal",
    city: "Calamba",
    province: "Laguna",
    latitude: 14.2132,
    longitude: 121.1648,
    description: "Central terminal near SM City Calamba and Crossing, connecting southern Laguna to Santa Rosa and Batangas."
  },
  {
    id: 2,
    name: "Balibago Commercial Complex Terminal",
    city: "Santa Rosa",
    province: "Laguna",
    latitude: 14.2965,
    longitude: 121.1114,
    description: "Primary transit hub connecting Santa Rosa to Metro Manila (Buendia/Ayala), Tagaytay, and neighboring Laguna municipalities."
  },
  {
    id: 3,
    name: "Pacita Central Terminal",
    city: "San Pedro",
    province: "Laguna",
    latitude: 14.3492,
    longitude: 121.0543,
    description: "Major southern gateway terminal serving San Pedro, Bi\xF1an, and Muntinlupa Alabang commuters."
  },
  {
    id: 4,
    name: "Bi\xF1an Central Jeepney Terminal",
    city: "Bi\xF1an",
    province: "Laguna",
    latitude: 14.3382,
    longitude: 121.0825,
    description: "Located near Bi\xF1an People's Center and public market district with routes connecting to Carmona, Cavite."
  },
  {
    id: 5,
    name: "Los Ba\xF1os Junction Terminal",
    city: "Los Ba\xF1os",
    province: "Laguna",
    latitude: 14.1706,
    longitude: 121.2428,
    description: "Gateway terminal servicing UPLB university campus, IRRI, and hot spring resorts along Pansol."
  },
  {
    id: 6,
    name: "San Pablo City Public Terminal",
    city: "San Pablo",
    province: "Laguna",
    latitude: 14.0683,
    longitude: 121.3256,
    description: "Central inter-provincial hub for the City of Seven Lakes, connecting Laguna, Batangas, and Quezon."
  },
  {
    id: 7,
    name: "Dasmari\xF1as Central Terminal (Pala-Pala)",
    city: "Dasmari\xF1as",
    province: "Cavite",
    latitude: 14.2981,
    longitude: 120.9575,
    description: "Major Cavite crossroad intersection terminal near SM Dasmari\xF1as and Robinsons Place Pala-Pala."
  },
  {
    id: 8,
    name: "Bacoor St. Dominic Terminal",
    city: "Bacoor",
    province: "Cavite",
    latitude: 14.4442,
    longitude: 120.9702,
    description: "North Cavite coastal transit hub facilitating rapid transfers to PITX and Metro Manila via Cavitex."
  },
  {
    id: 9,
    name: "Imus Transport Terminal (Lumang Bayan)",
    city: "Imus",
    province: "Cavite",
    latitude: 14.4295,
    longitude: 120.9367,
    description: "Central district hub along Aguinaldo Highway connecting northern Cavite to southern highlands."
  },
  {
    id: 10,
    name: "Tagaytay Olivarez Plaza Terminal",
    city: "Tagaytay",
    province: "Cavite",
    latitude: 14.1153,
    longitude: 120.9621,
    description: "Tourist and commuter highland hub along Tagaytay-Calamba Road and Emilio Aguinaldo Highway."
  },
  {
    id: 11,
    name: "Batangas City Grand Terminal",
    city: "Batangas City",
    province: "Batangas",
    latitude: 13.7844,
    longitude: 121.0664,
    description: "Provincial multimodal integrated terminal with direct express connections to Batangas Port and RoRo ferries."
  },
  {
    id: 12,
    name: "Lipa SM City Grand Terminal",
    city: "Lipa City",
    province: "Batangas",
    latitude: 13.9419,
    longitude: 121.1631,
    description: "Major eastern Batangas hub serving express routes to Metro Manila, Calamba, and Lucena."
  },
  {
    id: 13,
    name: "Tanauan City Transport Terminal",
    city: "Tanauan",
    province: "Batangas",
    latitude: 14.0858,
    longitude: 121.1506,
    description: "Northern Batangas junction servicing industrial park workers and commuters traveling between Batangas and Laguna."
  },
  {
    id: 14,
    name: "Antipolo Masinag Transit Terminal",
    city: "Antipolo",
    province: "Rizal",
    latitude: 14.6231,
    longitude: 121.1219,
    description: "LRT-2 connected multimodal terminal serving upper and lower Antipolo commuters."
  },
  {
    id: 15,
    name: "Taytay Bagong Palengke Terminal",
    city: "Taytay",
    province: "Rizal",
    latitude: 14.5682,
    longitude: 121.1342,
    description: "Garments capital hub with routes to Ortigas, Pasig, Cainta, and eastern Rizal municipalities."
  },
  {
    id: 16,
    name: "Lucena Grand Central Terminal",
    city: "Lucena City",
    province: "Quezon",
    latitude: 13.9511,
    longitude: 121.6169,
    description: "Quezon province's premier integrated interprovincial bus, UV Express, and jeepney terminal."
  }
];
var INITIAL_ROUTES = [
  {
    id: 1,
    terminalId: 1,
    name: "Calamba \u2013 Santa Rosa (Via Balibago)",
    origin: "Calamba",
    destination: "Santa Rosa",
    transportType: "Jeepney",
    fare: 30,
    estimatedTravelTime: 45,
    description: "Regular jeepney line running via National Highway passing Cabuyao and Balibago Commercial Complex.",
    transfers: 1,
    walkingDistanceMeters: 450,
    stops: ["Calamba Crossing Terminal", "Parian Checkpoint", "Cabuyao Bayan", "Balibago Commercial Complex", "Santa Rosa Bayan"],
    timeline: [
      {
        stepNumber: 1,
        icon: "\u{1F6B6}",
        titleEn: "Walk to Calamba Crossing Terminal",
        titleFil: "Maglakad patungong Calamba Crossing Terminal",
        instructionEn: "Head to the terminal boarding bay located near SM City Calamba overpass.",
        instructionFil: "Pumunta sa sakayan ng terminal malapit sa overpass ng SM City Calamba.",
        meta: "5 mins \u2022 400m walk"
      },
      {
        stepNumber: 2,
        icon: "\u{1F690}",
        titleEn: "Board Jeepney bound for Balibago / Santa Rosa",
        titleFil: "Sumakay ng Jeepney patungong Balibago / Santa Rosa",
        instructionEn: "Pass \u20B130.00 exact fare to fellow passengers forward to the driver.",
        instructionFil: "Iabot ang pamasaheng \u20B130.00 sa katabing pasahero patungo sa drayber.",
        meta: "35 mins \u2022 14.2 km"
      },
      {
        stepNumber: 3,
        icon: "\u{1F6D1}",
        titleEn: "Alight at Balibago Complex or Santa Rosa Bayan",
        titleFil: "Bumaba sa Balibago Complex o Santa Rosa Bayan",
        instructionEn: 'Call out "Para po sa tabi!" when approaching target landmark.',
        instructionFil: 'Sumigaw ng "Para po sa tabi!" kapag malapit na sa bababaan.',
        meta: "5 mins \u2022 Walking to destination"
      }
    ]
  },
  {
    id: 2,
    terminalId: 1,
    name: "Calamba \u2013 Santa Rosa (Nuvali Bus Express)",
    origin: "Calamba",
    destination: "Santa Rosa",
    transportType: "Bus",
    fare: 40,
    estimatedTravelTime: 35,
    description: "Air-conditioned modern transit bus from Calamba SM to Nuvali Santa Rosa via SLEX tollway.",
    transfers: 0,
    walkingDistanceMeters: 300,
    stops: ["SM City Calamba Bay 2", "Mayapa SLEX Tollway Entry", "Nuvali Robinsons Hub", "Santa Rosa Hospital & Bayan"],
    timeline: [
      {
        stepNumber: 1,
        icon: "\u{1F6B6}",
        titleEn: "Proceed to SM Calamba Bus Bay 2",
        titleFil: "Pumunta sa SM Calamba Bus Bay 2",
        instructionEn: "Queue at the air-conditioned P2P bus counter.",
        instructionFil: "Pumila sa aircon P2P bus platform counter.",
        meta: "4 mins \u2022 250m"
      },
      {
        stepNumber: 2,
        icon: "\u{1F68C}",
        titleEn: "Board Express Bus via SLEX",
        titleFil: "Sumakay ng Express Bus dadaan sa SLEX",
        instructionEn: "Direct non-stop transit along South Luzon Expressway.",
        instructionFil: "Diretsong biyahe sa South Luzon Expressway.",
        meta: "25 mins \u2022 18 km"
      },
      {
        stepNumber: 3,
        icon: "\u{1F6D1}",
        titleEn: "Alight at Nuvali Robinsons Hub",
        titleFil: "Bumaba sa Nuvali Robinsons Hub",
        instructionEn: "Direct connection to Solenad shopping and business district.",
        instructionFil: "Koneksyon sa Solenad at shopping district.",
        meta: "Arrived"
      }
    ]
  },
  {
    id: 3,
    terminalId: 1,
    name: "Calamba Crossing \u2013 Los Ba\xF1os Junction",
    origin: "Calamba",
    destination: "Los Ba\xF1os",
    transportType: "Jeepney",
    fare: 22,
    estimatedTravelTime: 25,
    description: "Jeepney connecting Calamba town proper to UPLB entrance and hot spring resorts along Pansol.",
    transfers: 0,
    walkingDistanceMeters: 200,
    stops: ["Calamba Terminal", "Bucal Bypass", "Pansol Spring Resort Strip", "Los Ba\xF1os Junction"],
    timeline: [
      {
        stepNumber: 1,
        icon: "\u{1F6B6}",
        titleEn: "Head to Bucal-Los Ba\xF1os Loading Bay",
        titleFil: "Pumunta sa Bucal-Los Ba\xF1os Loading Bay",
        instructionEn: 'Locate jeepneys with "UP College" or "Junction" route signs.',
        instructionFil: 'Hanapin ang mga jeep na may karatula na "UP College" o "Junction".',
        meta: "3 mins \u2022 150m"
      },
      {
        stepNumber: 2,
        icon: "\u{1F690}",
        titleEn: "Ride Jeepney along National Highway",
        titleFil: "Sumakay ng Jeep sa National Highway",
        instructionEn: "Enjoy scenic views of Mt. Makiling and hot spring spas in Pansol.",
        instructionFil: "Madaanan ang mga resort sa Pansol at paanan ng Bundok Makiling.",
        meta: "20 mins \u2022 9.8 km"
      },
      {
        stepNumber: 3,
        icon: "\u{1F6D1}",
        titleEn: "Alight at Los Ba\xF1os Junction / Olivarez",
        titleFil: "Bumaba sa Los Ba\xF1os Junction / Olivarez",
        instructionEn: "Transfer point for jeeps climbing directly into UPLB campus.",
        instructionFil: "Sakayan paakyat ng UPLB campus.",
        meta: "Destination"
      }
    ]
  },
  {
    id: 4,
    terminalId: 7,
    name: "Dasmari\xF1as (Pala-Pala) \u2013 Tagaytay Olivarez Plaza",
    origin: "Dasmari\xF1as",
    destination: "Tagaytay",
    transportType: "Bus",
    fare: 50,
    estimatedTravelTime: 40,
    description: "Air-conditioned provincial bus climbing Emilio Aguinaldo Highway directly into Tagaytay ridge.",
    transfers: 0,
    walkingDistanceMeters: 200,
    stops: ["Robinsons Dasma Terminal", "Silang Bypass", "Tagaytay Rotonda", "Olivarez Plaza Hub"],
    timeline: [
      {
        stepNumber: 1,
        icon: "\u{1F6B6}",
        titleEn: "Board bus at Robinsons Pala-Pala Terminal",
        titleFil: "Sumakay sa Robinsons Pala-Pala Terminal",
        instructionEn: 'Look for buses bearing "Tagaytay / Mendez / Nasugbu" placards.',
        instructionFil: 'Pumili ng bus na may karatulang "Tagaytay / Mendez / Nasugbu".',
        meta: "5 mins"
      },
      {
        stepNumber: 2,
        icon: "\u{1F68C}",
        titleEn: "Scenic uphill ride on Aguinaldo Highway",
        titleFil: "Paakyat na biyahe sa Aguinaldo Highway",
        instructionEn: "Cool breeze begins around Silang crossing.",
        instructionFil: "Lalamig ang simoy ng hangin pagsapit sa Silang.",
        meta: "30 mins \u2022 22 km"
      },
      {
        stepNumber: 3,
        icon: "\u{1F6D1}",
        titleEn: "Arrive at Tagaytay Olivarez Rotonda",
        titleFil: "Dumating sa Tagaytay Olivarez Rotonda",
        instructionEn: "Major intersection overlooking Taal Volcano ridges.",
        instructionFil: "Pangunahing sentro at tanawin ng Bulkang Taal.",
        meta: "Destination"
      }
    ]
  },
  {
    id: 5,
    terminalId: 10,
    name: "Tagaytay Olivarez \u2013 Santa Rosa (Balibago)",
    origin: "Tagaytay",
    destination: "Santa Rosa",
    transportType: "Jeepney",
    fare: 45,
    estimatedTravelTime: 55,
    description: "Downhill descent along Santa Rosa-Tagaytay Road passing Paseo de Santa Rosa and Nuvali.",
    transfers: 0,
    walkingDistanceMeters: 350,
    stops: ["Olivarez Jeepney Bay", "Nuvali South Gate", "Paseo Outlets", "Balibago Terminal"]
  },
  {
    id: 6,
    terminalId: 7,
    name: "Dasmari\xF1as \u2013 Bacoor St. Dominic",
    origin: "Dasmari\xF1as",
    destination: "Bacoor",
    transportType: "Jeepney",
    fare: 32,
    estimatedTravelTime: 45,
    description: "High-density commuter route northbound along Aguinaldo Highway connecting Cavite to coastal expressways.",
    transfers: 1,
    walkingDistanceMeters: 400,
    stops: ["Pala-Pala SM Hub", "Imus Lumang Bayan", "Niog Bacoor", "St. Dominic Hospital"]
  },
  {
    id: 7,
    terminalId: 11,
    name: "Batangas Grand Terminal \u2013 Lipa City SM",
    origin: "Batangas City",
    destination: "Lipa City",
    transportType: "Modern Jeepney",
    fare: 42,
    estimatedTravelTime: 50,
    description: "Air-conditioned modern PUV connecting the provincial capital to Lipa commerce district.",
    transfers: 0,
    walkingDistanceMeters: 150,
    stops: ["Batangas Grand Terminal Bay 4", "San Jose Poblacion", "Lipa Cathedral", "SM City Lipa Grand Terminal"]
  },
  {
    id: 8,
    terminalId: 11,
    name: "Batangas Grand Terminal \u2013 Calamba Crossing",
    origin: "Batangas City",
    destination: "Calamba",
    transportType: "Bus",
    fare: 95,
    estimatedTravelTime: 75,
    description: "Provincial highway bus via STAR Tollway linking Batangas port to Laguna crossing.",
    transfers: 0,
    walkingDistanceMeters: 250,
    stops: ["Batangas City Terminal", "STAR Tollway Exit", "Turbina Calamba Hub", "Calamba Crossing"]
  },
  {
    id: 9,
    terminalId: 14,
    name: "Antipolo Masinag \u2013 Taytay Bagong Palengke",
    origin: "Antipolo",
    destination: "Taytay",
    transportType: "Jeepney",
    fare: 20,
    estimatedTravelTime: 25,
    description: "Rizal transit link between LRT-2 Masinag Station and the Taytay Garments Tiangge district.",
    transfers: 0,
    walkingDistanceMeters: 200,
    stops: ["LRT Masinag Terminal", "Tikling Junction", "Taytay Bayan", "Bagong Palengke Tiangge"]
  },
  {
    id: 10,
    terminalId: 16,
    name: "Lucena Grand Terminal \u2013 San Pablo City",
    origin: "Lucena City",
    destination: "San Pablo",
    transportType: "Bus",
    fare: 70,
    estimatedTravelTime: 65,
    description: "Inter-provincial route traversing Maharlika Highway between Quezon and Laguna.",
    transfers: 0,
    walkingDistanceMeters: 300,
    stops: ["Lucena Grand Terminal", "Sariaya Bayan", "Tiaong Poblacion", "San Pablo Public Terminal"]
  }
];
var COMMUTER_PHRASES = [
  {
    id: 1,
    category: "Directions",
    english: "Where is the jeepney terminal?",
    filipino: "Saan po ang terminal ng jeepney?",
    bikol: "Hain po an terminal nin jeep?",
    context: "Use when arriving at a town center, crossroads, or public market."
  },
  {
    id: 2,
    category: "Directions",
    english: "Where is the bus stop going to Manila?",
    filipino: "Saan po ang sakayan ng bus papuntang Maynila?",
    bikol: "Hain po an sakayan nin bus paduman sa Maynila?",
    context: "Ask dispatchers or station marshals along provincial highways."
  },
  {
    id: 3,
    category: "Directions",
    english: "Is this the queue for Balibago?",
    filipino: "Ito po ba ang pila papuntang Balibago?",
    bikol: "Iyo po ba ini an pila paduman sa Balibago?",
    context: "Ask fellow commuters in the terminal passenger line."
  },
  {
    id: 4,
    category: "Transportation",
    english: "Does this jeepney go to Santa Rosa?",
    filipino: "Papunta po ba itong jeepney sa Santa Rosa?",
    bikol: "Paduman po ba ining jeep sa Santa Rosa?",
    context: "Ask the driver or conductor before boarding the vehicle."
  },
  {
    id: 5,
    category: "Transportation",
    english: "Will you pass by Nuvali or Solenad?",
    filipino: "Dadaan po ba kayo sa Nuvali o Solenad?",
    bikol: "Maagi po ba kamo sa Nuvali o Solenad?",
    context: "Helpful for landmark or industrial park drop-offs."
  },
  {
    id: 6,
    category: "Transportation",
    english: "Is there still space inside?",
    filipino: "May bakante pa po ba sa loob?",
    bikol: "Igwa pa po nin lugar sa laog?",
    context: "Check before boarding an almost full jeepney."
  },
  {
    id: 7,
    category: "Fare",
    english: "How much is the fare to Calamba Crossing?",
    filipino: "Magkano po ang pamasahe papuntang Calamba Crossing?",
    bikol: "Guroano po an plete paduman sa Calamba Crossing?",
    context: "Inquire regarding the exact fare matrix."
  },
  {
    id: 8,
    category: "Fare",
    english: "Here is my fare for one passenger.",
    filipino: "Makikisuyo po ng bayad, isa lang po.",
    bikol: "Paki-abot po kan plete, saro sana po.",
    context: "Hand your coins or bills to the passenger in front to pass to the driver."
  },
  {
    id: 9,
    category: "Fare",
    english: "May I have my change, please?",
    filipino: "Sukli po sa bente pesos papuntang Santa Rosa.",
    bikol: "An sukli po sa bente pesos paduman sa Santa Rosa.",
    context: "Politely remind the driver if change has not yet been handed back."
  },
  {
    id: 10,
    category: "Getting Off",
    english: "Please let me know when we reach Santa Rosa Bayan.",
    filipino: "Pakisabi po kapag nasa Santa Rosa Bayan na tayo.",
    bikol: "Paki-aram po pag yaon na kita sa Santa Rosa Bayan.",
    context: "Notify the driver or nearby passengers if unfamiliar with landmarks."
  },
  {
    id: 11,
    category: "Getting Off",
    english: "Please pull over right here! (Standard PH commuter call)",
    filipino: "Para po sa tabi! / Dito na lang po sa kanto.",
    bikol: "Para po sa gilid! / Didi na sana po sa kanto.",
    context: "Call loudly and clearly when your destination or stop is in sight."
  },
  {
    id: 12,
    category: "Getting Off",
    english: "Excuse me, passing through.",
    filipino: "Makikiraan po / Makikidaan po.",
    bikol: "Makiki-agi po.",
    context: "Say when walking out between rows of seated commuters."
  }
];

// server.ts
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  let users = [...INITIAL_USERS];
  let terminals = [...INITIAL_TERMINALS];
  let routes = [...INITIAL_ROUTES];
  let savedRoutes = [];
  let destinations = [
    {
      id: 1,
      name: "Enchanted Kingdom",
      category: "Tourist Attraction",
      city: "Santa Rosa",
      province: "Laguna",
      latitude: 14.2829,
      longitude: 121.0975,
      description: "The premier theme park in the Philippines featuring rides, roller coasters, and entertainment.",
      operatingHours: "11:00 AM - 8:00 PM (Weekends) / 12:00 PM - 7:00 PM (Weekdays)",
      nearbyTerminal: "Balibago Commercial Complex Terminal",
      transitTips: "From Balibago, take a tricycle directly to EK gate or modern jeep bound for Tagapo."
    },
    {
      id: 2,
      name: "Nuvali Park & Solenad",
      category: "Shopping",
      city: "Santa Rosa",
      province: "Laguna",
      latitude: 14.2384,
      longitude: 121.0592,
      description: "Eco-city lifestyle destination with lake activities, outdoor dining, and shopping malls.",
      operatingHours: "10:00 AM - 9:00 PM Daily",
      nearbyTerminal: "Balibago Commercial Complex Terminal",
      transitTips: "Board Nuvali e-jeepneys or P2P buses from Balibago Bay 4."
    },
    {
      id: 3,
      name: "University of the Philippines Los Ba\xF1os (UPLB)",
      category: "School/University",
      city: "Los Ba\xF1os",
      province: "Laguna",
      latitude: 14.1675,
      longitude: 121.2435,
      description: "National Center of Excellence for Agriculture and Forestry nestled at the foot of Mt. Makiling.",
      operatingHours: "Campus grounds open daily 6:00 AM - 9:00 PM",
      nearbyTerminal: "Los Ba\xF1os Junction Terminal",
      transitTips: 'From Crossing Calamba or Junction, ride jeepneys with the "UP College" signboard.'
    },
    {
      id: 4,
      name: "SM City Santa Rosa & Transport Hub",
      category: "Shopping",
      city: "Santa Rosa",
      province: "Laguna",
      latitude: 14.3142,
      longitude: 121.1001,
      description: "Major regional commercial mall and inter-modal transport hub along Old National Highway.",
      operatingHours: "10:00 AM - 10:00 PM",
      nearbyTerminal: "Balibago Commercial Complex Terminal",
      transitTips: "Jeepneys traveling between Bi\xF1an and Calamba stop directly at the main entrance."
    },
    {
      id: 5,
      name: "People's Park in the Sky",
      category: "Tourist Attraction",
      city: "Tagaytay",
      province: "Cavite",
      latitude: 14.1416,
      longitude: 121.0028,
      description: "Historical highland park providing panoramic 360-degree views of Taal Volcano and Laguna de Bay.",
      operatingHours: "8:00 AM - 6:00 PM",
      nearbyTerminal: "Tagaytay Olivarez Plaza Terminal",
      transitTips: "Take a People's Park jeepney from Olivarez terminal directly to the summit."
    }
  ];
  let safetyReports = [
    {
      id: 1,
      userId: 1,
      reporterName: "Maria Santos",
      title: "Low Street Lighting along Crossing Overpass",
      description: "The pedestrian footbridge stairs near Calamba Crossing have two burned-out sodium bulbs. Use mobile flashlight at night.",
      category: "POOR_LIGHTING",
      latitude: 14.2128,
      longitude: 121.1645,
      locationName: "Calamba Crossing Overpass, Laguna",
      status: "VERIFIED",
      upvotes: 24,
      reportedAt: "2026-09-15 19:40:00",
      moderatorNote: "Referred to Calamba City Engineering & Public Safety Office for maintenance."
    },
    {
      id: 2,
      userId: 1,
      reporterName: "Arvee S.",
      title: "Flooded Gutter near Balibago Bay 2",
      description: "Moderate gutter flooding (ankle deep) after heavy afternoon thunderstorm near the jeepney staging area.",
      category: "FLOODING",
      latitude: 14.2968,
      longitude: 121.1118,
      locationName: "Balibago Commercial Complex Bay 2",
      status: "VERIFIED",
      upvotes: 18,
      reportedAt: "2026-09-15 17:15:00",
      moderatorNote: "Drainage clearing crew deployed."
    }
  ];
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      service: "TransitPH Official Backend REST API",
      version: "1.0.0",
      deployment: "Production-Ready",
      region: "CALABARZON (Region IV-A), Philippines",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  app.get("/api/v1/system-status", (req, res) => {
    res.json({
      success: true,
      data: {
        appVersion: "1.0.0",
        environment: process.env.NODE_ENV || "production",
        regulatoryStatus: "LTFRB Fare Matrix 2026 Compliant",
        dataPrivacyNotice: "Republic Act No. 10173 (Data Privacy Act of 2012)",
        activeTerminalsCount: terminals.length,
        activeRoutesCount: routes.length,
        verifiedDestinationsCount: destinations.length,
        communitySafetyReportsCount: safetyReports.length,
        serverTime: (/* @__PURE__ */ new Date()).toISOString()
      }
    });
  });
  app.get("/api/v1/fare-matrix", (req, res) => {
    res.json({
      success: true,
      data: {
        effectiveYear: 2026,
        regulatoryBody: "Land Transportation Franchising and Regulatory Board (LTFRB Region IV-A)",
        statutoryDiscountPercent: 20,
        discountEligibleGroups: ["Students", "Senior Citizens", "Persons with Disability (PWD)"],
        transportModes: [
          {
            type: "Traditional PUJ",
            baseFare: 13,
            baseDistanceKm: 4,
            perKmRate: 1.8,
            studentDiscountBaseFare: 10.4
          },
          {
            type: "Modern PUJ (Class 2/3)",
            baseFare: 15,
            baseDistanceKm: 4,
            perKmRate: 2.2,
            studentDiscountBaseFare: 12
          },
          {
            type: "Regular City/Provincial Bus (Air-conditioned)",
            baseFare: 15,
            baseDistanceKm: 5,
            perKmRate: 2.65,
            studentDiscountBaseFare: 12
          },
          {
            type: "UV Express",
            baseFare: 15,
            baseDistanceKm: 2,
            perKmRate: 2,
            studentDiscountBaseFare: 12
          }
        ]
      }
    });
  });
  app.get("/api/v1/official-hotlines", (req, res) => {
    res.json({
      success: true,
      data: [
        { name: "LTFRB Regional Office IV-A", number: "(049) 545-0000", hotline: "1342", service: "Transport complaints & fare inquiries" },
        { name: "Philippine National Police (PNP)", number: "117", hotline: "911", service: "National emergency assistance" },
        { name: "RDRRMC CALABARZON (Office of Civil Defense)", number: "(049) 531-7266", hotline: "117", service: "Disaster, flood & weather warnings" },
        { name: "Department of Transportation (DOTr)", number: "(02) 8790-8300", hotline: "7890", service: "Public transit advisory" },
        { name: "Philippine Coast Guard (Batangas Port / RoRo)", number: "(043) 723-3850", hotline: "0917-842-8356", service: "Maritime safety & passenger ferries" }
      ]
    });
  });
  app.get("/api/v1/routes", (req, res) => {
    const { origin, destination, transportType } = req.query;
    let filtered = [...routes];
    if (origin && typeof origin === "string") {
      const q = origin.toLowerCase().trim();
      filtered = filtered.filter((r) => r.origin.toLowerCase().includes(q) || r.name.toLowerCase().includes(q));
    }
    if (destination && typeof destination === "string") {
      const q = destination.toLowerCase().trim();
      filtered = filtered.filter((r) => r.destination.toLowerCase().includes(q) || r.name.toLowerCase().includes(q));
    }
    if (transportType && typeof transportType === "string" && transportType !== "All") {
      filtered = filtered.filter((r) => r.transportType.toLowerCase() === transportType.toLowerCase());
    }
    res.json({
      success: true,
      data: filtered
    });
  });
  app.get("/api/v1/routes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const route = routes.find((r) => r.id === id);
    if (!route) {
      return res.status(404).json({ success: false, message: "Route not found" });
    }
    res.json({ success: true, data: route });
  });
  app.get("/api/v1/routes/:id/weather", (req, res) => {
    const id = parseInt(req.params.id);
    const route = routes.find((r) => r.id === id);
    if (!route) {
      return res.status(404).json({ success: false, message: "Route not found" });
    }
    res.json({
      success: true,
      data: {
        routeId: id,
        destinationCity: route.destination,
        temperatureCelsius: 29.5,
        weatherCondition: "Partly Cloudy with Scattered Showers",
        precipitationChancePercent: 35,
        windSpeedKph: 12,
        humidityPercent: 78,
        advisory: "Brief passing afternoon showers expected. Open-air transfers recommend an umbrella."
      }
    });
  });
  app.get("/api/v1/terminals", (req, res) => {
    const { province, search } = req.query;
    let filtered = [...terminals];
    if (province && typeof province === "string" && province !== "All") {
      filtered = filtered.filter((t) => t.province.toLowerCase() === province.toLowerCase());
    }
    if (search && typeof search === "string") {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        (t) => t.name.toLowerCase().includes(q) || t.city.toLowerCase().includes(q) || t.province.toLowerCase().includes(q)
      );
    }
    res.json({
      success: true,
      data: filtered
    });
  });
  app.get("/api/v1/terminals/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const terminal = terminals.find((t) => t.id === id);
    if (!terminal) {
      return res.status(404).json({ success: false, message: "Terminal not found" });
    }
    res.json({ success: true, data: terminal });
  });
  app.get("/api/v1/terminals/:id/routes", (req, res) => {
    const id = parseInt(req.params.id);
    const departingRoutes = routes.filter((r) => r.terminalId === id);
    res.json({ success: true, data: departingRoutes });
  });
  app.get("/api/v1/destinations", (req, res) => {
    const { category, search } = req.query;
    let filtered = [...destinations];
    if (category && typeof category === "string" && category !== "All") {
      filtered = filtered.filter((d) => d.category.toLowerCase() === category.toLowerCase());
    }
    if (search && typeof search === "string") {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        (d) => d.name.toLowerCase().includes(q) || d.city.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
      );
    }
    res.json({ success: true, data: filtered });
  });
  app.get("/api/v1/safety/reports", (req, res) => {
    res.json({ success: true, data: safetyReports });
  });
  app.post("/api/v1/safety/reports", (req, res) => {
    const { title, description, category, locationName, latitude, longitude, reporterName } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required." });
    }
    const newReport = {
      id: safetyReports.length + 1,
      userId: 1,
      reporterName: reporterName || "Commuter",
      title,
      description,
      category: category || "GENERAL",
      latitude: latitude || 14.2132,
      longitude: longitude || 121.1648,
      locationName: locationName || "CALABARZON Corridor",
      status: "VERIFIED",
      upvotes: 1,
      reportedAt: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 19),
      moderatorNote: "Under official advisory review."
    };
    safetyReports.unshift(newReport);
    res.status(201).json({ success: true, data: newReport });
  });
  app.get("/api/v1/phrases", (req, res) => {
    res.json({ success: true, data: COMMUTER_PHRASES });
  });
  app.post("/api/v1/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email.toLowerCase() === (email || "").toLowerCase());
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    res.json({
      success: true,
      data: {
        user,
        token: `transitph_jwt_${user.id}_${Date.now()}`
      }
    });
  });
  app.post("/api/v1/auth/register", (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ success: false, message: "An account with this email already exists." });
    }
    const newUser = {
      id: users.length + 1,
      fullName,
      email,
      role: "USER"
    };
    users.push(newUser);
    res.status(201).json({
      success: true,
      data: {
        user: newUser,
        token: `transitph_jwt_${newUser.id}_${Date.now()}`
      }
    });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TransitPH Official Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start TransitPH server:", err);
});
//# sourceMappingURL=server.cjs.map
