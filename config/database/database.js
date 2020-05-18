const mysql = require('mysql');
require('dotenv').config();

/*                                        Queries                                                 */
const dbSql = 'CREATE DATABASE IF NOT EXISTS matcha';
const matchaUsersSql = `CREATE TABLE IF NOT EXISTS matcha.matcha_users(
  user_id int(11) NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(100) NOT NULL,
  firstname varchar(100),
  lastname varchar(100),
  gender varchar(10),
  sexualPreference varchar(10),
  bibliography varchar(250),
  active int(2) NOT NULL
)`;
const interestsSql = `CREATE TABLE IF NOT EXISTS matcha.interests(
  interest_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  interestName varchar(50)
)`;
const picturesSql = `CREATE TABLE IF NOT EXISTS matcha.pictures(
  picture_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id int(11) NOT NULL,
  profilePic int(2)
)`;
const roomsSql = `CREATE TABLE IF NOT EXISTS matcha.rooms(
  room_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  participant_1 varchar(50) NOT NULL,
  participant_2 varchar(50) NOT NULL,
  msg varchar(255),
  date_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
)`;
const messagesSql = `CREATE TABLE IF NOT EXISTS matcha.messages(
  msg_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  room_id int(11) NOT NULL,
  from_participant varchar(50) NOT NULL,
  to_participant varchar(50) NOT NULL,
  msg varchar(255)
)`;

/*                                        End of Queries                                          */


const con = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    socketPath: process.env.DB_SOCKETPATH,
    multipleStatements: true
  }
);

con.connect((connectErr) => {
  if (connectErr) {
    console.log(`${connectErr} `)
    throw connectErr;
  }

  con.query(dbSql, (dbMatchaErr) => {
    if (dbMatchaErr) throw dbMatchaErr;

    console.info('Database created');

    con.query('USE matcha');

    con.query(
      `${matchaUsersSql};
      ${interestsSql};
      ${picturesSql};
      ${roomsSql};
      ${messagesSql}`,
      (matchaUsersErr) => {
        if (matchaUsersErr) throw matchaUsersErr;
        console.info('Tables created');
      }
    );
  });
});

module.exports = con;
