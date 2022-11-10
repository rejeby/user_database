const queries = {
  createUser: (name, email, password) => {
    return `INSERT IGNORE users
            (name, email, password)
                VALUES
                    ("${name}", "${email}", "${password}");`;
  },

  userCheckCreds: (email, password) => {
    return `SELECT id
                FROM users
                        WHERE
                            email = "${email}"
                                AND password ="${password}";`;
  },

  //login route
  userAddToken: (user_id, token) => {
    return `INSERT INTO logins
                (user_id, token)
                    VALUES
                        ("${user_id}", "${token}");`;
  },

  //logout route
  removeToken: (token) => {
    return `DELETE FROM logins
                WHERE token="${token}"`;
  },

  //read route
  getUser: (token) => {
    return `SELECT name, email, users.entry_date FROM users 
                JOIN logins
                    ON users.id = logins.user_id
                        WHERE token = "${token}";`;
  },

  //deletes the user identified by token,
  //but deleting the orphaned token still needs to be handled by cron job
  userDelete: (token) => {
    return `DELETE users FROM users 
                JOIN logins
                    ON users.id = logins.user_id
                        WHERE token = "${token}";`;
  },

  updateUser: (token, column, value) => {
    return `UPDATE users
                JOIN logins
                    ON users.id = logins.user_id
                        SET ${column} = "${value}"
                            WHERE token = "${token}";`;
  },

  checkToken: (token) => {
    return `SELECT users.id
                FROM users
                    JOIN logins
                        ON users.id = logins.user_id
                            WHERE token = "${token}";`;
  },
};

module.exports = queries;
