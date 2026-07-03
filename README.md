# DealFlow Backend API

An M&A (Mergers & Acquisitions) Deal Flow management platform built with Express, Node.js, and MongoDB.

## Features
- Fully integrated Admin and Employee authentication
- Secure cross-company workspace isolation
- Comprehensive Deal Flow tracking with dynamic team member assignments

## Structure
- `config/` - Configuration including Database connector
- `controllers/` - Express handlers containing application flow logic
- `middleware/` - Custom security protection, role validations, and company restrict filters
- `models/` - Mongoose schemas (User, Company, Deal, DealMember, Document, Risk, Task)
- `routes/` - API endpoints mount points
- `services/` - JWT authentication services
