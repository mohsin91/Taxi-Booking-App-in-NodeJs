module.exports = {
  'up': `CREATE TABLE Tax (
        Id int(11) NOT NULL AUTO_INCREMENT,
        Name varchar(255) DEFAULT NULL,
        Percentage int(11) DEFAULT NULL,
        CountryId int(11) DEFAULT NULL,
        IsActive varchar(3) DEFAULT NULL,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': `DROP TABLE Tax`
}
