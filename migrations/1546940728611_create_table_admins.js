module.exports = {
  'up': `CREATE TABLE Admin (
        Id int(11) NOT NULL AUTO_INCREMENT,
        FirstName varchar(45) DEFAULT NULL,
        LastName varchar(45) DEFAULT NULL,
        Username varchar(255) DEFAULT NULL,
        Email varchar(255) DEFAULT NULL,
        Password varchar(255) DEFAULT NULL,
        Roles int(11) DEFAULT NULL,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE Admin'
}
