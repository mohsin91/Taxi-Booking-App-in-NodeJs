module.exports = {
  'up': `CREATE TABLE ProviderVehicleDocument (
        Id int(11) NOT NULL AUTO_INCREMENT,
        ProviderId bigint(20) DEFAULT NULL,
        ProviderVehicleId int(11) DEFAULT NULL,
        DocumentTypeId int(11) DEFAULT NULL,
        File varchar(255) DEFAULT NULL,
        Value varchar(100) DEFAULT NULL,
        Status tinyint(1) DEFAULT NULL,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE ProviderVehicleDocument'
}
