# IntelliFund Advisor

An AI-powered mutual fund recommendation platform that delivers personalized investment advice through intelligent risk assessment, market insights, and data-driven fund recommendations.

![IntelliFund](https://img.shields.io/badge/React-18.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.0-teal?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?logo=vite)

---

## 🌟 Features

### Core Functionality
- **🤖 AI-Powered Fund Recommendations** — Get personalized mutual fund suggestions based on your risk tolerance, investment goals, and time horizon
- **📊 Risk Assessment Questionnaire** — 8-question interactive wizard to determine your risk profile
- **📈 Market Insights** — Real-time market analysis with AMFI NAV data integration
- **💼 Portfolio Management** — Track and manage your investment portfolio
- **🔍 Smart Fund Matching** — Explainable recommendations with "Why this fund?" breakdowns

### User Experience
- **🔐 Secure Authentication** — JWT-based auth with protected routes
- **📱 Responsive Design** — Mobile-first design using Tailwind CSS and ShadCN UI
- **✨ Modern UI** — Glass morphism effects, smooth animations with Framer Motion
- **📊 Data Visualization** — Interactive charts using Chart.js

### Data Pipeline
- **🔗 AMFI API Integration** — Live NAV data from Association of Mutual Funds in India
- **📁 Fallback System** — Gracefully degrades to mock data when APIs are unavailable
- **🗄️ PostgreSQL Database** — Direct database integration for user data and responses

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool & Dev Server |
| Tailwind CSS | Styling |
| ShadCN UI | Component Library |
| Framer Motion | Animations |
| Chart.js | Data Visualization |
| React Router | Client-side Routing |

### Backend
| Technology | Purpose |
|------------|---------|
| Supabase Edge Functions | Serverless API endpoints |
| PostgreSQL | Primary Database |
| AMFI API | External NAV Data |

### Testing
| Tool | Purpose |
|------|---------|
| Vitest | Unit Testing |
| Playwright | E2E Testing |

---

## 📁 Project Structure

```
├── src/
│   ├── components/          # UI Components
│   │   ├── ui/             # ShadCN UI components
│   │   ├── AdvisorFundCard.tsx
│   │   ├── FundCard.tsx
│   │   ├── InsightCard.tsx
│   │   ├── MetricCard.tsx
│   │   ├── Navbar.tsx
│   │   └── ProtectedRoute.tsx
│   ├── pages/              # Route Pages
│   │   ├── LandingPage.tsx
│   │   ├── AuthPage.tsx
│   │   ├── AdvisorPage.tsx        # Risk Questionnaire
│   │   ├── RecommendationPage.tsx # Fund Results
│   │   ├── MarketInsightsPage.tsx
│   │   ├── PortfolioPage.tsx
│   │   ├── AnalyticsPage.tsx
│   │   └── NotFound.tsx
│   ├── hooks/              # Custom React Hooks
│   │   ├── useAuth.tsx
│   │   └── use-toast.ts
│   ├── context/            # React Context
│   │   └── PortfolioContext.tsx
│   ├── services/           # API Services
│   │   └── apiService.ts
│   ├── data/               # Mock Data & Constants
│   │   ├── mockData.ts
│   │   └── fundReasons.ts
│   ├── lib/                # Utilities
│   │   └── utils.ts
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── types.ts
│   └── App.tsx             # Main App Component
├── supabase/
│   └── functions/          # Edge Functions
│       └── fetch-amfi-nav/ # AMFI API Integration
├── public/                 # Static Assets
├── index.html
├── tailwind.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A Supabase project (or local PostgreSQL)

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd intellifund-advisor
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Create a `.env` file with:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. **Start the development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🎯 Usage

### Risk Assessment Flow
1. **Sign up** or **Log in** to access protected features
2. Navigate to **"Get Advice"** to start the questionnaire
3. Answer 8 questions about:
   - Monthly income & stability
   - SIP investment amount
   - Investment experience
   - Risk tolerance
   - Financial goals & time horizon
4. Get **personalized fund recommendations** with AI-powered explanations

### API Integration
The app connects to **AMFI (Association of Mutual Funds in India)** for live NAV data:
- Edge Function: `fetch-amfi-nav`
- Endpoint: Daily NAV data from `amfiindia.com`
- Fallback: Mock data when API is unavailable

---

## 📊 Database Schema

### Key Tables

**profiles**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Auth user reference |
| full_name | TEXT | User's full name |
| email | TEXT | User email |
| created_at | TIMESTAMP | Creation time |

**advisory_responses**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Auth user reference |
| monthly_income | NUMBER | Monthly income bracket |
| investment_amount | NUMBER | SIP amount |
| risk_tolerance | ENUM | Low/Medium/High |
| financial_goal | ENUM | Tax Saving/Education/Wealth/Retirement |
| investment_duration | ENUM | Short/Mid/Long term |
| recommendation | JSON | AI recommendation result |
| created_at | TIMESTAMP | Response time |

---

## 🔌 API Endpoints

### Internal APIs
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/recommendations` | GET | Fetch fund recommendations |
| `/portfolio` | GET/POST | Portfolio management |
| `/market-insights` | GET | Market data & trends |

### External APIs
| Source | Endpoint | Data |
|--------|----------|------|
| AMFI India | `amfiindia.com/spages/NAVAll.txt` | Daily NAV data |

---

## 🧪 Development

### Running Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

### Code Quality
- **ESLint** — Linting with TypeScript rules
- **Prettier** — Code formatting
- **TypeScript** — Strict type checking

---

## 📦 Building for Production

```bash
npm run build
```

Output is generated in the `dist/` directory, ready for deployment.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use ESLint and Prettier for formatting
- Write tests for new features
- Update documentation for API changes

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **AMFI India** — For providing public NAV data
- **ShadCN UI** — Beautiful, accessible components
- **Supabase** — Backend services
- **Open source libraries** — React, Tailwind, Framer Motion, Chart.js

---

## 💬 Support

For questions or issues:
- Open an issue on GitHub
- Contact the development team

---

## 🔮 Future Roadmap

- [ ] Historical NAV tracking & performance charts
- [ ] Machine learning model integration for predictions
- [ ] Portfolio rebalancing recommendations
- [ ] Tax-loss harvesting suggestions
- [ ] Mobile app (React Native)

---

<p align="center">Built with ❤️ for smarter investing</p>
