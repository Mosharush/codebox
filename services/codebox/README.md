# Api

This api used to run user scripts and get the output.

## How to run

For local development you should use docker-copose to run the api.

```bash
docker-compose up
```

For production, you should use docker to run the api or build and apply to k8s.

```bash
docker build -t api .
docker run -p 3000:3000 api
```

## Routes

| Route          | Method | Body          | Description                  |
| -------------- | ------ | ------------- | ---------------------------- |
| /langs         | GET    | empty         | get all supported languages  |
| /langs/:lang   | POST   | {code: '...'} | run code in the language     |
| /functions     | GET    | empty         | get all saved functions      |
| /functions/:id | GET    | empty         | get context data of function |

# CURL Example for local development

```bash
curl 'http://localhost:8080/langs/node' -X POST -H 'Content-Type: application/json' --data-raw '{"code":"console.log(123);"}'
```

output:

```json
{
  "status": "success",
  "output": "123"
}
```
