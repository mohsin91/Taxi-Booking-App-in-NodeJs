module.exports = {
  'up': `CREATE TABLE Cities (
      Id int(11) NOT NULL AUTO_INCREMENT,
      CountryId int(11) DEFAULT NULL,
      StateId int(11) DEFAULT NULL,
      CityName varchar(45) DEFAULT NULL,
      IsActive varchar(3) DEFAULT NULL,
      PRIMARY KEY (Id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
  'down': 'DROP TABLE Cities'
}
