const express = require('express');
const cors = require("cors"); // cors 설정
const app = express();
const bodyParser = require("body-parser");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// const mysql = require("mysql2");
// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "qwe123!@#",
//   database: "cielo",
// });
// connection.connect();

app.listen(3000, function () {
    console.log("node Start");
  });

  app.post('/api/userinfo', (req, res) => {
    const userInfo = req.body;
  
    // 콘솔에 사용자 정보 출력
    console.log('서버에 도착한 사용자 정보:', userInfo);
  
    // 클라이언트에 응답 보내기
    res.status(200).send('사용자 정보를 성공적으로 받았습니다.');
  });
  
const axios = require('axios');

// // 로그인 검증
// app.get('/login', async (req, res) => {
//   const code = req.query.code; // 인가 코드 추출
//   try {
//     const response = await axios.post('https://kauth.kakao.com/oauth/token', null, {
//       params: {
//         grant_type: 'authorization_code',
//         client_id: 'c875ede1bee7c0255072cedc1a16fced',
//         redirect_uri: 'http://localhost:8080/kakao-callback',
//         code: code,
//       },
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     });
//     const accessToken = response.data.access_token;
//     // 액세스 토큰을 사용하여 사용자 정보 요청 등의 다음 단계 처리
//   } catch (error) {
//     console.error('Access Token Error', error.response.data);
//   }
// });




// // 공지사항 글 작성
// app.post('/api/notice/write', (req, res) => {
//     const { title, content, writerId } = req.body;
//     const sql = `INSERT INTO notice (title, content, writerId) VALUES (?, ?, ?)`;
//     connection.query(sql, [title, content, writerId], (error, results) => {
//       if (error) {
//         return res.status(500).send(error);
//       }
//       res.status(201).send(`Post added with ID: ${results.insertId}`);
//     });
//   });

// // 공지사항 글 수정



// // 1대1게시판 글 작성
// app.post('/api/qna/write', (req, res) => {
//     const { title, content, writerId } = req.body;
//     const sql = `INSERT INTO qna (title, content, writerId) VALUES (?, ?, ?)`;
//     connection.query(sql, [title, content, writerId], (error, results) => {
//       if (error) {
//         return res.status(500).send(error);
//       }
//       res.status(201).send(`Post added with ID: ${results.insertId}`);
//     });
//   });



