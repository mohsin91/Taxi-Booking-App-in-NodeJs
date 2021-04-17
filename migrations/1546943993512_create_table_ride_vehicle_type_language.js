module.exports = {
  'up': `CREATE TABLE RideVehicleTypeLanguage (
        Id int(11) NOT NULL AUTO_INCREMENT,
        LanguageId int(11) DEFAULT NULL,
        RideVechileType int(11) DEFAULT NULL,
        Name varchar(45) DEFAULT NULL,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': `DROP TABLE RideVehicleTypeLanguage`
}
