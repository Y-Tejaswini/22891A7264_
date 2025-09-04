# Logging Middleware (Evaluation API)

The evaluation logging endpoint (provided by the test) is:

POST http://20.244.56.144/evaluation-service/logs

Request body JSON:
{
  "stack": "frontend" | "backend",
  "level": "debug" | "info" | "warn" | "error" | "fatal",
  "package": "<package name e.g. api, component, page, handler, controller>",
  "message": "string message"
}

Successful response (200):
{
  "logID": "<uuid>",
  "message": "log created successfully"
}

Our frontend saves logs to localStorage under `appLogs` and posts to this endpoint via `src/utils/logger.js`.
