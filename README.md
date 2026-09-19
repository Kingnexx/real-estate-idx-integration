# Real Estate IDX Integration (Practice Project)

A full-stack real estate listing search application demonstrating an IDX-style integration pipeline: pulling RESO-format MLS data, mapping it into a clean schema, storing it in a database, and serving it through a custom API to a React frontend.

## What this demonstrates

- Translating RESO/MLS-standard field names (`ListPrice`, `BedroomsTotal`, etc.) into a clean application schema via a dedicated mapping layer
- A REST API built with Express, including query-parameter filtering, input validation, and proper HTTP status codes
- SQLite database storage, with a separate one-time import script decoupled from the live server
- A React frontend with live search/filtering, loading and error states, and graceful handling of missing/incomplete listing data
- MLS compliance logic: filtering out non-Active (Pending/Sold) listings before they reach the public API

## Note on data

This project uses simulated MLS/RESO-format data (`mlsRawData.json`) rather than a live MLS feed, since real MLS access requires broker authorization and a data licensing agreement. The mapping, database, and API layers are built exactly as they would be for a live integration — connecting to a real MLS provider's RESO Web API would mean swapping this one data source, not rebuilding the architecture.

## Tech stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Database:** SQLite (via better-sqlite3)

## Project structure