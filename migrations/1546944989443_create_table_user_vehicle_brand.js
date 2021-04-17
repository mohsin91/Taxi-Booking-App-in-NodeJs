module.exports = {
  'up': `CREATE TABLE VehicleBrand (
        Id int(11) NOT NULL AUTO_INCREMENT,
        BrandName varchar(45) UNIQUE DEFAULT NULL,
        CountryId json DEFAULT NULL,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': `DROP TABLE VehicleBrand`
}
