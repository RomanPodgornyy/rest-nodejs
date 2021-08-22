# rest-nodejs
This repository contains a small service that implements authorization using JWT tokens and working with files.
## How to install and explore
_Note: Require Node.js and npm package manager._

1. Clone project.
2. In root folder `npm install` or `npm i` to install dependencies.
3. You need to create a Database with `dump.sql` file.
4. Configure your DB connection in `./src/services/database/index.js`
    ```js
    const db = mysql.createConnection({
      host: 'localhost',
      user: 'DB_USER',
      password: 'DB_USER_PASSWORD',
      database: 'DB_NAME',
    });
    ```
5. `npm run dev` to start server. The server will be available at the following address `http://localhost:3000`.

## API Routes
### Authentication

+ `/signin` - `POST` - user authorization with the subsequent issuance of a pair of access tokens.
+ `/signin/new_token` - `POST` - updating the access token using a refresh token.
+ `/signup` - `POST` - registration of a new user with the subsequent issuance of a pair of access tokens.
+ `/logout` - `GET` - sign out.
+ `/info` - `GET` - returns information about the user.

### Working with files

+ `/file/upload` - `POST` - adding a file.
+ `/file/list` - `GET` - getting a list of files.
+ `/file/delete/id` - `DELETE` - deleting the file at the specified `id`.
+ `/file/id` - `GET` - get the file at the specified `id`.
+ `/file/download/id` - `GET` - downloading the file at the specified `id`.
+ `/file/update/id` - `PUT` - updating the file at the specified `id`.