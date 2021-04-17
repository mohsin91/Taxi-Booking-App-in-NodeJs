module.exports = {
  'up': `CREATE TABLE Wallet (
    Id bigint(20) NOT NULL AUTO_INCREMENT,
    UserTypeId bigint(11) DEFAULT NULL,
    UserType varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
    CurrencyId bigint(20) DEFAULT NULL,
    Secret varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
    Balance decimal(10,2) NOT NULL DEFAULT '0.00',
    CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Id)
  ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;`,
  'down': `DROP TABLE Wallet`
}
