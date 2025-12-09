# 🔐 ITMS Login Credentials - ALL PASSWORDS

## ⚠️ IMPORTANT: Super Admin Not in Database
The `superadmin@itms.com` account does NOT exist in your current database.  
**To create it, run:** `cd backend && npm run seed`

---

## ✅ ACTUAL USERS IN YOUR DATABASE (10 users)

### 👨‍💼 Admin ✅ EXISTS
- **Email:** `admin@itms.com`
- **Password:** `admin123`
- **Role:** `admin`
- **Access:** System administration, user management, departments

---

### 📊 Project Manager ✅ EXISTS
- **Email:** `manager@itms.com`
- **Password:** `manager123`
- **Role:** `manager` (Note: stored as "manager" not "project_manager")
- **Access:** Project oversight, supervisor management

---

### 👨‍🏫 Supervisors ✅ ALL EXIST

#### Supervisor 1 (Frontend Development)
- **Email:** `supervisor1@itms.com`
- **Password:** `supervisor123`
- **Role:** `supervisor`
- **Field:** Frontend Development
- **Permissions:** view_interns, approve_submissions, assign_tasks

#### Supervisor 2 (Mobile Development)
- **Email:** `supervisor2@itms.com`
- **Password:** `supervisor123`
- **Role:** `supervisor`
- **Field:** Mobile Development
- **Permissions:** view_interns, approve_submissions, assign_tasks

#### Supervisor 3 (Networking)
- **Email:** `supervisor3@itms.com`
- **Password:** `supervisor123`
- **Role:** `supervisor`
- **Field:** Networking
- **Permissions:** view_interns, approve_submissions

---

### 👔 Employee ✅ EXISTS
- **Email:** `employee@itms.com`
- **Password:** `employee123`
- **Role:** `employee`
- **Access:** Operational tasks, attendance reports

---

### 🎓 Interns ✅ ALL EXIST

#### Intern 1 (Frontend Development)
- **Email:** `intern1@itms.com`
- **Password:** `intern123`
- **Role:** `intern`
- **Program:** Frontend Development
- **Supervisor:** supervisor1@itms.com
- **Schedule:** 10:00 AM - 4:00 PM
- **Grace Period:** 15 minutes

#### Intern 2 (Frontend Development)
- **Email:** `intern2@itms.com`
- **Password:** `intern123`
- **Role:** `intern`
- **Program:** Frontend Development
- **Supervisor:** supervisor1@itms.com
- **Schedule:** 9:00 AM - 5:00 PM
- **Grace Period:** 15 minutes

#### Intern 3 (Mobile Development)
- **Email:** `intern3@itms.com`
- **Password:** `intern123`
- **Role:** `intern`
- **Program:** Mobile Development
- **Supervisor:** supervisor2@itms.com
- **Schedule:** 10:00 AM - 6:00 PM
- **Grace Period:** 15 minutes

#### Intern 4 (Networking)
- **Email:** `intern4@itms.com`
- **Password:** `intern123`
- **Role:** `intern`
- **Program:** Networking
- **Supervisor:** supervisor3@itms.com
- **Schedule:** 9:00 AM - 5:00 PM
- **Grace Period:** 15 minutes

---

## 📋 Quick Reference Table

| Role | Email | Password | Status |
|------|-------|----------|--------|
| ~~Super Admin~~ | ~~`superadmin@itms.com`~~ | ~~`superadmin123`~~ | ❌ NOT IN DB |
| Admin | `admin@itms.com` | `admin123` | ✅ EXISTS |
| Project Manager | `manager@itms.com` | `manager123` | ✅ EXISTS |
| Supervisor | `supervisor1@itms.com` | `supervisor123` | ✅ EXISTS |
| Supervisor | `supervisor2@itms.com` | `supervisor123` | ✅ EXISTS |
| Supervisor | `supervisor3@itms.com` | `supervisor123` | ✅ EXISTS |
| Employee | `employee@itms.com` | `employee123` | ✅ EXISTS |
| Intern | `intern1@itms.com` | `intern123` | ✅ EXISTS |
| Intern | `intern2@itms.com` | `intern123` | ✅ EXISTS |
| Intern | `intern3@itms.com` | `intern123` | ✅ EXISTS |
| Intern | `intern4@itms.com` | `intern123` | ✅ EXISTS |

**Total Users in Database:** 10 (Super Admin missing - run seed to create)

---

## 🚀 Access URLs

- **Frontend:** http://localhost:3001 (or http://localhost:3000 if available)
- **Backend API:** http://localhost:5000/api
- **Login Page:** http://localhost:3001/login

---

## ⚠️ Important Notes

1. All passwords are hashed using bcrypt in the database
2. These are default credentials - change them in production!
3. All users are set to `isActive: true` by default
4. Interns have specific check-in/check-out schedules enforced
5. Supervisors are assigned to specific departments/fields

---

## 🔄 To Reset/Seed Database

Run the seed script to create all users:
```bash
cd backend
npm run seed
```

This will create all users with the credentials listed above.

