module.exports = {
  'up': `CREATE TABLE ProviderOtp (
        Id int(11) NOT NULL AUTO_INCREMENT,
        Mobile varchar(15) DEFAULT NULL,
        ExtCode varchar(5) DEFAULT NULL,
        OTP int(4) DEFAULT NULL,
        Type varchar(50) DEFAULT NULL,
        Status varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'pending',
        CreateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
  'down': `DROP TABLE ProviderOtp`
}
