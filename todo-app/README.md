# To-Do List Application

This is a simple to-do list application built with React for the frontend and Node.js for the backend. The application allows users to create, read, and delete to-do items, which are persisted using a JSON-based database.

## Features

- Add new to-do items
- View existing to-do items
- Delete to-do items

## Technologies Used

- React
- Node.js
- Express
- TypeScript
- JSON

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. Install dependencies for the client:
   ```bash
   cd client
   npm install
   ```

3. Install dependencies for the server:
   ```bash
   cd ../server
   npm install
   ```

### Running the Application

1. Start the server:
   ```bash
   cd server
   npm start
   ```

2. Start the client:
   ```bash
   cd ../client
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## CI/CD

This project is configured with GitHub Actions for continuous integration and deployment. The workflow is defined in the `.github/workflows/ci-cd.yml` file.

## License

This project is licensed under the MIT License.
Thu Jun 12 21:48:18 CST 2025 - Testing runners
