# Database Setup Guide

## Automatic Database Creation

The system now **automatically creates the database** if it doesn't exist when you start the server.

## Manual Setup (Optional)

If you prefer to create the database manually:

### Option 1: Using the Script
```bash
npm run setup-db
```

### Option 2: Using phpMyAdmin
1. Open phpMyAdmin (http://localhost/phpmyadmin)
2. Click "New" to create a database
3. Name it: `hrm_db`
4. Collation: `utf8mb4_unicode_ci`
5. Click "Create"

### Option 3: Using MySQL Command Line
```sql
CREATE DATABASE hrm_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Troubleshooting

### Error: "Unknown database 'hrm_db'"
**Solution:** The database will be created automatically on server start. Make sure:
- MySQL (XAMPP) is running
- Database credentials in `.env` are correct

### Error: "Access denied for user"
**Solution:** Check your MySQL credentials in `hrm-backend/.env`:
```env
DB_USER=root
DB_PASSWORD=  # Leave empty if no password
```

### Error: "Can't connect to MySQL server"
**Solution:** 
1. Make sure XAMPP MySQL is running
2. Check if MySQL is running on port 3306
3. Verify `DB_HOST=localhost` in `.env`

## After Database Creation

Once the database is created, run the seed script to populate initial data:

```bash
npm run seed
```

This will create:
- Admin user (admin@hrm.com / admin123)
- Manager user (manager@hrm.com / manager123)
- Employee users
- Sample data

## Verify Connection

The server will automatically:
1. Create database if it doesn't exist
2. Connect to the database
3. Create all tables
4. Start the server

You should see:
```
✅ Connected to MySQL server
✅ Database 'hrm_db' created or already exists
✅ MySQL connection established successfully.
📊 Connected to database: hrm_db
✅ Database models synchronized
🚀 HRM Server running on port 5000
```

