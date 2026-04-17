# Welcome to your Lovable project
IntelliFund Advisor
Project Overview
IntelliFund Advisor is a comprehensive mutual fund recommendation platform that combines modern web technologies with intelligent data processing to provide personalized investment advice. The platform offers market insights, risk assessment, portfolio management, and AI-powered fund recommendations based on user preferences and financial goals.

The application consists of three main components:

Frontend: A responsive React-based web application with authentication and interactive dashboards
Backend API: A FastAPI-powered REST API serving fund data and recommendations
Data Pipeline: A Python-based ETL pipeline for processing and analyzing mutual fund data
Features
Core Functionality
Fund Recommendations: AI-powered fund suggestions based on risk tolerance, investment goals, and time horizon
Market Insights: Real-time market analysis and trend visualization
Portfolio Management: Track and manage investment portfolios
Risk Assessment: Comprehensive risk evaluation tools
Analytics Dashboard: Detailed performance metrics and analytics
User Experience
Authentication: Secure user authentication via Supabase
Responsive Design: Mobile-first design using Tailwind CSS and ShadCN UI components
Interactive Charts: Data visualization using Chart.js and related libraries
Real-time Updates: Live market data integration
Data Processing
ETL Pipeline: Automated data extraction, transformation, and loading
Fund Classification: Intelligent categorization of mutual funds
Metrics Calculation: Risk metrics, returns analysis, and quality scoring
Data Validation: Quality assurance and data integrity checks
Technology Stack
Frontend
Framework: React 18 with TypeScript
Build Tool: Vite
Styling: Tailwind CSS with ShadCN UI components
State Management: React Query for server state, Context API for global state
Routing: React Router
Authentication: Supabase Auth
Charts: Chart.js ecosystem
Testing: Vitest with Playwright for E2E testing
Backend
Framework: FastAPI (Python)
Database: Supabase (PostgreSQL)
Data Processing: Pandas, NumPy
API Documentation: Automatic OpenAPI/Swagger docs
CORS: Configured for cross-origin requests
Data Pipeline
Language: Python
Data Libraries: Pandas, NumPy
File Processing: CSV handling and data validation
Metrics Engine: Custom algorithms for fund analysis
Infrastructure
Database: Supabase (managed PostgreSQL)
Deployment: Configurable for various cloud platforms
Version Control: Git
Project Structure
Installation
Prerequisites
Node.js 18+ and npm
Python 3.8+
Supabase account and project
Frontend Setup
Navigate to the project root:

Install dependencies:

Configure environment variables:
Create a .env.local file with:

Start the development server:

Backend Setup
Navigate to the backend directory:

Create a virtual environment:

Install dependencies:

Start the FastAPI server:

Data Pipeline Setup
Navigate to the pipeline directory:

Install dependencies:

Run the pipeline:

Usage
Running the Application
Start the backend API server
Start the frontend development server
Access the application at http://localhost:5173
API Endpoints
Funds
GET /api/funds - Retrieve all available funds
GET /api/market-insights - Get market insights and trends
POST /api/recommendations - Get personalized fund recommendations
Health Check
GET /health - API health status
Data Pipeline
The data pipeline processes mutual fund data through several stages:

Fetch: Download NAV data from external sources
Clean: Process and clean historical data
Risk Calculation: Compute risk metrics and returns
Store: Save processed data to CSV files
Quality Report: Generate fund quality assessments
Development
Testing
Building for Production
Code Quality
API Documentation
When the backend is running, visit http://localhost:8000/docs for interactive API documentation powered by Swagger UI.

Database Schema
The application uses Supabase for data storage with the following key tables:

User profiles and authentication
Portfolio holdings
Transaction history
Fund metadata
Contributing
Fork the repository
Create a feature branch: git checkout -b feature/your-feature
Commit changes: git commit -am 'Add new feature'
Push to branch: git push origin feature/your-feature
Submit a pull request
Code Standards
Follow TypeScript and Python best practices
Use ESLint and Prettier for code formatting
Write tests for new features
Update documentation for API changes
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Mutual fund data sources
Open source libraries and frameworks
Supabase for backend services
ShadCN for UI components
Support
For questions or issues, please open an issue on the GitHub repository or contact the development team
TODO: Document your project here
