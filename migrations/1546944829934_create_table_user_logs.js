module.exports = {
  'up': `CREATE TABLE UserLogs (
        Id int(11) NOT NULL AUTO_INCREMENT,
        action varchar(45) DEFAULT NULL,
        Module varchar(45) DEFAULT NULL,
        data longtext,
        UserId bigint(20) DEFAULT NULL,
        UserDeviceId bigint(20) DEFAULT NULL,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': `DROP TABLE UserLogs`
}
