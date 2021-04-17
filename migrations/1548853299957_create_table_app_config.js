module.exports = {
  'up': `INSERT INTO AppConfig (Id, FieldName, Value, Type, CreateAt, UpdateAt)
    VALUES
        (1, 'AUTH_TYPE', 'PWD', 'user', '2019-01-28 13:00:34', '2019-02-13 12:56:35'),
        (2, 'OTP_TIMER', '60', 'user', '2019-01-29 19:23:08', '2019-02-13 12:56:37'),
        (3, 'MAP_API_KEY', 'AIzaSyDy4YDcrHfTyCRV_IVjlBj8TvIkNLK3hVo', 'user', '2019-02-04 15:27:37', '2019-02-13 12:56:39'),
        (4, 'AUTH_TYPE', 'PWD', 'provider', '2019-01-28 13:00:34', '2019-02-13 20:05:11'),
        (5, 'OTP_TIMER', '60', 'provider', '2019-01-29 19:23:08', '2019-02-13 20:42:00'),
        (6, 'MAP_API_KEY', 'AIzaSyDy4YDcrHfTyCRV_IVjlBj8TvIkNLK3hVo', 'provider', '2019-02-04 15:27:37', '2019-02-13 20:05:18');`,
  'down': 'DELETE FROM AppConfig'
}
