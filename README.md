# YardGrown Documentation

## Tech Stack

### Back-End

- Node.js, Express.js
- MongoDB, Mongoose

### Front-End

- React, Redux
- Tailwind CSS

## Database Structure

This project uses MongoDB as the back-end database. There are two collections, `User` and `Listing`. As one user can have multiple listings, the `_id` field of a user is stored as the `userRef` in a listing to establish the relationship.

### Schema Design

![YardGrown Schema Design](/images/yg-schema-design.svg)

## User Authentication

The YardGrown app uses cookie-based JSON Web Token (JWT) and Google firebase authentication.

- Auth controller functions: `/server/controllers/auth.controller.js`

## API Endpoints

### Authentication

| Method | Endpoint           | Parameter                      |
| ------ | ------------------ | ------------------------------ |
| `POST` | /api/auth/sign-up  | username, email, password      |
| `POST` | /api/auth/sign-in  | email<br>password              |
| `GET`  | /api/auth/sign-out | none                           |
| `POST` | /api/auth/google   | displayName<br>email<br>avatar |

### User

| Method   | Endpoint               | Parameter                         |
| -------- | ---------------------- | --------------------------------- |
| `POST`   | /api/user/update/:id   | username, email, password, avatar |
| `DELETE` | /api/user/delete/:id   | none                              |
| `GET`    | /api/user/listings/:id | none                              |

### Listing

| Method   | Endpoint                  | Parameter    |
| -------- | ------------------------- | ------------ |
| `GET`    | /api/listing/retrieve     | query string |
| `GET`    | /api/listing/retrieve/:id | none         |
| `POST`   | /api/listing/create       | form data    |
| `POST`   | /api/listing/update/:id   | form data    |
| `DELETE` | /api/listing/delete/:id   | none         |

#### Query string

- `keywords`: string
- `category`: string
- `city`: string
- `delivery`: boolean
- `pickup`: boolean
- `sort`: 'createdAt' or 'price'
- `order`: 'asc' of 'desc'
- `limit`: number
- `startIndex`: number

## UI Design

### Colours

| Background                                                         | Core                                                               | Accent                                                             | Special                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| ![#FDFAF6](https://placehold.co/12x12/FDFAF6/FDFAF6.png) `#FDFAF6` | ![#ABC4AA](https://placehold.co/12x12/ABC4AA/ABC4AA.png) `#ABC4AA` | ![#ABC4AA](https://placehold.co/12x12/C4D5C3/C4D5C3.png) `#C4D5C3` | ![#C2BEB9](https://placehold.co/12x12/C2BEB9/C2BEB9.png) `#C2BEB9` |
| ![#FFFFFF](https://placehold.co/12x12/FFFFFF/FFFFFF.png) `#FFFFFF` | ![#FAF1E6](https://placehold.co/12x12/FAF1E6/FAF1E6.png) `#FAF1E6` | ![#778977](https://placehold.co/12x12/778977/778977.png) `#778977` | ![#D57E7E](https://placehold.co/12x12/D57E7E/D57E7E.png) `#D57E7E` |
|                                                                    | ![#A9907E](https://placehold.co/12x12/A9907E/A9907E.png) `#A9907E` | ![#F3DEBA](https://placehold.co/12x12/F3DEBA/F3DEBA.png) `#F3DEBA` |                                                                    |
|                                                                    | ![#675D50](https://placehold.co/12x12/675D50/675D50.png) `#675D50` |                                                                    |                                                                    |

### Typefaces

| Usage          | Family      | Style   | Size |
| -------------- | ----------- | ------- | ---- |
| Display title  | `Quicksand` | medium  | 30px |
| Card title     | `Quicksand` | bold    | 18px |
| Button text    | `Quicksand` | medium  | 16px |
| Paragraph text | `Quicksand` | regular | 16px |
| Footer text    | `Quicksand` | light   | 14px |

## Pages

| Path              | Page                     |
| ----------------- | ------------------------ |
| `/`               | home page                |
| `/about`          | about YardGrown          |
| `/market`         | all listings             |
| `/lsiting/:id`    | a single listing         |
| `/mylistings/:id` | all listings of a user   |
| `/create-listing` | create a new listing     |
| `/edit-listing`   | edit an existing listing |
| `/profile/:id`    | profile of an user       |
| `/sign-up`        | sign up page             |
| `/sign-in`        | sign in page             |
