module.exports = {
  'up': `CREATE TABLE AdminRoles (
        Id int(11) NOT NULL AUTO_INCREMENT,
        RoleName varchar(45) DEFAULT NULL,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE AdminRoles'
}
