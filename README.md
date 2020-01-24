# Potion Social NodeJS Twitter like

This example built with Node.js, shows you how you can use [Potion Social API](https://potion.social/ "Potion Social API") to build a twitter like stream. It is a really basic app allowing you to post a status, list them, like them, delete them and change your current user session.

## Install

`npm install`

## Configure

Open `example.env` and fill it with your Potion Social Credentials, if you do not own credentials, create a free account on [Potion Social API Builder](https://api.potion.social/ "Potion Social API Builder").

Final `.env` file should look a bit like this :

```
# General config
NODE_ENV="development"
NODE_PORT=3000

# Potion Social API config
POTION_API_URL="https://mynetwork.potion.social"
POTION_API_KEY="982Y5kshdbflKHLKD-DHfsjf"
POTION_API_SECRET="bxfMKJHFShjdkhè8ukhj"
```

Once done, rename the file to `.env` and run the app.

## Run

`npm run potion`

## Extend

Do not hesitate to extend this example or to send us your application using Potion Social API.
