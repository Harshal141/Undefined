# Nomadic Quest

## AI-Based Travel Planner
This project is an AI-powered travel planner that generates personalized travel itineraries based on user preferences like budget, number of people, travel dates, and more. It utilizes Gemini AI for intelligent recommendations and the Amadeus API for up-to-date flight and hotel information.

## Features
- Personalized Itineraries: Tailors travel plans based on user inputs such as budget, group size, and preferences.
- Real-time Flight and Hotel Data: Fetches the latest flight and hotel details using the Amadeus API.
- AI Recommendations: Powered by Gemini AI for smart suggestions on destinations, activities, and accommodations.

## Tech Stack
- Frontend: React (Vite)
- Styling: Tailwind CSS
- AI: Gemini AI
- APIs: Amadeus API for flight and hotel details
- Libraries: Axios, React-markdown

## Installation

### Prerequisites
Ensure you have the following installed:

[] `Node.js`
[] `Yarn or npm`

### Steps
Clone the repository:

```
git clone https://github.com/Harshal141/Undefined.git
cd Undefined
```

Install dependencies: If using Yarn:

```
yarn install
-- or --
npm install
```
Set up environment variables: Create a .env file in the root directory with the following variables:

```
VITE_API_KEY=amadeus-apikey
VITE_API_SECRET=amadeus-apikey-secret
VITE_GEMINI_KEY=your-gemini-api-key
```

> [!NOTE]  
> To create a amadeus api key visit: https://developers.amadeus.com/
> For Gemini api key: https://aistudio.google.com/app/apikey

Run the development server:

```
yarn dev
-- or --
npm run dev
```

## Usage

Once the application is running, users can input their preferences like:
`Number of people` `Budget` `Preferred destinations` `Travel dates`
The AI will generate a complete travel plan including flights and hotels, along with recommendations for activities and restaurants.

## License
This project is licensed under the MIT License.
