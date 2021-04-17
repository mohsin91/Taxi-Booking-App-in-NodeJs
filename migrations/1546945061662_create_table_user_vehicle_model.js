module.exports = {
  'up': `CREATE TABLE VehicleModel (
        Id int(11) NOT NULL AUTO_INCREMENT,
        VehicleBrandId int(11) DEFAULT NULL,
        ModelName varchar(45) DEFAULT NULL,
        VehicleType varchar(45) DEFAULT NULL,
        PowerBy varchar(45) DEFAULT NULL,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': `DROP TABLE VehicleModel`
}
