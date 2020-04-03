# MERN

## MongoDB | Express | React | Node.js

You can use Docker Compose to install MongoDB locally.
To do this run this commandes at the root directory

- docker-compose up --build -d mongodb
- docker-compose up

To access MongoDB console shell, you can use **`> docker exec it mongodb bash`**

This repo uses yarn workspaces
https://classic.yarnpkg.com/en/docs/workspaces/

To install all the packages, please run (at the root folder):

- yarn install

## Backend (Node.js | Express | MongoDB)

- yarn start
- open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Frontend (React | Formik | Material-UI)

- yarn start
- open [http://localhost:8000](http://localhost:8000) to view it in the browser. You can change the **port** in the /frontend/.env file
