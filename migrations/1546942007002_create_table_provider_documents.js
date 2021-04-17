module.exports = {
  'up': `CREATE TABLE ProviderDocuments (
    id int(11) NOT NULL AUTO_INCREMENT,
    DocTypeId int(11) NOT NULL,
    ProviderId bigint(20) NOT NULL,
    Value varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
    Status varchar(10) NOT NULL,
    File varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
    CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;`,
  'down': 'DROP TABLE ProviderDocuments'
}
