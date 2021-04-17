module.exports = {
  'up': `CREATE TABLE UserDevices (
    Id bigint(20) NOT NULL AUTO_INCREMENT,
    UserId bigint(20) NOT NULL,
    Brand varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
    Model varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
    DeviceId varchar(255) NOT NULL,
    GCMId longtext,
    AccessToken longtext,
    AppVersion varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
    OS varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
    OSVersion varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
    Latitude float(10,6) DEFAULT NULL,
    Longitude float(10,6) DEFAULT NULL,
    SocketId varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
    CreateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdateAt timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Id),
    UNIQUE KEY DeviceId_UNIQUE (DeviceId)
  ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE UserDevices'
}
