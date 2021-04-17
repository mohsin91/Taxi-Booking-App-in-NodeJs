module.exports = {
  'up': `CREATE TABLE Language (
        Id int(11) NOT NULL AUTO_INCREMENT,
        Name varchar(45) DEFAULT NULL,
        ShortCode varchar(45) DEFAULT NULL,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE Language '
}
