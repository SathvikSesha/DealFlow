# DealFlow Backend API

An M&A (Mergers & Acquisitions) Deal Flow management platform built with Express, Node.js, and MongoDB.

## Features
- Fully integrated Admin and Employee authentication
- Secure cross-company workspace isolation
- Comprehensive Deal Flow tracking with dynamic team member assignments

High-Level Architecture
                                    ┌──────────────────────┐
                                    │    React Frontend    │
                                    │  (Tailwind + Axios)  │
                                    └──────────┬───────────┘
                                               │
                                      HTTPS Requests
                                               │
                                    ┌──────────▼──────────┐
                                    │       Nginx         │
                                    │ Reverse Proxy/API   │
                                    │      Gateway        │
                                    └──────────┬──────────┘
                                               │
        ┌──────────────────────────────────────┼──────────────────────────────────────┐
        │                                      │                                      │
        ▼                                      ▼                                      ▼
┌────────────────┐                   ┌────────────────┐                    ┌────────────────┐
│ Auth Service   │                   │ Deal Service   │                    │ Task Service   │
└────────────────┘                   └────────────────┘                    └────────────────┘
        │                                      │                                      │
        └──────────────────────────────┬───────┴──────────────────────────────────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │ Risk Service     │
                              └──────────────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │ Document Service │
                              └──────────────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    ▼                                     ▼
           ┌────────────────┐                   ┌────────────────┐
           │ AWS S3 Bucket  │                   │ MongoDB Atlas  │
           │ Stores Files   │                   │ Stores Metadata│
           └────────────────┘                   └────────────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │ Redis Cache      │
                              │ Sessions, Cache, │
                              │ Notifications    │
                              └──────────────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │ Notification     │
                              │ Service          │
                              └──────────────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │ Audit Log        │
                              │ Service          │
                              └──────────────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │ AI Assistant     │
                              │ Service          │
                              └──────────────────┘
