module.exports = {
  'up': `INSERT INTO Language (Id, Name, ShortCode) VALUES 
    (1,'English','default'),
    (2,'Spanish','es'),
    (3,'Arabic','ar'),
    (4,'Portuguese','pt');`,
  'down': `DELETE FROM Language`
}
