# Proof of concept running express with Mongo

Very simple app using `node`, `express`, `mongodb` and docker to demonstrate the use of `docker-compose`.

## Set up application

Run mongo docker container locally to get some seed data in there.
```bash
docker run -d --name odm-mongo -p 27017:27017 -v ~/learn/mongo/db:/data/db mongo
```
The name (here `odm-mongo`) should be the name of your choice.
The volume (here `~\learn\mongo\db`) a folder of your choice on your local machine where the mongo data will be stored.

Initialize some data in mongo:
```bash
# start the mongodb cli
mongo localhost:27017
```
```bash
db.family.insertOne({"name":"olivier","age":46})
db.family.insertOne({"name":"allison","age":44})
# verify that inserted.
db.family.find()
```
Now stop the container.
```bash
docker container ls -filter 'name=odm-mongo'
# copy the id
docker container stop <id>
```

## Run the application locally and manually

This is just to test that everything is working (without docker).

Start mongodb
```bash
docker container start <id>
```
Start express app
```bash
node index.js
```
Test it out in the command line:
```bash
curl http://localhost:3000/
```
It should return a json string with the data that was entered above.

## Run the application using docker compose

Use `docker-compose` to build containers. This will read the instructions from `docker-compose.yml`. Two containers will be running, one with mongodb and one with the frontend web app.

```bash
docker-compose up
```
if you need to rebuild
```bash
docker-compose up --build
```
Test it out in the command line:
```bash
curl http://localhost:3000/
```
It should return a json string with the data that was entered above.