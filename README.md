## INFO:
This is a messaging app, a WhatsApp Web clone, it's made to use in a desktop.
The app is built using Flask for the backend and React for the frontend, 
some of the technologies used are: WebSockets, SQLAlchemy, etc... 
for more info, check the "THINGS LEARNED" file,

<img width="1512" alt="Screenshot 2024-01-15 at 11 50 39 AM" src="https://github.com/Durvalm/WhatsApp-Messenger/assets/89949017/8ec75a87-abc5-40e9-82fe-f77e6657e29e">

<img width="1512" alt="Screenshot 2024-01-15 at 11 50 53 AM" src="https://github.com/Durvalm/WhatsApp-Messenger/assets/89949017/daf13cea-0113-4b09-897d-5c0c4b717064">

<img width="1512" alt="Screenshot 2024-01-15 at 11 51 20 AM" src="https://github.com/Durvalm/WhatsApp-Messenger/assets/89949017/00ad2bf7-a927-4676-b249-e2a7faddcf27">

## THINGS LEARNED AND HOW THE PROJECT WORKS:
https://docs.google.com/document/d/14uWLhuYIhbJCGiCPvgG5RSmLvYCuYLAlfBfwNgvf03s/edit?usp=sharing

## How to use/run the app:
You'll have to run both the backend and frontend of the application in your localhost.
I'll try to simplify later with Docker

## STEPS:
1 - Clone the repository:
```bash
git clone https://github.com/Durvalm/WhatsApp-Messenger
```
2 - Enter the project folder:
```bash
cd WhatsApp-Messenger
```

## Backend config
3 - Enter the backend folder:
```bash
cd backend
```

4 - Create Virtual Environment and Activate it (Mac):
assuming you have python3 installed, if doesn't work,
you can try to remove the "3"
```bash
python3 -m venv venv
source venv/bin/activate
```

5 - Install required dependencies: 
```bash
pip install -r requirements.txt
```

6 - Configure environment variables:
  a - Copy .env.example file contents into new .env file (Mac)
  ```bash
  cp .env.example .env
  ```
  b - Manually go to the .env file and change the settings to include 
  your own postgres database URL, etc. (has to create a postgres database)

7 - Run Migrations
```bash
flask db -m migrate "initial migration"
flask db upgrade
```
8 - Finally Run The Backend
```bash
flask run
```

## Frontend Config
9 - Enter in the frontend folder, open another terminal, go to the WhatsApp-Messenger project and run
```bash
cd frontend
```

10 - Install dependencies (assumes you have npm)
```bash
npm i
```
11 - Runs server
```bash
npm run dev
```

Now you can go to the port where the frontend is running (usually localhost:5173), sign up and use WhatsApp.
