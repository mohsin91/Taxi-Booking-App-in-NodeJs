module.exports = {
  'up': `CREATE TABLE CancellationPolicy (
        Id int(11) NOT NULL AUTO_INCREMENT,
        Description varchar(45) DEFAULT NULL,
        UserType varchar(45) DEFAULT NULL,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE CancellationPolicy'
}
