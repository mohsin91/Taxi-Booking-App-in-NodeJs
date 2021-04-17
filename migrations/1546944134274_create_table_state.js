module.exports = {
  'up': `CREATE TABLE State (
        Id int(11) NOT NULL AUTO_INCREMENT,
        CountryId int(11) DEFAULT NULL,
        ShortCode varchar(45) DEFAULT NULL,
        StateName varchar(45) UNIQUE DEFAULT NULL,
        IsActive varchar(3) DEFAULT NULL,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': `DROP TABLE State`
}
