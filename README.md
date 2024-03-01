
# Love Recipe

This is a Recipe sharing Backend Project


![Logo](https://th.bing.com/th/id/OIP.Ze16jwR8GSm6HEQUOF7JBQAAAA?rs=1&pid=ImgDetMain)


## Tech Stack

**Server:** Node, Express

**Database:** MongoDb


## Authors

- [@github](https://github.com/Samiran2004)

- [@linkdin](www.linkedin.com/in/samiransamanta)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DATABASE_URI`

`CLOUD_NAME`

`CLOUD_API_KEY`

`CLOUD_API_SECRET`

`JWT_SECRET_KEY`

`NODEMAILER_USERNAME`

`NODEMAILER_PASSWORD`
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## links

```bash
  Signup a new User:- POST https://recipe-sharing-app-fm3y.onrender.com/api/user/signup
```

```bash
  login a User:- POST https://recipe-sharing-app-fm3y.onrender.com/api/user/login
  body:- email, password
```

```bash
  Update user detials:- POST https://recipe-sharing-app-fm3y.onrender.com/api/user/update
  body:- {
    fullname: {},
    phone: {},
  }
```

```bash
  Get user detials:- GET https://recipe-sharing-app-fm3y.onrender.com/api/user/get-user-dets
  Bearer Token is required
```

```bash
  Send OTP:- POST https://recipe-sharing-app-fm3y.onrender.com/api/user/otp
  body:- {
    "email": `Valid email`
  }
```

```bash
  Verify Otp & Change password:- PUT https://recipe-sharing-app-fm3y.onrender.com/api/user/change-password
  body:- {
    "email": `Valid email`,
    "otp": "OTP",
    "newpassword": "abcd"
  }
```

```bash
  Create new recipe:- POST https://recipe-sharing-app-fm3y.onrender.com/api/recipe/create
  form-data:[recipeimages,recipename,ingredients,description,type]
  Bearer Token is required
```

```bash
  Get all recipes:- GET https://recipe-sharing-app-fm3y.onrender.com/api/recipe/get-all?page={enter page}&limit={enter a limit}
```

```bash
  Get all recipes by type:- GET https://recipe-sharing-app-fm3y.onrender.com/api/recipe/get-all-type?page=1&limit=2&type=pizza
```

```bash
  Update a recipe:- PATCH https://recipe-sharing-app-fm3y.onrender.com/api/recipe/update/{:recipeId}
  Bearer token is required
```

```bash
  Delete a recipe:- PATCH https://recipe-sharing-app-fm3y.onrender.com/api/recipe/delete/{:recipeId}
  Bearer token is required
```