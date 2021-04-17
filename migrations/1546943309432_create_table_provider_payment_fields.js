module.exports = {
  'up': `CREATE TABLE ProviderPaymentFields (
        Id int(11) NOT NULL AUTO_INCREMENT,
        FieldName varchar(45) DEFAULT NULL,
        IsMandatory varchar(3) DEFAULT NULL,
        CountryId int(11) DEFAULT NULL,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE ProviderPaymentFields'
}
