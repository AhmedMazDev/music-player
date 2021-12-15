# Make First Revolut API Request

## 1 - Generate public and private keys :

Create a new folder and run the following commands to generate your keys

```bash
$ openssl genrsa -out privatekey.pem 1024

$ openssl req -new -x509 -key privatekey.pem -out publickey.cer -days 1825
```

After you generated the keys you should have 2 files named ==publickey.cer== and ==privatekey.pem== then head over to [Revolut Sandbox Buisness Portal](https://sandbox-business.revolut.com/signin) and create an account.

- Log in to your account.
- Go to **Settings > Business API**
- Click **Add API certificate**
- Open the ==publickey.cer== and copy its content to **X509 publik Key** field
- Fill the other fields and click **Continue**

![Certificate](https://imgur.com/UalWWjw)

After successfuly adding your certificate you should have your ClientID, Copy it and store it in a file.

## 2 - Generate a client assertion

Create a new Javascript file and name it JWTGenerator then run the following command in the terminal :

```bash
npm install jsonwebtoken
```

import JWT :

```js
const jwt = require("jsonwebtoken");
```

import fileSystem :

```js
const fs = require("fs");
```

now lets Generate the JWT Token and store it in a file :

```js
const jwt = require("jsonwebtoken");
const fs = require("fs");

//Client ID
const id = "ufFnhvSRjmQ9LrnA4vhKSr-8YyYNUt2ozpxyjt3UQ_s";

//Private Key (privatekey.pem)
const privateKey = fs.readFileSync("./privatekey.pem", "utf8");

var payload = {
  //your issuer redirect URI
  iss: "www.google.com",
  //Client ID
  sub: id,
  aud: "https://revolut.com",
  exp: 1797246000,
};

var token = jwt.sign(payload, privateKey, {
  algorithm: "RS256",
});

fs.writeFileSync("./token.txt", token);
```

execute the javascript file by running :

```bash
npm JWTGenerator.js
```

Now head over to the newly generated text file ==token.txt== and copy your token

## 3 - Exchange authorization code for access token

Now you have Successfuly generated your token head over to your **Revolut Sandbox account > settings > Business API** and click enable certificate.

You should be redirected to your **OAuth redirect URI**, then copy the code in the query, For my case i used Google.com so the code should look like this :

```
https://www.google.com/?code=oa_sand_rBt2qxi037qz5HGfczZIgYXz-lz_K3yRZiD7ZrSAR14
```

here we have our authorization code :

```
oa_sand_rBt2qxi037qz5HGfczZIgYXz-lz_K3yRZiD7ZrSAR14
```

Now we need to exchange it for the access token, to do so Run the following command :

```curl
curl https://sandbox-b2b.revolut.com/api/1.0/auth/token \
  -H "Content-Type: application/x-www-form-urlencoded"\
  --data "grant_type=authorization_code"\
  --data "code=oa_sand_g6ef4GxUskufM3v97BhJFJ5Omq4Wuj10IcWC9j9TRNY"\
  --data "client_id=ufFnhvSRjmQ9LrnA4vhKSr-8YyYNUt2ozpxyjt3UQ_s"\
  --data "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer"\
  --data "client_assertion=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuZ29vZ2xlLmNvbSIsInN1YiI6InVmRm5odlNSam1ROUxybkE0dmhLU3ItOFl5WU5VdDJvenB4eWp0M1VRX3MiLCJhdWQiOiJodHRwczovL3Jldm9sdXQuY29tIiwiZXhwIjoxNzk3MjQ2MDAwLCJpYXQiOjE2Mzk1NzkzNDN9.MQYyhIxIz14fGzrNEavNTVWcL9uKZmndsIgI4PleRM5wRi-IhpbHTBa2kBOjXcbMIAtpb8UqaSo226UMNgYxNqMsqXqc1q-UU1xnq6EkKcNDk6oEsVDizcPeKGKA3m9XGmfGvovjLkECGcdg8TZ5qvOWcyZfdHNi4JBO2XEaSVE"
```

After Running the command you should get a JSON result like this :

```json
{
  "access_token": "oa_sand_jnZTNIxL7AxSBD21m09D0a8EcsgoVHiCf1bVTpk9Tto",
  "token_type": "bearer",
  "expires_in": 2399,
  "refresh_token": "oa_sand_ryEkQZfcL5LAAafKVS5BsJwxYMeBT3wtSAo1OIbPSRo"
}
```

## 4 - Make The API Request :

Now we have our access token the only thing left is to make the request.

Run this command to get the accounts :

```curl
curl https://sandbox-b2b.revolut.com/api/1.0/accounts \
  -H "Authorization: Bearer oa_sand_jnZTNIxL7AxSBD21m09D0a8EcsgoVHiCf1bVTpk9Tto"
```

you should get a JSON result like this :

```json
[
  {
    "id": "53f63864-f04f-4555-a417-8d185a82c862",
    "name": "Main",
    "balance": 28600,
    "currency": "GBP",
    "state": "active",
    "public": true,
    "created_at": "2021-12-14T20:20:42.395989Z",
    "updated_at": "2021-12-14T20:20:42.469374Z"
  },
  {
    "id": "ad0fac11-37d0-4e2f-9c22-3f839f3f0503",
    "balance": 0,
    "currency": "GBP",
    "state": "active",
    "public": false,
    "created_at": "2021-12-14T20:20:42.970639Z",
    "updated_at": "2021-12-14T20:20:42.970639Z"
  },
  {
    "id": "af3b959f-2ec4-4147-93e7-3330f2c22247",
    "balance": 0,
    "currency": "GBP",
    "state": "active",
    "public": false,
    "created_at": "2021-12-14T20:20:42.970918Z",
    "updated_at": "2021-12-14T20:20:42.970918Z"
  },
  {
    "id": "181d21e7-ea14-4ac0-8172-091735b1cd76",
    "name": "Business trips",
    "balance": 14700,
    "currency": "USD",
    "state": "active",
    "public": true,
    "created_at": "2021-12-14T20:20:42.395981Z",
    "updated_at": "2021-12-14T20:20:42.486334Z"
  },
  {
    "id": "bd81fcff-cf90-49e0-96a5-b1283ff6943f",
    "name": "Payments",
    "balance": 5300,
    "currency": "AUD",
    "state": "active",
    "public": false,
    "created_at": "2021-12-14T20:20:42.466592Z",
    "updated_at": "2021-12-14T20:20:42.466592Z"
  },
  {
    "id": "81c6b187-bbbf-4fc2-9b9a-4fdb63b2f120",
    "name": "European suppliers",
    "balance": 3490,
    "currency": "EUR",
    "state": "active",
    "public": true,
    "created_at": "2021-12-14T20:20:42.395962Z",
    "updated_at": "2021-12-14T20:20:42.482074Z"
  },
  {
    "id": "acafb2b5-ce41-49b5-805c-78573cdac40a",
    "balance": 0,
    "currency": "EUR",
    "state": "active",
    "public": false,
    "created_at": "2021-12-14T20:20:42.970799Z",
    "updated_at": "2021-12-14T20:20:42.970799Z"
  },
  {
    "id": "c2a38bba-dabb-4579-a15a-75b923b5624c",
    "balance": 0,
    "currency": "USD",
    "state": "active",
    "public": false,
    "created_at": "2021-12-14T20:20:42.970865Z",
    "updated_at": "2021-12-14T20:20:42.970865Z"
  },
  {
    "id": "0ab9ce24-b00a-4c9a-8872-9903518d4cac",
    "balance": 0,
    "currency": "EUR",
    "state": "active",
    "public": false,
    "created_at": "2021-12-14T20:20:42.970934Z",
    "updated_at": "2021-12-14T20:20:42.970934Z"
  },
  {
    "id": "bcf6e9b8-dcb9-4416-a321-8ec90a6f9394",
    "balance": 0,
    "currency": "USD",
    "state": "active",
    "public": false,
    "created_at": "2021-12-14T20:20:42.970950Z",
    "updated_at": "2021-12-14T20:20:42.970950Z"
  }
]
```

We have successfuly made our first API Call to the revolute Server.
