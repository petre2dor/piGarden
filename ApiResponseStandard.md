## A standard for sending data as response for a API call

```json
{
    "httpCode": "200|203|404...",
    "type": "SUCCESS|WARNING|ERROR...",
    "message": "Can be an error message or just an OK",
    "data": [
        "actual",
        "data",
        "or", 
         ["arrays", "or", "whatever"]
    ]
}
```
