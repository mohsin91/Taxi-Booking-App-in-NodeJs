module.exports = {
  'up': `CREATE TABLE RideVehicleType (
          Id int(11) NOT NULL AUTO_INCREMENT,
          RideTypeId int(11) DEFAULT NULL,
          Name varchar(45) DEFAULT NULL,
          IconPassive longtext,
          IconActive longtext,
          CountryId int(11) DEFAULT NULL,
          StateIds json DEFAULT NULL,
          CityIds json DEFAULT NULL,
          BaseCharge decimal(10,2) DEFAULT NULL,
          MinCharge decimal(10,2) DEFAULT NULL COMMENT 'As per KM',
          CurrencyType varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
          CommissionPercentage int(11) DEFAULT NULL,
          WaitingCharge decimal(10,2) DEFAULT NULL,
          Capacity int(1) DEFAULT NULL,
          CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
          ShortDesc varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
          LongDesc varchar(255) DEFAULT NULL,
          IsActive varchar(255) DEFAULT NULL,        
          PRIMARY KEY (Id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': `DROP TABLE RideVehicleType`
}
