# Elasticsearch express

0.0.1

Elasticsearch express is a lightweight nodeJS app quickly built on Express 4. It creates another layer on top of Elasticsearch JSON interface using elasticsearch.js library.
This app is created to accept JSON request from different clients.
This app is currently under developing, the working endpoints are listed below.

# Installation

	npm install

# Run

	npm start

# Test

	npm run tests-unit

# Authentication

The authentication details are listed in configuration.json.
To achieve the token, you need to do a POST request to localhost:3000/authenticate and send the login details along.

When you have the token, you can include the 'Authorization: Bearer YOUR TOKEN' in the header of your request.

# Configuration

Make sure you have your elasticsearch is running, and have your elasticsearch IP and port number listed in configuration.json.

# Current endpoints

| Method | Endpoint                  | Description                                   | Test   |
|:-------|:--------------------------|:----------------------------------------------|:-------|
| POST   | `\authenticate`           | Login process, username and password needed   | Passed |
| GET    | `\documents\status`       | Check elasticsearch status                    | Passed |
| POST   | `\documents\all`          | Perform a match_all request to elasticsearch  | Passed |
| POST   | `\document\search\string` | Perform a search passing the query as a string| Passed |
| POST   | `\documents\mapping`      | Perform a mapping call                        | Passed |

# Coming tasks

1. Generate API doc
2. Create endpoints for more Elasticsearch queries
3. Add tests for new endpoints
4. Create AngularJS frontend as an example

All contributions are very welcome.
