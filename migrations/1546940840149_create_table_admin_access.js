module.exports = {
  'up': `CREATE TABLE AdminAccess (
        Id int(11) NOT NULL AUTO_INCREMENT,
        Modules varchar(45) DEFAULT NULL,
        Roles varchar(45) DEFAULT NULL,
        HasAccess varchar(3) DEFAULT 'No',
        AdminId int(11) DEFAULT NULL,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE AdminAccess'
}
