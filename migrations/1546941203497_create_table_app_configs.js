module.exports = {
  'up': `CREATE TABLE AppConfig (
      Id int(11) NOT NULL AUTO_INCREMENT,
      FieldName varchar(100) DEFAULT NULL,
      Value varchar(255) DEFAULT NULL,
      Type varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'user',
      CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (Id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
  'down': 'DROP TABLE AppConfig'
}
