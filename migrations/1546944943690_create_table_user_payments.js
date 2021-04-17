module.exports = {
  'up': `CREATE TABLE UserPayment (
        Id int(11) NOT NULL,
        UserId bigint(20) DEFAULT NULL,
        PaymentType varchar(45) DEFAULT NULL,
        Data varchar(45) DEFAULT NULL,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': `DROP TABLE UserPayment`
}
