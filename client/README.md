# VersaAI (Client)

>A lightweight front-end for the VersaAI project — a collection of AI-assisted utilities and demos built during a research internship.

## Project overview

The `client` folder contains the React + Vite front-end for VersaAI. It provides the public user interface, routing, and UI components used to access AI features such as content generation, image processing, and productivity tools.

Key goals:
- Provide a simple, responsive UI scaffold for AI tools
- Demonstrate integration points for back-end AI APIs
- Serve as a starting point for extending functionality during the internship

## Features

- Multi-page React app (Vite + React Router)
- Demo pages for generating content, image tasks, and utility features
- Responsive layout and Tailwind CSS-based styling

## Tech stack

- React (v19)
- Vite
- React Router
- Tailwind CSS
- Lucide icons

## Getting started (development)

1. Install dependencies

	```powershell
	cd client
	npm install
	```

2. Start the dev server

	```powershell
	npm run dev
	```

3. Open http://localhost:5173 (or the port Vite shows)

Notes:
- This folder is the front-end only. To use any backend/A.I. features you'll need the corresponding API server or mocks.

## Project structure (high-level)

- `src/` — source code for the client app
  - `components/` — reusable UI components (Navbar, Login, etc.)
  - `pages/` — route pages (Dashboard, GenerateImages, Home, etc.)
  - `assets/` — image and static asset references
  - `main.jsx` / `App.jsx` — app entry and route configuration

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Clone your fork
3. Create a descriptive branch: `git checkout -b feat/your-feature`
4. Commit changes with clear messages and open a pull request
5. In the pull request description, explain what you changed and why

Tips:
- Keep changes focused and limited to one logical change per PR
- Add or update tests where applicable
- Run the dev server locally and confirm there are no lint/type errors

## Coding standards & linting

- ESLint is configured in the project root. Run `npm run lint` in the `client` folder to check for issues.


-

