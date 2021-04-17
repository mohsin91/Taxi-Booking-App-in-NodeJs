module.exports = {
  'up': `CREATE TABLE Transaction (
    Id bigint(20) NOT NULL AUTO_INCREMENT,
    UserType varchar(50) DEFAULT NULL,
    Description varchar(255) DEFAULT NULL,
    UserTypeId int(11) DEFAULT NULL,
    Amount decimal(10,2) DEFAULT NULL,
    Type varchar(50) DEFAULT NULL,
    Status varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'pending',
    WithdrawalId int(11) DEFAULT NULL,
    CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': `DROP TABLE Transaction`
}
