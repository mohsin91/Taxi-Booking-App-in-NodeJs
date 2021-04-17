module.exports = {
  'up': `CREATE TABLE ProviderLocationUpdate (
  ProviderId int(11) unsigned NOT NULL AUTO_INCREMENT,
  S2CellId varchar(20) DEFAULT NULL,
  Latitude decimal(10,6) DEFAULT NULL,
  Longitude decimal(10,6) DEFAULT NULL,
  Bearing int(11) DEFAULT NULL,
  RideTypeId int(11) DEFAULT '1',
  CreateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  Status varchar(20) DEFAULT 'active',
  PRIMARY KEY (ProviderId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
  'down': `DROP TABLE ProviderLocationUpdate`
}
