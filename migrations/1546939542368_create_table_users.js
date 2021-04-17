module.exports = {
  'up': `CREATE TABLE Users (
    Id bigint(20) NOT NULL AUTO_INCREMENT,
    FirstName varchar(255) NOT NULL,
    LastName varchar(255) NOT NULL,
    Image varchar(255) DEFAULT NULL,
    Email varchar(255) NOT NULL,
    Mobile varchar(15) NOT NULL,
    Password varchar(255) DEFAULT NULL,
    ExtCode varchar(5) DEFAULT NULL,
    CountryId varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
    LoginType varchar(255) NOT NULL,
    IsMobileVerified tinyint(1) DEFAULT NULL,
    IsEmailVerified tinyint(1) DEFAULT NULL,
    Status varchar(10) DEFAULT NULL,
    WalletId bigint(20) DEFAULT NULL,
    Rating decimal(2,1) DEFAULT NULL,
    StripeCustomerID varchar(255) DEFAULT NULL,
    SocialToken varchar(255) DEFAULT NULL,
    Language varchar(255) DEFAULT NULL,                
    CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Id),
    UNIQUE KEY Email (Email),
    UNIQUE KEY Mobile (Mobile),
    UNIQUE KEY WalletId (WalletId)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
  'down': `DROP TABLE Users`
}
