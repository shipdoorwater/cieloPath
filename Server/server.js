const express = require("express");
const cors = require("cors"); // cors 설정
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

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
// 현재 member 테이블 전송
app.get("/api/member", (req, res) => {
  connection.query(
    "SELECT * FROM member",(err, results, fields) => {
      if (err) {
        res.status(500).send('Server error');
        return;
      }
      console.log(results);
      res.json(results);
    });
  });



// 회원 비활성화(탈퇴)
app.put('/api/member/:email_Id/disable', (req, res) => {
  const emailId = req.params.email_Id;
  const sql = 'UPDATE member SET valid = ? WHERE email_Id = ?';

  connection.query(sql, [0, emailId], (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Error updating Member', error: error.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Member not found' });
    }
    res.status(200).send({ message: 'Member disabled successfully' });
  });
});




// 카카카오 로그인 및 회원가입
app.post("/api/kakao", (req, res) => {
  const userInfo = req.body;

  // 콘솔에 사용자 정보 출력
  console.log("서버에 도착한 사용자 정보:", userInfo);

  // 사용자 이메일로 회원 여부 확인
  connection.query(
    "SELECT * FROM member WHERE email_id = ?",
    [userInfo.email],
    (error, results) => {
      if (error) {
        return res.status(500).send("Database query error");
      }

      if (results.length > 0) {
        // 회원 정보가 데이터베이스에 존재하는 경우
        res.status(200).send("로그인 성공!");
      } else {
        // 새 회원 정보 데이터베이스에 추가
        connection.query(
          "INSERT INTO member (email_id, nickname) VALUES (?, ?)",
          [userInfo.email, userInfo.nickname],
          (error, results) => {
            if (error) {
              return res.status(500).send("Database insertion error");
            }
            res.status(201).send("회원 등록 성공!");
          }
        );
      }
    }
  );
});

// 이메일 검증
app.get("/api/check-email", (req, res) => {
  const email = req.query.email;
  connection.query(
    "SELECT * FROM member WHERE email_id = ?",
    [email],
    (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Database query error" });
      }
      res.json({ isAvailable: results.length === 0 });
    }
  );
});

// 이메일 회원가입
app.post("/api/registerbyemail", (req, res) => {
  const userInfo = req.body;

  // 콘솔에 사용자 정보 출력
  console.log("서버에 도착한 사용자 정보:", userInfo);

  // 사용자 이메일로 회원 여부 확인
  connection.query(
    "SELECT * FROM member WHERE email_id = ?",
    [userInfo.email],
    (error, results) => {
      if (error) {
        return res.status(500).send("Database query error");
      }
      // 결과가 있으면, 이미 해당 이메일로 등록된 회원이 존재
      if (results.length > 0) {
        return res.status(409).send("이메일이 이미 사용 중입니다."); // 409 Conflict 상태 코드
      }
      // 새 회원 정보 데이터베이스에 추가
      connection.query(
        "INSERT INTO member (email_id, name, nickname, password, phonenumber) VALUES (?, ?, ?, ?, ?)",
        [
          userInfo.email,
          userInfo.userName,
          userInfo.nickName,
          userInfo.password,
          userInfo.phoneNumber,
        ],
        (error, results) => {
          if (error) {
            return res.status(500).send("Database insertion error");
          }
          res.status(201).send("회원 등록 성공!");
        }
      );
    }
  );
});

// 이메일 로그인
app.post("/api/loginbyemail", (req, res) => {
  const userInfo = req.body;

  // 콘솔에 사용자 정보 출력
  console.log("서버에 도착한 사용자 정보:", userInfo);

  // 사용자 이메일로 회원 여부 확인
  connection.query(
    "SELECT * FROM member WHERE email_id = ?",
    [userInfo.email],
    (error, results) => {
      if (error) {
        return res.status(500).send("Database query error");
      }

      if (results.length > 0) {
        // 회원 정보가 데이터베이스에 존재하는 경우
        res.status(200).send("로그인 성공!");
      } else {
        // 새 회원 정보 데이터베이스에 추가
        connection.query(
          "INSERT INTO member (email_id, nickname) VALUES (?, ?)",
          [userInfo.email, userInfo.nickname],
          (error, results) => {
            if (error) {
              return res.status(500).send("Database insertion error");
            }
            res.status(201).send("회원 등록 성공!");
          }
        );
      }
    }
  );
});

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

// 공지사항 글 작성
app.post("/api/notice/write", (req, res) => {
  const { title, content } = req.body;
  const sql = `INSERT INTO notice (title, content) VALUES (?, ? )`;
  connection.query(sql, [title, content], (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(201).send(`Post added with ID: ${results.insertId}`);
  });
});


// 공지사항 글 삭제(비활성화)
app.put('/api/notice/:postId/disable', (req, res) => {
  const postId = req.params.postId;
  const sql = 'UPDATE Notice SET valid = ? WHERE postId = ?';

  connection.query(sql, [0, postId], (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Error updating notice', error: error.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Notice not found' });
    }
    res.status(200).send({ message: 'Notice disabled successfully' });
  });
});



// 1대1게시판 글 작성
app.post("/api/qna/write", (req, res) => {
  const { title, content, writerId } = req.body;
  const sql = `INSERT INTO qanda (title, content, writerId) VALUES (?, ?, ?)`;
  connection.query(sql, [title, content, writerId], (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(201).send(`Post added with ID: ${results.insertId}`);
  });
});

// 1대1게시판 댓글 작성

// 1대1게시판 댓글 수정



  app.get("/api/notice", (req, res) => {
  connection.query(
    "SELECT * FROM notice",(err, results, fields) => {
      if (err) {
        res.status(500).send('Server error');
        return;
      }
      console.log(results);
      res.json(results);
    });
  });

  app.get("/api/qna", (req, res) => {
    connection.query(
      "SELECT * FROM qanda",(err, results, fields) => {
        if (err) {
          res.status(500).send('Server error');
          return;
        }
        res.json(results);
      });
    });
  