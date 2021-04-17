module.exports = {
  'up': `CREATE TABLE RideTariff (
        Id int(11) NOT NULL AUTO_INCREMENT,
        RideTypeId int(11) DEFAULT NULL,
        RideVechicleTypeId int(11) DEFAULT NULL,
        Distance int(11) DEFAULT NULL,
        MinCharges int(11) DEFAULT NULL,
        MaxCharges int(11) DEFAULT NULL,
        CountryId int(11) DEFAULT NULL,
        LanguageId int(11) DEFAULT NULL,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': `DROP TABLE RideTariff`
}
