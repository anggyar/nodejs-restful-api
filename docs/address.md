# Address API Spec

## Create Address API

Endpoint: POST /api/contacts/:contactId/addresses

Headers :

-   Authorization: token

Request Body:

```json
{
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
}
```

Response Body Success:

```json
{
    "data": {
        "id": 1,
        "street": "Jalan apa",
        "city": "Kota apa",
        "province": "Provinsi apa",
        "country": "Negara apa",
        "postal_code": "Kode pos"
    }
}
```

Response Body Error:

```json
{
    "errors": "Country is required"
}
```

## Update Address API

Endpoint: PUT /api/contacts/:contactId/addresses/:addressesId

Headers :

-   Authorization: token

Request Body:

```json
{
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
}
```

Response Body Success:

```json
{
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
}
```

Response Body Error:

```json
{
    "errors": "Country is required"
}
```

## Get Address API

Endpoint: POST /api/contacts/:contactId/addresses/:addressId

Headers :

-   Authorization: token

Response Body Success:

```json
{
    "data": {
        "id": 1,
        "street": "Jalan apa",
        "city": "Kota apa",
        "province": "Provinsi apa",
        "country": "Negara apa",
        "postal_code": "Kode pos"
    }
}
```

Response Body Error:

```json
{
    "errors": "Contact is not found"
}
```

## List Address API

Endpoint: POST /api/contacts/:contactId/addresses

Headers :

-   Authorization: token

Response Body Success:

```json
{
    "data": [
        {
            "id": 1,
            "street": "Jalan apa",
            "city": "Kota apa",
            "province": "Provinsi apa",
            "country": "Negara apa",
            "postal_code": "Kode pos"
        },
        {
            "id": 2,
            "street": "Jalan apa",
            "city": "Kota apa",
            "province": "Provinsi apa",
            "country": "Negara apa",
            "postal_code": "Kode pos"
        }
    ]
}
```

Response Body Error:

```json
{
    "errors": "Contact not found"
}
```

## Remove Address API

Endpoint: POST /api/contacts/:contactId/addresses/:addressId

Headers :

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
    "errors": "address is not found"
}
```
