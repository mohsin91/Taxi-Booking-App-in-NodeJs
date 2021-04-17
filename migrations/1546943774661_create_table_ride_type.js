module.exports = {
  'up': `CREATE TABLE RideType (
        Id int(11) NOT NULL AUTO_INCREMENT,
        Name varchar(45) DEFAULT NULL,
        Description varchar(255) DEFAULT NULL,
        CountryId json DEFAULT NULL,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE RideType'
}
