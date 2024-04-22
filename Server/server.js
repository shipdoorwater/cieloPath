const express = require('express');
const cors = require("cors"); // cors 설정
const app = express();
const bodyParser = require("body-parser");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "qwe123!@#",
  database: "cielo",
});
connection.connect();

app.listen(3000, function () {
    console.log("node Start");
  });


// 공지사항 글 작성
app.post('/api/notice/write', (req, res) => {
    const { title, content, writerId } = req.body;
    const sql = `INSERT INTO notice (title, content, writerId) VALUES (?, ?, ?)`;
    connection.query(sql, [title, content, writerId], (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(201).send(`Post added with ID: ${results.insertId}`);
    });
  });



// 1대1게시판 글 작성
app.post('/api/qna/write', (req, res) => {
    const { title, content, writerId } = req.body;
    const sql = `INSERT INTO qna (title, content, writerId) VALUES (?, ?, ?)`;
    connection.query(sql, [title, content, writerId], (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(201).send(`Post added with ID: ${results.insertId}`);
    });
  });



