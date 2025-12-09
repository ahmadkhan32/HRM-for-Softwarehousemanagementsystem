const { sequelize } = require('../config/db');
const { User, Employee, Attendance, Leave, Payroll, Performance, Recruitment } = require('../models');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ alter: false });
    console.log('✅ Database synced');

    // Create Admin User
    console.log('🌱 Seeding admin user...');
    const [adminUser] = await User.findOrCreate({
      where: { email: 'admin@hrm.com' },
      defaults: {
        email: 'admin@hrm.com',
        password: 'admin123',
        role: 'admin',
        is_active: true
      }
    });
    console.log('✅ Admin created (email: admin@hrm.com, password: admin123)');

    // Create Manager User
    console.log('🌱 Seeding manager user...');
    const [managerUser] = await User.findOrCreate({
      where: { email: 'manager@hrm.com' },
      defaults: {
        email: 'manager@hrm.com',
        password: 'manager123',
        role: 'manager',
        is_active: true
      }
    });
    console.log('✅ Manager created (email: manager@hrm.com, password: manager123)');

    // Create Employee Users
    console.log('🌱 Seeding employee users...');
    const employeeData = [
      {
        email: 'employee1@hrm.com',
        password: 'employee123',
        employee: {
          employee_id: 'EMP-001',
          first_name: 'John',
          last_name: 'Doe',
          phone: '1234567890',
          department: 'Development',
          position: 'Software Developer',
          joining_date: '2024-01-15',
          salary: 50000
        }
      },
      {
        email: 'employee2@hrm.com',
        password: 'employee123',
        employee: {
          employee_id: 'EMP-002',
          first_name: 'Jane',
          last_name: 'Smith',
          phone: '0987654321',
          department: 'HR',
          position: 'HR Specialist',
          joining_date: '2024-02-01',
          salary: 45000
        }
      }
    ];

    for (const empData of employeeData) {
      const [user] = await User.findOrCreate({
        where: { email: empData.email },
        defaults: {
          email: empData.email,
          password: empData.password,
          role: 'employee',
          is_active: true
        }
      });

      await Employee.findOrCreate({
        where: { user_id: user.id },
        defaults: {
          user_id: user.id,
          ...empData.employee
        }
      });
    }
    console.log(`✅ Created ${employeeData.length} employees`);

    console.log('\n✅ Database seeding completed!');
    console.log('\n📝 Login Credentials:');
    console.log('Admin: admin@hrm.com / admin123');
    console.log('Manager: manager@hrm.com / manager123');
    console.log('Employee: employee1@hrm.com / employee123');
    console.log('Employee: employee2@hrm.com / employee123');

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

