module.exports = {
  'up': `CREATE TABLE AdminLogs (
        Id int(11) NOT NULL AUTO_INCREMENT,
        action varchar(45) DEFAULT NULL,
        Module varchar(45) DEFAULT NULL,
        data longtext,
        AdminId int(11) DEFAULT NULL,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': 'Drop Table AdminLogs'
}
