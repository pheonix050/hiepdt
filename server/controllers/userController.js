//const pg = require('pg');

// Connection Pool


const { Client } = require('pg')
const client = new Client({
  user: process.env.DB_USER,
  host:  process.env.DB_HOST,
  database: process.env.DB_NAME,
  password:  process.env.DB_PASS,
  port: 5432,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected pg!");

});

// View Users
exports.view = async (req, res) => {
  // User the connection
  const qr = await client.query('SELECT * FROM fcj_user ORDER BY id ASC')
  const kq = qr.rows;
  //console.log(kq)
   let removedUser = req.query.removed;
    res.render('home', { kq,removedUser });
  // connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
  //   // When done with the connection, release it
  //   if (!err) {
  //     let removedUser = req.query.removed;
  //     res.render('home', { rows, removedUser });
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);
  // });
}

// Find User by Search
exports.find = async(req, res) => {
  /* let searchTerm = req.body.search;
  // User the connection
  connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  }); */
  
   const searchTerm = req.body.search;
   console.log(searchTerm);
   const qr = await client.query('SELECT * FROM fcj_user WHERE first_name LIKE ? ',['%' + searchTerm + '%']);
   const kq = qr.rows;
   console.log(kq);
   let removedUser = req.query.removed;
   res.render('home', { kq,removedUser });
  
}

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new user
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments} = req.body 
  const qr = client.query('INSERT INTO fcj_user (first_name, last_name, email, phone, comments) VALUES ($1, $2, $3, $4, $5)', [first_name, last_name, email, phone, comments]);
  const kq = qr.rows;
  console.log(kq);
  let removedUser = req.query.removed;
    res.render('add-user', { kq, alert: `${first_name} has been created.` });
}


// Edit user
exports.edit = (req, res) => {
  // User the connection
  /* connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  }); */
  const { first_name, last_name, email, phone,comments } = req.body
  const {userid} = req.params.id
  console.log(userid)
    const qr= client.query('UPDATE fcj_user SET first_name = $1, last_name= $2, email= $3, phone= $4,comments= $5 WHERE id = $6',[first_name, last_name, email, phone,comments , userid])
    const kq= qr.rows;
    console.log(kq);
    let removedUser = req.query.removed;
    res.render('edit-user', { kq, alert: `${first_name} has been updated.` });

      }


// Update User
exports.update = (req, res) => {
  const { first_name, last_name, email, phone,comments } = req.body
  const {userid} = req.params
  console.log(userid)
    const qr= client.query('UPDATE fcj_user SET first_name = $1, last_name= $2, email= $3, phone= $4,comments= $5 WHERE id = $6',[first_name, last_name, email, phone,comments , userid])
    const kq= qr.rows;
    console.log(kq);
    let removedUser = req.query.removed;
    res.render('edit-user', { kq, alert: `${first_name} has been updated.` });
  /* // User the connection
  connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  }); */
}

// Delete User
exports.delete = (req, res) => {

  // Delete a record

  // User the connection
  // connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

  //   if(!err) {
  //     res.redirect('/');
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);

  // });

  // Hide a record

  /* connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
    if (!err) {
      let removedUser = encodeURIComponent('User successeflly removed.');
      res.redirect('/?removed=' + removedUser);
    } else {
      console.log(err);
    }
    console.log('The data from beer table are: \n', rows);
  }); */
  const userid = parseInt(req.params.id);
  const qr= client.query('DELETE FROM fcj_user WHERE id = $1', [userid])
  const kq =qr.rows;
  console.log(kq);

}

// View Users
exports.viewall = (req, res) => {

  // User the connection
  const qr= client.query('SELECT * FROM fcj_user WHERE id = $1', [req.params.id])
  const kq = qr.rows;
  console.log(kq)

}