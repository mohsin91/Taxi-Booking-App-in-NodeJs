module.exports = {
  'up': `CREATE TABLE AppSlider (
        Id bigint(20) NOT NULL AUTO_INCREMENT,
        Title varchar(45) DEFAULT NULL,
        Description varchar(255) DEFAULT NULL,
        Image varchar(255) DEFAULT NULL,
        Type varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'user',
        CreateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(Id)
        ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;`,
  'down': `DROP TABLE AppSlider`
}
