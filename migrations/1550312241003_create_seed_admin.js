require('dotenv').config()
var bcr = require('bcryptjs')
module.exports = {
  'up': `INSERT INTO Admin(FirstName,LastName,Username,Email,Password,Roles) VALUES('${process.env.ADMIN_FNAME}','${process.env.ADMIN_LNAME}','${process.env.ADMIN_USERNAME}','${process.env.ADMIN_EMAIL}','${bcr.hashSync(process.env.ADMIN_PASS, 10)}','${process.env.ADMIN_ROLES}')`,
  'down': `DELETE FROM Admin`
}
