const express = require("express");
const cors = require("cors"); // cors 설정
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const multer = require("multer");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage(); // 메모리에 파일 저장
const upload = multer({ storage: storage });

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
  connection.query("SELECT * FROM member", (err, results, fields) => {
    if (err) {
      res.status(500).send("Server error");
      return;
    }
    console.log(results);
    res.json(results);
  });
});

// 회원 비활성화(탈퇴)
app.put("/api/member/:email_Id/disable", (req, res) => {
  const emailId = req.params.email_Id;
  const sql = "UPDATE member SET valid = ? WHERE email_Id = ?";

  connection.query(sql, [0, emailId], (error, results) => {
    if (error) {
      return res
        .status(500)
        .send({ message: "Error updating Member", error: error.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: "Member not found" });
    }
    res.status(200).send({ message: "Member disabled successfully" });
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

// 관리자여부 검증
app.get('/api/checkAdmin/:userId', (req, res) => {
  const userId = req.params.userId;

  // 데이터베이스에서 사용자 조회
  const query = 'SELECT admin FROM member WHERE email_id = ?';
  connection.query(query, [userId], (error, results, fields) => {
      if (error) {
          return res.status(500).json({ success: false, message: 'Database error', error: error });
      }

      // 결과가 없을 경우
      if (results.length === 0) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      // 결과가 있는 경우, 관리자 여부 반환
      const isAdmin = results[0].admin === 1; // 가정: isAdmin 컬럼이 비트(0 또는 1)로 저장된 경우
      res.json({ success: true, isAdmin: isAdmin });
  });
});

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
app.put("/api/notice/:postId/disable", (req, res) => {
  const postId = req.params.postId;
  const sql = "UPDATE Notice SET valid = ? WHERE postId = ?";

  connection.query(sql, [0, postId], (error, results) => {
    if (error) {
      return res
        .status(500)
        .send({ message: "Error updating notice", error: error.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: "Notice not found" });
    }
    res.status(200).send({ message: "Notice disabled successfully" });
  });
});

// 1대1게시판 글 작성
app.post("/api/qna/write", (req, res) => {
  const { title, content, writer } = req.body;
  const sql = `INSERT INTO qanda (title, content, writerId) VALUES (?, ?, ?)`;
  connection.query(sql, [title, content, writer], (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(201).send(`Post added with ID: ${results.insertId}`);
  });
});

// 1대1게시판 상세페이지 데이터전달
app.get("/api/qandadetailpage/:postId", (req, res) => {
  const postId = req.params.postId;
  connection.query(
    "SELECT * FROM qanda where postid = ?",
    [postId],
    (err, results, fields) => {
      if (err) {
        res.status(500).send("Server error");
        return;
      }
      console.log(results);
      res.json(results);
    }
  );
});

// 1대1게시판 댓글 작성
app.post("/api/qandadetailpage/:postId/repl", (req, res) => {
  const { replid, replcontent, postId } = req.body;
  const repldate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const sql = `UPDATE qanda SET replid = ?, replcontent = ?, repldate = ? WHERE postid = ?`;
  
  connection.query(
    sql,
    [replid, replcontent, repldate, postId],
    (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      console.log(results);
      res.status(201).send(`repl add`);
    }
  );
});



// 1대1게시판 댓글 수정

app.get("/api/notice", (req, res) => {
  connection.query("SELECT * FROM notice", (err, results, fields) => {
    if (err) {
      res.status(500).send("Server error");
      return;
    }
    console.log(results);
    res.json(results);
  });
});

app.get("/api/qna", (req, res) => {
  connection.query("SELECT * FROM qanda order by writedate desc", (err, results, fields) => {
    if (err) {
      res.status(500).send("Server error");
      return;
    }
    res.json(results);
  });
});

// 어드민 - 여행지 사진 추가
app.post("/api/toursiteimage/add", upload.single("image_data"), (req, res) => {
  // req.body에서 text 데이터를, req.file에서 파일 데이터를 받습니다.
  const { image_name, content } = req.body;
  const image_data = req.file; // 'image_data'는 input의 name 속성과 일치해야 합니다.
  const sql = `INSERT INTO toursiteimage (image_name, content, image_data) VALUES (?, ?, ?)`;
  console.log(req.body, req.file);
  connection.query(
    sql,
    [image_name, content, image_data.buffer],
    (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      console.log(results);
      res.status(201).send(`Post added with ID: ${results.insertId}`);
    }
  );
});

// 어드민 - 여행지 조회
app.get("/api/toursiteimage", (req, res) => {
  connection.query("SELECT * FROM toursiteimage", (err, results, fields) => {
    if (err) {
      res.status(500).send("Server error");
      return;
    }
    if(results[0]) {
      results = results.map(row => {
        console.log(row.image_data);
        // row의 다른 필드를 처리하는 로직 (필요한 경우)
        
        // img_data 필드가 존재하면 Base64 문자열로 변환
        if (row.image_data) {
          row.image_data = row.image_data.toString('base64');
        }
    
        return row;
      });
    }
    res.json(results);
  });
});

app.put("/api/toursiteimage/modify/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE toursiteimage set valid = 0 where id = ?";

  connection.query(sql, [id], (error, results) => {
    if (error) {
      return res
        .status(500)
        .send({ message: "Error updating notice", error: error.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: " not found" });
    }
    console.log(res);
    res.status(200).send({ message: "Update successfully" });
  });
});


// app.post("/api/toursiteimage", (req, res) => {

//   const formatData = req.body;
//   const sql = `INSERT INTO toursiteimage (image_name, content, image_data) VALUES (?, ?, ?)`;
//   console.log(formatData);
//   connection.query(sql, [formatData.image_name, formatData.content, formatData.image_data], (error, results) => {
//     if (error) {
//       return res.status(500).send(error);
//     }
//     console.log(results);
//     res.status(201).send(`Post added with ID: ${results.insertId}`);
//   });

// connection.query(
//   "SELECT * FROM toursiteimage",(err, results, fields) => {
//     if (err) {
//       res.status(500).send('Server error');
//       return;
//     }
//     res.json(results);
//     console.log(results);
//   });
// });

// 간단한 거리 계산 함수
function calculateDistance(base, target) {
    return Math.sqrt(Math.pow(base.mapx - target.mapx, 2) + Math.pow(base.mapy - target.mapy, 2));
}
    // 여행 인원 스타일/ 동반자 / 일수 받는 부분
// 경기도 관광지 정보를 가져오고 일자별로 그룹화하는 엔드포인트
// 여행 일정 계획 요청 처리
app.post('/api/send-plan', (req, res) => {
    const { days, location } = req.body;
    const maxAttractionsPerDay = 5; // 하루 최대 관광지 수 변경
    const query = `
        SELECT *
        FROM LocalTourPlaces LTP
        JOIN RegionCodes RC ON LEFT(LTP.zipcode, 2) = RC.PostalCodePrefix
        WHERE RC.CodeName2 = ?
        ORDER BY LTP.visitNo DESC;
    `;
    connection.query(query, [location], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send({ error: 'Database query failed', details: err });
        }
        // 결과를 특정 contenttypeid 값에 따라 필터링하여 일자별로 그룹화
        const groupedResults = [];
        const usedIds = new Set(); // 중복을 피하기 위해 사용된 ID 저장
        for (let i = 0; i < days; i++) {
            const day = [];
            const contentTypes = ['12', '39', '14','39']; // 반복 순서
            contentTypes.forEach(type => {
                const attraction = results.find(r => r.contenttypeid === type && !usedIds.has(r.contentid));
                if (attraction) {
                    day.push(attraction);
                    usedIds.add(attraction.contentid);
                }
            });
            groupedResults.push(day);
        }
        // console.log('Grouped Results:', groupedResults);
        res.send({
            message: `Travel plans generated for ${location}`,
            data: groupedResults
        });
        console.log(`Sending response to client for location `);
    });
});
 // 셀프 추가하는 데이터 송부 코드
//###############################################################################
app.post('/api/self-plan', (req, res) => {
    console.log('Received request:', req.body); // 클라이언트에서 받은 요청의 본문 출력
    const { days, location } = req.body;
    const maxAttractionsPerType = 5; // 각 유형별 최대 관광지 수
    const contentTypes = ['12', '14', '28', '39'];
    const queries = contentTypes.map(type => `
        SELECT * FROM LocalTourPlaces LTP
        JOIN RegionCodes RC ON LEFT(LTP.zipcode, 2) = RC.PostalCodePrefix
        WHERE RC.CodeName2 = ? AND LTP.contenttypeid = '${type}'
        ORDER BY LTP.visitNo DESC
        LIMIT ${maxAttractionsPerType};
    `);
    // 각 쿼리를 실행하고 결과를 저장
    Promise.all(queries.map(query => new Promise((resolve, reject) => {
        connection.query(query, [location], (err, results) => {
            if (err) {
                reject(err);
            } else {
                // 콘솔에 결과의 title과 contenttypeid 출력
                console.log(`Results for content type ${query.match(/contenttypeid = '(\d+)'/)[1]} at location ${location}:`);
                results.forEach(result => {
                    // console.log(`Title: ${result.title}, Content Type ID: ${result.contenttypeid}`);
                });
                resolve(results);
            }
        });
    })))
    .then(results => {
        // 각 타입별 결과를 배열로 반환
        const data = results.flat(); // 결과 배열을 평탄화
        // console.log('Data fetched for each content type:', data);
        // console.log('selfplan 데이터 송부');
        // 클라이언트에 데이터 보내기 전에 로그 추가
        // console.log(`Sending response to client for location ${location} with data:`, data);
        // console.log(`Sending response to client for location `);
        res.send({
            message: `Travel plans generated for ${location} with specified content types.`,
            data: data
        });
    })
    .catch(error => {
        console.error('Database query error:', error);
        res.status(500).send({ error: 'Database query failed', details: error });
    });
});
 // 클라이언트에서 받은 데이터를 통해 최적 일정 추출
//###############################################################################
app.post('/api/self-plan2', (req, res) => {
    const companions = req.body.companions;
    const days = req.body.days;
    const location = req.body.location;
    const contentIds = req.body.selectedItinerary.map(item => item.contentid);
    // console.log('서버에서 받은 contentId 배열:', contentIds);
    // SQL 쿼리 준비: contentIds 배열을 사용하여 contenttypeid가 '39'인 행만 조회
    const sql =
    // `   SELECT count(*)
    //     FROM LocalTourPlaces
    //     WHERE contentid IN (?) AND contenttypeid = '39';'
    `SELECT required as *
    FROM LocalTourPlaces LTP
    JOIN RegionCodes RC ON LEFT(LTP.zipcode, 2) = RC.PostalCodePrefix
    WHERE RC.CodeName2 = ? AND LTP.contentid IN (?) AND contenttypeid IN (12, 14)
    union all
    SELECT *
    FROM LocalTourPlaces LTP
    JOIN RegionCodes RC ON LEFT(LTP.zipcode, 2) = RC.PostalCodePrefix
    WHERE RC.CodeName2 = ? AND LTP.contentid NOT IN (?) AND contenttypeid IN (12, 14);`;
    // 데이터베이스에서 쿼리 실행
    connection.query(sql, [location, contentIds, location, contentIds], (error, results, fields) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send({ error: 'Database query failed' });
        }
        console.log('Query results:', results);
        res.status(200).send({ message: 'Data fetched successfully', data: results });
    });
});
