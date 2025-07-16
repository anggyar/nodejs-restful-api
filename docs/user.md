# User API Spec

<!-- ? REGISTER USER API START -->

## Register User API

**Endpoint : POST /api/users**

Request Body:

```json
{
    "username" : "anggy",
    "password" : "rahasia",
    "name" : "Anggyar Muhamad Yahya
}
```

Response Body Success:

```json
{
    "data": {
        "username": "anggy",
        "name": "Anggyar Muhamad Yahya"
    }
}
```

Response Body Error:

```json
{
    "errors": "Username already registered"
}
```

<!-- ? REGISTER USER API END -->

<!-- ? LOGIN USER API START -->

## Login User API

**Endpoint: POST /api/users/login**

Request Body:

```json
{
    "username": "anggy",
    "password": "rahasia"
}
```

Response Body Success:

```json
{
    "data": {
        // token harus unik. Setiap login, akan diberi token baru
        "token": "unique-token"
    }
}
```

Response Body Error:

```json
{
    "errors": "Username or password wrong"
}
```

<!-- ? LOGIN USER API END -->

<!-- ? UPDATE USER API START -->

## Update User API

**Endpoint: PATCH /api/users/current**

**Headers:**

-   Authorization: token

Request Body:

```json
{
    "name": "Anggyar Muhamad Yahya lagi" //optional,
    "password": "New Rahasia" //optional
}
```

Response Body Success:

```json
{
    "username": "anggy",
    "name": "Anggyar Muhamad Yahya lagi"
}
```

Response Body Error:

```json
{
    "errrors": "Name length max 100"
}
```

<!-- ? UPDATE USER API END -->

<!-- ? GET USER API START -->

## Get User API

**Endpoint: GET /api/users/current**

**Headers:**

-   Authorization: token

Response Body Success:

```json
{
    "data": {
        "username": "anggy",
        "name": "Anggyar Muhamad Yahya"
    }
}
```

Response Body Error:

```json
{
    "errors": "Unaothorized"
}
```

<!-- ? GET USER API END -->

<!-- ? LOGOUT USER API START -->

## Logout User API

**Endpoint: DELETE /api/users/logout**

**Headers:**

-   Authorization: token

Response Body Success:

```json
{
    "data": "OK"
}
```

Response Body Error:

```json
{
    "errors": "Unauthorized"
}
```

<!-- ? LOGOUT USER API END -->
