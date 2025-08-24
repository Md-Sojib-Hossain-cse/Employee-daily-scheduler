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

## Current Roles

1. admin
2. hr
3. employee

# Auth validation only applied on analytics

Admin Email : admin@gmail.com
Admin Password : adminadmin

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

## Employee Routes :

1. create employee : baseApi/employee/create-employee (POST)

```
{
  "userId": "68ab0d3871eb3b9855172330",
  "department": "Developer",
  "position": "Frontend Developer",
  "skills": ["React", "TypeScript", "Tailwind CSS"],
  "location": "Dhaka, Bangladesh",
  "availability": [
    {
      "dayOfWeek": 1,
      "start": "09:00",
      "end": "17:00"
    },
    {
      "dayOfWeek": 3,
      "start": "10:00",
      "end": "18:00"
    }
  ],
  "hireDate": "2025-08-24",
  "employmentType": "full-time"
}
```

2. update employee : baseApi/employee/update-employee/:employeeId (PATCH)

```
{
  "department": "Developer",
  "position": "Backend Developer",
  "skills": [
            "Express",
            "TypeScript",
            "MongoDB"
        ]
}
```

3. get all employee : baseApi/employee (GET)

4. get single employee : baseApi/employee/:employeeId (GET)

5. delete an employee : baseApi/employee/:employeeId (DELETE)

## Shift Routes :

1. create shift : baseApi/shift/create-shift (POST)

```
{
  "day": "2025-08-26T00:00:00.000Z",
  "start": "08:00",
  "end": "16:00",
  "role": "Backend Developer",
  "skillRequired": ["Express" , "MongoDB"],
  "location": "Warehouse #3",
  "assignedEmployee": [],
  "recurringPatterns": "weekly"
}

```

2. assign employee : baseApi/shift/:shiftId/assign (PUT)

```
{
    "employeeId" : "68ab120cae09c0b6a6d38c0b"
}
```

3. get all shift : baseApi/shift (GET)

4. get single shift : baseApi/employee/:shiftId (GET)

5. delete a shift : baseApi/employee/:shiftId (DELETE)

## Time off Routes :

1. create time off request : baseApi/time-off/create-time-off (POST)

```
{
  "employee": "68ab120cae09c0b6a6d38c0b",
  "start": "2025-08-28T09:00:00.000Z",
  "end": "2025-08-30T17:00:00.000Z",
  "reason": "Family event",
  "status": "pending"
}
```

2. update time off : baseApi/time-off/:timeOffId/update (PATCH)

```
{
  "status": "approved"
}
```

3. get all time off : baseApi/time-off (GET)

## Analytics Routes :

1. get coverage : baseApi/analytics/coverage?day=2025-08-25 (GET)

2. get workload : baseApi/analytics/workload?startDay=2025-08-24&endDay=2025-08-30 (GET)

3. get conflicts : baseApi/analytics/conflicts?day=2025-08-25 (GET)

## Developed by :

Name : MD Sojib Hossain
Email : sojibhossain.cse@gmail.com
