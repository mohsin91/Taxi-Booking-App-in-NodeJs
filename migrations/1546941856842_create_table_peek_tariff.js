module.exports = {
  'up': `CREATE TABLE PeekTariff (
        Id int(11) NOT NULL AUTO_INCREMENT,
        FromTime time DEFAULT NULL,
        ToTime time DEFAULT NULL,
        MinCharges int(11) DEFAULT NULL,
        MaxCharges int(11) DEFAULT NULL,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE PeekTariff'
}
