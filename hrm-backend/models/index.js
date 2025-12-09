const User = require('./User');
const Employee = require('./Employee');
const Attendance = require('./Attendance');
const Leave = require('./Leave');
const Payroll = require('./Payroll');
const Performance = require('./Performance');
const Recruitment = require('./Recruitment');
const Applicant = require('./Applicant');

// Define relationships
User.hasOne(Employee, { foreignKey: 'user_id', as: 'employee' });
Employee.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Employee.hasMany(Attendance, { foreignKey: 'employee_id', as: 'attendance' });
Attendance.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee' });

Employee.hasMany(Leave, { foreignKey: 'employee_id', as: 'leaves' });
Leave.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee' });
Leave.belongsTo(User, { foreignKey: 'approved_by', as: 'approver' });

Employee.hasMany(Payroll, { foreignKey: 'employee_id', as: 'payrolls' });
Payroll.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee' });

Employee.hasMany(Performance, { foreignKey: 'employee_id', as: 'performances' });
Performance.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee' });
Performance.belongsTo(User, { foreignKey: 'reviewed_by', as: 'reviewer' });

User.hasMany(Recruitment, { foreignKey: 'posted_by', as: 'postedJobs' });
Recruitment.belongsTo(User, { foreignKey: 'posted_by', as: 'poster' });

Recruitment.hasMany(Applicant, { foreignKey: 'recruitment_id', as: 'applicants' });
Applicant.belongsTo(Recruitment, { foreignKey: 'recruitment_id', as: 'job' });

module.exports = {
  User,
  Employee,
  Attendance,
  Leave,
  Payroll,
  Performance,
  Recruitment,
  Applicant
};

