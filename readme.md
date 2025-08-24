# Employee daily schedule management platform

This is a backend service for managing employee schedules, shifts, and coverage. It supports employees, shifts, time-off requests, and analytics for conflict detection and coverage.

Live link : https://daily-scheduler-seven.vercel.app

## Project Setup

```
# Clone repository
git clone https://github.com/Md-Sojib-Hossain-cse/Employee-daily-scheduler.git
cd employee-daily-scheduler

# Install dependencies
npm install

# Set environment variables (.env)

NODE_ENV=production
PORT=5000
DATABASE_URL=mongodb+srv://admin:Admin25500@cluster0.ysd6vth.mongodb.net/daily_scheduler?retryWrites=true&w=majority&appName=Cluster0
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=e9f3fd12e521b4b7499f92f3d7fff142c4f2e37312cada49b5b3826a35edc8eb79c5c2a0dcf1e82c869203a29362aae1188e571
0125f35e03adc6cf59f978c07

# Run project
npm run dev

```

## System Diagram :

Link : https://lucid.app/lucidchart/8b25fb22-0967-40d3-b7be-9a5b93e11334/edit?viewport_loc=497%2C-528%2C3223%2C1352%2C0_0&invitationId=inv_9f0fad94-411b-4b6e-ae2f-92fa62a2fed5

## Api and Data models :

Base Api : https://daily-scheduler-seven.vercel.app/api/v1

## Auth Routes :

1. create user : baseApi/auth/register (POST)

```
{
  "name": "MD Sojib Hossain",
  "email": "test10@gmail.com",
  "password": "adminadmin",
  "role": "employee"
}
```

2. login user : baseApi/auth/login (POST)

```
{
  "email": "admin@gmail.com",
  "password": "adminadmin"
}
```

3. logout user : baseApi/auth/logout/:id (POST)
