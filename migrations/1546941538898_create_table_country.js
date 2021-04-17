module.exports = {
  'up': `CREATE TABLE Country (
        Id int(11) NOT NULL AUTO_INCREMENT,
        CountryName varchar(45) UNIQUE DEFAULT NULL,
        ShortCode varchar(45) DEFAULT NULL,
        CurrenyName varchar(255) DEFAULT NULL,
        CurrencyShortCode varchar(255) DEFAULT NULL,
        CurrencySymbol varchar(255) DEFAULT NULL,
        CurrenyValue float DEFAULT NULL,
        CountryFlagImage varchar(255) DEFAULT NULL,
        IsDefault varchar(3) DEFAULT NULL,
        IsActive varchar(3) DEFAULT NULL,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE Country'
}
