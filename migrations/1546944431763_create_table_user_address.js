module.exports = {
  'up': `CREATE TABLE UserAddress (
        Id bigint(20) NOT NULL AUTO_INCREMENT,
        UserId bigint(20) NOT NULL,
        Name varchar(255) NOT NULL,
        AddressLine1 varchar(255) NOT NULL,
        AddressLine2 varchar(255) NOT NULL,
        AddressLine3 varchar(255) NOT NULL,
        latitude float(10,6) NOT NULL,
        longitude float(10,6) NOT NULL,
        AddressType varchar(255) NOT NULL,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': `DROP TABLE UserAddress`
}
