module.exports = {
  'up': `CREATE TABLE UserCouponRedeemed (
        Id int(11) NOT NULL AUTO_INCREMENT,
        UserId bigint(20) DEFAULT NULL,
        CouponCode int(11) DEFAULT NULL,
        RedeemedAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdateAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': `DROP TABLE UserCouponRedeemed`
}
