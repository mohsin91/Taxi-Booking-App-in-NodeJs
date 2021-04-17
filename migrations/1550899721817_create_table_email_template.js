module.exports = {
  'up': `CREATE TABLE EmailTemplate (
	Id int(11) NOT NULL AUTO_INCREMENT,
	KeyWord varchar(50) DEFAULT NULL,
	Type varchar(45) DEFAULT NULL,
	Template longtext,
	CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	Variables json DEFAULT NULL,
	PRIMARY KEY (Id)
  ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
  'down': `DROP TABLE EmailTemplate`
}
