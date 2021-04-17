module.exports = {
  'up': `CREATE TABLE DocumentType (
    Id int(11) NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    Type varchar(45) DEFAULT NULL,
    FieldName varchar(255) DEFAULT NULL,
    ApplicableTo varchar(45) DEFAULT NULL,
    IsRequired tinyint(1) NOT NULL DEFAULT '1',
    DocType varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
    PRIMARY KEY (Id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': `DROP TABLE DocumentType`
}
