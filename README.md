# CoRe – Consumer Rescue

A product review site in the spirit of irecommend.ru. Browse categories and products, read what other people think, and after you've tried something, share your own review with a rating from 1 to 10.

Built in 2019 as a team project for the Web Development course at Kazakh-British Technical University by Dariya Baibolatova, Gulim Alkenova and Dina Nassyrkhan. Updated in 2026 to run on current versions of Django and Angular.

## Features

- Categories (Health & Beauty, Tech, Tourism, Cinema, Auto, Books) and products in each
- Reviews with a 1–10 rating for every product
- Sign up, log in and log out with token authentication
- Only logged-in users can write reviews; everyone can read them

## Tech stack

| Part | Technology |
| --- | --- |
| Backend | Python, Django 5.2, Django REST Framework, SQLite |
| Frontend | TypeScript, Angular 19, Bootstrap 5 |

## Run it locally

You need Python 3.10+ and Node.js 18.19+ (20 or 22 recommended).

### 1. Backend (port 8000)

```bash
cd demo
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_demo        # sample categories, products and reviews
python manage.py runserver
```

`seed_demo` also creates a demo account: **demo / demo-password-123**.

### 2. Frontend (port 4200)

In a second terminal:

```bash
cd front
npm install
npm start
```

Open http://localhost:4200.

## API

| Method | URL | What it does |
| --- | --- | --- |
| GET | `/categories/` | List categories |
| GET | `/categories/<id>/` | One category |
| GET | `/categories/<id>/products/` | Products in a category (`?name=` to search) |
| GET | `/products/<id>/comments/` | Reviews of a product |
| POST | `/products/<id>/comments/` | Add a review (logged in) |
| POST | `/users/create/` | Sign up |
| POST | `/login/` | Log in, returns a token |
| POST | `/logout/` | Log out |

A Postman collection is in `CoRe.postman_collection.json`.

## Project structure

```
demo/    Django backend (app: main)
front/   Angular frontend
```
