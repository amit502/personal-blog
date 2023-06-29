# personal-blog

Personal blog site has been made using React, Node, Express and Sqlite DB. It also uses [React Query](https://www.npmjs.com/package/react-query) for synchronizing data between backend and frontend. Moreover, Jest and react-testing library are used for writing some test cases.

## Running the app

### Backend

The backend uses Node, Express and Sqlite DB. It uses JWT authentication and maintains login through access tokens and refresh tokens.

```
cd server
npm install
npm run seed
npm start

```

### Frontend

The frontend uses React, React Query, Bootstrap, MUI and several other libraries to build the UI.

```
npm install
npm start
```

### Tests

Jest and React testing libray are used to test some components.

```
npm run test

```

Prettier has been used for formatting the files and eslint has been used to enforce JS and Typescript rules. Most of the linter errors and warnings have resolved, while some of them were ignored.

## Personal Blog Features

1. The application is a personal blog site.
2. The blog can be visited by anyone whether they are an authorized/admin user or not.
3. The landing page displays paginated blog cards which are published by the admin user.
4. The blog cards can be clicked to open the detail view with the full content.
5. The admin user can log in.The default credentials are: Email:patelamyt@gmail.com and password: test@123
6. Once the user is logged in, several CRUD options open up. The user can add/update/delete/view detail page / publish/unpublish the blogs. Also, they may add other admin users.
7. Logged in users can view all the published and unpublished blogs, while a user withot credentials can only view published blogs.
8. The blogs are paginated and displayed in descending order of their creted date. The number of blogs displayed per page can be changed using the drop down on the bottom right corner.

## Deployment Details

1. The fronend has been deployed on [Netlify](https://www.netlify.com/)
2. The backend has been deployed on [Render](https://render.com/)
3. The app can be accessed using the public url: (https://main--bespoke-cupcake-cb3162.netlify.app/)

*** Note: The render.com hosting for backend is a free plan and hence it spins down when inactive. If the blogs are not fetched and 'No Blogs!' text is displayed, the backend service needs to be restarted. Please, call at 9843527854 so that I can restart it. ***
