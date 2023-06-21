# Blog. Microservices.

## Features

### Posts

- Create posts
- Fetch and display posts

### Post comments

- Create post comments
- Fetch and display post comments
- Comment moderation: only the content of approved comments is visible to the users. Comments that are awaiting moderation are marked as such, and rejected comments are not shown at all.

## Architecture

This project utilizes a microservices architecture to build a scalable and decoupled system for managing posts and comments.

**Client (React)**: The client application is responsible for rendering the user interface and handling user interactions. It fetches data from the backend services and displays posts and comments to the user. The client also includes forms to create new posts and comments.

**Microservices - Posts**: This microservice is dedicated to managing posts. It handles the creation and retrieval of posts. It communicates with other services using the event bus and provides an API for the client to interact with.

**Microservices - Comments**: The comments microservice handles the management of comments associated with posts. It allows users to add new comments and retrieve comments for a specific post. Similar to the Posts microservice, it communicates through the event bus and provides an API for interaction.

**Microservices - Moderation**: The moderation microservice handles the moderation of comments. Comments can be either pending moderation, be approved or rejected. It communicates through the event bus with the comments and query microservices.

**Event Bus**: The event bus is a custom implementation that enables communication and coordination between the microservices. It facilitates the exchange of events, such as creating a new post or adding a comment, ensuring that relevant services are notified and can react accordingly. The event bus plays a crucial role in maintaining consistency and keeping the microservices decoupled.

**Query Service**: The query service acts as an intermediary between the client and the microservices, specifically for fetching posts with their associated comments. Rather than making multiple requests to retrieve posts and comments separately, the query service optimizes the process by aggregating the necessary data and responding to the client with a single request. This approach minimizes the number of requests sent to the backend, enhancing performance and reducing network overhead.

By leveraging the microservices architecture, this project achieves scalability, modularity, and maintainability. Each microservice operates independently, allowing for easy scaling of specific services based on demand.

## Tech Stack

### Server

- [Node.js](https://nodejs.org/en/docs/) - an open-source JavaScript runtime environment for building server-side applications
- [Express](https://expressjs.com/) - a web application framework for Node.js that makes it easier to build and manage APIs
- [Typescript](https://www.npmjs.com/package/typescript) - a typed version of JavaScript that improves code quality and maintenance.

<hr />

- [Cors](https://www.npmjs.com/package/cors) - Node.js CORS middleware
- [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client.
- [dotenv](https://www.npmjs.com/package/dotenv) - a library for loading environment variables from a .env file
- [Nodemon](https://www.npmjs.com/package/nodemon) - a utility that automatically restarts a Node.js server when changes are detected in source files
- [ESLint](https://www.npmjs.com/package/eslint) with [Typescript parser](https://www.npmjs.com/package/@typescript-eslint/parser) enforces coding style and helps catch errors in development.

### Client

- [Create React App](https://github.com/facebook/create-react-app) - a tool that provides a simplified and pre-configured setup for quickly creating and developing [React.js](https://react.dev/) applications.
- [Tailwind CSS](https://tailwindcss.com/) - is a utility-first CSS framework
- [Typescript](https://www.npmjs.com/package/typescript) - a typed version of JavaScript that improves code quality and maintenance.

<hr />

- [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client.
- [ESLint](https://www.npmjs.com/package/eslint) with [Airbnb config](https://www.npmjs.com/package/eslint-config-airbnb) and [Typescript parser](https://www.npmjs.com/package/@typescript-eslint/parser) enforces coding style and helps catch errors in development.

## Branches

- `main` - production
- `dev` - development
