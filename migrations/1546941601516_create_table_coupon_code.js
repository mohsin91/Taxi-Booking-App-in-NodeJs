module.exports = {
  'up': `CREATE TABLE CouponCode (
        Id bigint(20) NOT NULL AUTO_INCREMENT,
        Discount DECIMAL(10, 2) NOT NULL DEFAULT '0.00',
        Type varchar(255) DEFAULT NULL,
        Name varchar(255) DEFAULT NULL,        
        Coupon varchar(255) DEFAULT NULL,        
        Status varchar(255) DEFAULT NULL,
        Threshold INT NOT NULL DEFAULT '0',
        MinValueToRedeem INT NOT NULL DEFAULT '0',
        MaxValueToRedeem INT NOT NULL DEFAULT '0',
        RedeemableType varchar(255),
        ValidFrom date NOT NULL,
        ValidTo date NOT NULL,
        CreateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(Id)
        ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;`,
  'down': `DROP TABLE CouponCode`
}
