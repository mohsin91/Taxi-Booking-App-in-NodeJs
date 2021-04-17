module.exports = {
  'up': `CREATE TABLE Banner (
        Id bigint(20) NOT NULL AUTO_INCREMENT,
        Title varchar(255) DEFAULT NULL,
        Image_path varchar(255) DEFAULT NULL,
        Description varchar(255) DEFAULT NULL,
        Url varchar(255) DEFAULT NULL,
        Status varchar(255) DEFAULT NULL,
        CreateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(Id)
        ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;`,
  'down': `DROP TABLE Banner`
}
