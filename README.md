# Online Game Bet UI

## Overview

This is responsive front end app with registration, login/logout, online betting, tracking bets and transactions features. API: https://github.com/MantasBuga/mock-api.

## Features

- **User Authentication:** Register, login, and logout functionality, validating user.
- **Betting:** Place bets and view results instantly.
- **Bets Management:** View, filter, paginate, and cancel your bets.
- **Wallet Transactions:** View, filter, and paginate your transaction history.
- **Responsive Design:** Optimized for desktop and mobile devices.

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool)
- [Sass](https://sass-lang.com/) (styling)
- [Axios](https://axios-http.com/) (HTTP client)
- [React Router](https://reactrouter.com/) (routing)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Yarn](https://yarnpkg.com/) (recommended)

### Installation

1. Clone the repository:

```
git clone https://github.com/g-iele/online-game-bet-ui.git
cd online-game-bet-ui/app
```

2. Install dependencies:

```
yarn install
```

### Development

Start the development server:

```
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Lint & Format

- Lint: `yarn lint`
- Format: `yarn format`

## Project Structure

```
app/
├── src/
│ ├── components/ # Reusable UI components
│ ├── context/ # React context providers
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Page components
│ ├── providers/ # Context provider implementations
│ ├── routes/ # Route definitions
│ ├── services/ # API services
│ ├── styles/ # SCSS styles
│ ├── types/ # TypeScript types
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
```

## License

MIT

---

Made by [Ieva St](https://github.com/g-iele)
