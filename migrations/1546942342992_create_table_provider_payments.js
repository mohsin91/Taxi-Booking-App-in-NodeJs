module.exports = {
  'up': `CREATE TABLE ProviderPayment (
        Id bigint(20) NOT NULL AUTO_INCREMENT,
        ProviderPaymentFieldId int(11) DEFAULT NULL,
        Value varchar(255) DEFAULT NULL,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        ProviderId bigint(20) DEFAULT NULL,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE ProviderPayment'
}
