# AI Conversation and Summarization Application

This is a simple Node.js application that uses the OpenAI ChatGPT API to interact with a user, engage in a conversation, and summarize the main points.

### Prerequisites

- The API must be running on http://localhost:3001
- NPM

### Installing

1. Install the dependencies

```bash
npm install
```

2. Make sure the .env file in the root directory of the project and insert your key-value pairs in the following format of REACT_APP_API_URL=http://localhost:3001

### Usage

Run the application
This Application will run on http://localhost:3000

```bash
npm start
```

### Tech Debts:

- Use winston lib to write logs
- Write unit and integration tests
- Create a Docker file to run the app inside a container
- Create a docker-compose file to run all services
- Create hooks to run lint/tests before git commit
- Maybe create a version in TS
- extract the components to a specific dir
