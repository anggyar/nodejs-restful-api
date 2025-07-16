# Contact API Spec

## Create Contact API

**Endpoint: POST /api/contacts**

Headers :

-   Authorizatin: token

Request Body:

```json
{
    "first_name": "Anggyar",
    "last_name": "Muhamad Yahya",
    "email": "anggyar@gmail.com",
    "phone": "08121223230"
}
```

Response Body Success:

```json
{
    "data": {
        "id": 1,
        "first_name": "Anggyar",
        "last_name": "Muhamad Yahya",
        "email": "anggyar@gmail.com",
        "phone": "08121223230"
    }
}
```

Response Body Error

```json
{
    "errors": "Email is not in valid format"
}
```

## Update Contact API

**Endpoint: PUT /api/contacts/:id**

Headers :

-   Authorizatin: token

Request Body:

```json
{
    "first_name": "Anggyar",
    "last_name": "Muhamad Yahya",
    "email": "anggyar@gmail.com",
    "phone": "08121223230"
}
```

Response Body Success:

```json
{
    "data": {
        "id": 1,
        "first_name": "Anggyar",
        "last_name": "Muhamad Yahya",
        "email": "anggyar@gmail.com",
        "phone": "08121223230"
    }
}
```

Response Body Error

```json
{
    "errors": "Email is not in valid format"
}
```

## Get Contact API

**Endpoint: GET /api/contacts**

Headers :

-   Authorizatin: token

Response Body Succes:

```json
{
    "data": {
        "id": 1,
        "first_name": "Anggyar",
        "last_name": "Muhamad Yahya",
        "email": "anggyar@gmail.com",
        "phone": "08121223230"
    }
}
```

Response Body Error:

```json
{
    "errors": "Contact is not found"
}
```

## Search Contact API

**Endpoint: POST /api/contacts**

Headers :

-   Authorizatin: token

Query Params :

-   name: Search by first_name or last_name, using like, optional
-   email: Search by email, using like, optional
-   phone: Search by phone, using like, optional
-   page: number of page, default 1
-   size: size per page, default 10

Response Body Success:

```json
{
    "data": [
        {
            "id": 1,
            "first_name": "Anggyar",
            "last_name": "Muhamad Yahya",
            "email": "anggyar@gmail.com",
            "phone": "08121223230"
        },
        {
            "id": 2,
            "first_name": "Anggyar",
            "last_name": "Muhamad Yahya",
            "email": "anggyar@gmail.com",
            "phone": "08121223230"
        }
    ],
    "paging": {
        "page": 1,
        "total_page": 3,
        "total_item": 30
    }
}
```

Response Body Error

## Remove Contact API

**Endpoint: DELETE /api/contacts:id**

Headers :

-   Authorizatin: token

Response Body Success:

```json
{
    "data": "OK"
}
```

Response Body Error:

```json
{
    "errors": "Contact is not found"
}
```
