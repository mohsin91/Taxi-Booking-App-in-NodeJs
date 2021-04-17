module.exports = {
  'up': `CREATE TABLE RideTypeLanguage (
        Id int(11) NOT NULL AUTO_INCREMENT,
        LanguageId int(11) DEFAULT NULL,
        Name varchar(255) DEFAULT NULL,
        RideTypeId int(11) DEFAULT NULL,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': `DROP TABLE RideTypeLanguage`
}
