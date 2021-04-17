module.exports = {
  'up': `CREATE TABLE StaticPages (
        Id int(11) NOT NULL AUTO_INCREMENT,
        PageName varchar(45) DEFAULT NULL,
        Url varchar(255) DEFAULT NULL,
        HtmlContent longtext,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': `DROP TABLE StaticPages`
}
