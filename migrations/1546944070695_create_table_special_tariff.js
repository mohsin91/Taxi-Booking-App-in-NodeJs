module.exports = {
  'up': `CREATE TABLE SpecialTariff (
        Id int(11) NOT NULL AUTO_INCREMENT,
        Name varchar(255) DEFAULT NULL,
        Distance int(11) DEFAULT NULL,
        MinCharge int(11) DEFAULT NULL,
        MaxCharge int(11) DEFAULT NULL,
        FromHours time DEFAULT NULL,
        ToHours time DEFAULT NULL,
        RideTypeId int(11) DEFAULT NULL,
        CountryId int(11) DEFAULT NULL,
        RideVechicleTypeId int(11) DEFAULT NULL,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE SpecialTariff'
}
