module.exports = {
  'up': `CREATE TABLE PeekCharges (
  Id bigint(20) NOT NULL AUTO_INCREMENT,
  Name varchar(50) DEFAULT NULL,
  Type varchar(50) DEFAULT NULL,
  Week json DEFAULT NULL,
  Day date DEFAULT NULL,
  StartTime time DEFAULT NULL,
  EndTime time DEFAULT NULL,
  Fare varchar(255) DEFAULT NULL,
  MinAmount decimal(10,2) DEFAULT NULL,
  MaxAmount decimal(10,2) DEFAULT NULL,
  Status varchar(255) DEFAULT NULL,
  CreateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
  'down': `DROP TABLE PeekCharges`
}
