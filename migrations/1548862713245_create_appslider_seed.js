module.exports = {
  'up': `INSERT INTO AppSlider (Id, Title, Description, Image, Type, CreateAt, UpdateAt) VALUES
        (1, 'Access to rides, on demand', 'For clear navigation options to cashless payments, the app is desgined to help people get to their destinations.', 'intro_0.png', 'user', '2019-01-30 18:19:53', '2019-02-07 09:52:23'),
        (2, 'Access to rides, on demand', 'For clear navigation options to cashless payments, the app is desgined to help people get to their destinations.', 'intro_1.png', 'user', '2019-01-30 18:19:53', '2019-02-07 09:52:30'),
        (3, 'Access to rides, on demand', 'For clear navigation options to cashless payments, the app is desgined to help people get to their destinations.', 'intro_2.png', 'user', '2019-01-30 18:19:53', '2019-02-07 09:52:35'),
        (4, 'Access to rides, on demand', 'For clear navigation options to cashless payments, the app is desgined to help people get to their destinations.', 'intro_3.png', 'user', '2019-01-30 18:19:53', '2019-02-07 09:52:43'),
        (5, 'Access to rides, on demand', 'For clear navigation options to cashless payments, the app is desgined to help people get to their destinations.', 'intro_0.png', 'provider', '2019-01-30 18:19:53', '2019-02-13 20:09:00'),
        (6, 'Access to rides, on demand', 'For clear navigation options to cashless payments, the app is desgined to help people get to their destinations.', 'intro_1.png', 'provider', '2019-01-30 18:19:53', '2019-02-13 20:09:07'),
        (7, 'Access to rides, on demand', 'For clear navigation options to cashless payments, the app is desgined to help people get to their destinations.', 'intro_2.png', 'provider', '2019-01-30 18:19:53', '2019-02-13 20:09:10'),
        (8, 'Access to rides, on demand', 'For clear navigation options to cashless payments, the app is desgined to help people get to their destinations.', 'intro_3.png', 'provider', '2019-01-30 18:19:53', '2019-02-13 20:08:45');`,
  'down': `DELETE FROM AppSlider`
}
