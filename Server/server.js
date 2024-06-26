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
  const today = new Date().toISOString().slice(0, 10);
  console.log(today);
  connection.query(
    `SELECT *,CASE 
  WHEN DATE_FORMAT(SIGNUPDATE, '%Y-%m-%d') = ? THEN 1 
  ELSE 0 
END AS today FROM member`,
    [today],
    (err, results, fields) => {
      if (err) {
        res.status(500).send("Server error");
        return;
      }
      console.log(today);
      console.log(results);
      res.json(results);
    }
  );
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
  const loginInfo = req.body;
  console.log(req);
  // 콘솔에 사용자 정보 출력
  console.log("서버에 도착한 사용자 정보:", loginInfo);

  // 사용자 이메일로 회원 여부 확인
  connection.query(
    "SELECT * FROM member WHERE email_id = ?",
    [loginInfo.email],
    (error, results) => {
      if (error) {
        return res.status(500).send("Database query error");
      }
      else if (results.length === 0) {
        return res.status(404).send("회원 정보가 없습니다.");
      }
      const user = results[0];
      if (!user.PASSWORD) {
        // 비밀번호가 비어있는 경우 -> sns 소셜로그인을 통해 회원가입한 경우임
        // 소셜 로그인하라고 정보를 담아서 보내야함
        return res
          .status(400)
          .send("소셜 로그인 계정입니다. 소셜 로그인을 통해 로그인해주세요.");
      } else {
        // 비밀번호 정보가 있는 경우 -> 일반 회원가입한 경우
        if (user.PASSWORD === loginInfo.password) {
          // req 비밀번호와 db 비밀번호가 일치하는 경우 로그인 성공
          return res.status(200).json({ user, message: "로그인 성공" });
        } else {
          // req 비밀번호와 db 비밀번호가 일치하지 않는 경우 로그인 실패
          return res.status(401).send("비밀번호가 일치하지 않습니다.");
        }
      }
    }
  );
});

// 관리자여부 검증
app.get("/api/checkAdmin/:userId", (req, res) => {
  const userId = req.params.userId;

  // 데이터베이스에서 사용자 조회
  const query = "SELECT admin FROM member WHERE email_id = ?";
  connection.query(query, [userId], (error, results, fields) => {
    if (error) {
      return res
        .status(500)
        .json({ success: false, message: "Database error", error: error });
    }

    // 결과가 없을 경우
    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
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
  const repldate = new Date().toISOString().slice(0, 19).replace("T", " ");

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
  connection.query(
    "SELECT * FROM qanda order by writedate desc",
    (err, results, fields) => {
      if (err) {
        res.status(500).send("Server error");
        return;
      }
      res.json(results);
    }
  );
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
    if (results[0]) {
      results = results.map((row) => {
        console.log(row.image_data);
        // row의 다른 필드를 처리하는 로직 (필요한 경우)

        // img_data 필드가 존재하면 Base64 문자열로 변환
        if (row.image_data) {
          row.image_data = row.image_data.toString("base64");
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

app.get('/api/localtourplaces', (req, res) => {
  connection.query(
    'SELECT * FROM localtourplaces ORDER BY likes DESC LIMIT 10',
    (error, results) => {
      if (error) {
        console.error('Error fetching places:', error);
        res.status(500).send('Error fetching places');
      } else {
        res.send(results);
      }
    }
  );
});

app.post('/api/localtourplaces/like', (req, res) => {
  const itemTitle = req.body.title;
  console.log("Received request to update likes for title:", itemTitle);
  console.log(req.body);
  connection.query(
    'UPDATE localtourplaces SET likes = likes + 1 WHERE title = ?',
    [itemTitle],
    (error, results) => {
      console.log(`Query executed. Matched ${results.affectedRows} rows.`);
      if (error) {
        console.error('Error updating likes:', error);
        res.status(500).send('Error updating likes');
      } else if (results.affectedRows === 0) {
        console.log('No rows updated, check the title accuracy and case sensitivity.');
        res.status(404).send('No matching records found');
      } else {
        res.send({ success: true, likes: results.affectedRows });
      }
    }
  );
});

// 간단한 거리 계산 함수
function calculateDistance(base, target) {
  return Math.sqrt(
    Math.pow(base.mapx - target.mapx, 2) + Math.pow(base.mapy - target.mapy, 2)
  );
}
// 여행 인원 스타일/ 동반자 / 일수 받는 부분
// 경기도 관광지 정보를 가져오고 일자별로 그룹화하는 엔드포인트
// 여행 일정 계획 요청 처리
app.post("/api/send-plan", (req, res) => {
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
      console.error("Database query error:", err);
      return res
        .status(500)
        .send({ error: "Database query failed", details: err });
    }
    // 결과를 특정 contenttypeid 값에 따라 필터링하여 일자별로 그룹화
    const groupedResults = [];
    const usedIds = new Set(); // 중복을 피하기 위해 사용된 ID 저장
    for (let i = 0; i < days; i++) {
      const day = [];
      const contentTypes = ["12", "39", "14", "39"]; // 반복 순서
      contentTypes.forEach((type) => {
        const attraction = results.find(
          (r) => r.contenttypeid === type && !usedIds.has(r.contentid)
        );
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
      data: groupedResults,
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
                // console.log(`Results for content type ${query.match(/contenttypeid = '(\d+)'/)[1]} at location ${location}:`);
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
        console.log('Data fetched for each content type:', data);
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
// 클라이언트에서 받은 데이터를 통해 최적 일정 추출
//###############################################################################
app.post('/api/self-plan2', (req, res) => {
  const companions = req.body.companions;
  const days = parseInt(req.body.days, 10);
  const location = req.body.location;
  const contentIds = req.body.selectedItinerary.map(item => item.contentid);
  const sql = `
  SELECT * FROM (
      SELECT *, 'must' AS 필수여부
      FROM LocalTourPlaces LTP
      JOIN RegionCodes RC ON LEFT(LTP.zipcode, 2) = RC.PostalCodePrefix
      WHERE RC.CodeName2 = ? AND LTP.contentid IN (?) AND contenttypeid IN (12,14,28)
      UNION ALL
      SELECT *, 'must_restaurant' AS 필수여부
      FROM LocalTourPlaces LTP
      JOIN RegionCodes RC ON LEFT(LTP.zipcode, 2) = RC.PostalCodePrefix
      WHERE RC.CodeName2 = ? AND LTP.contentid IN (?) AND contenttypeid IN (39)
      UNION ALL
      SELECT *, 'recommended' AS 필수여부
      FROM LocalTourPlaces LTP
      JOIN RegionCodes RC ON LEFT(LTP.zipcode, 2) = RC.PostalCodePrefix
      WHERE RC.CodeName2 = ? AND LTP.contentid NOT IN (?) AND contenttypeid IN (12, 14,28)
      UNION ALL
      SELECT *, 'recommended_restaurant' AS 필수여부
      FROM LocalTourPlaces LTP
      JOIN RegionCodes RC ON LEFT(LTP.zipcode, 2) = RC.PostalCodePrefix
      WHERE RC.CodeName2 = ? AND LTP.contentid NOT IN (?) AND contenttypeid IN (39)
  ) AS combined_results
  ORDER BY addr1
  `;
  connection.query(sql, [location, contentIds, location, contentIds, location, contentIds, location, contentIds], (error, results, fields) => {
      if (error) {
          console.error('Database query error:', error);
          return res.status(500).send({ error: 'Database query failed' });
      }
      const must = [], must_restaurant = [], recommended = [], recommended_restaurant = [];
      results.forEach(row => {
          switch(row.필수여부) {
              case 'must':
                  must.push(row);
                  break;
              case 'must_restaurant':
                  must_restaurant.push(row);
                  break;
              case 'recommended':
                  recommended.push(row);
                  break;
              case 'recommended_restaurant':
                  recommended_restaurant.push(row);
                  break;
          }
      });
      // 일정 배열 생성
      const itineraries = Array.from({ length: days }, () => []);
      let m = 0, mr = 0, r = 0, rr = 0;
      for (let i = 0; i < days; i++) {
          itineraries[i][0] = (m < must.length) ? must[m++] : recommended[r++];
          itineraries[i][1] = (mr < must_restaurant.length) ? must_restaurant[mr++] : recommended_restaurant[rr++];
          itineraries[i][2] = (m < must.length) ? must[m++] : recommended[r++];
          itineraries[i][3] = (mr < must_restaurant.length) ? must_restaurant[mr++] : recommended_restaurant[rr++];
      }
      console.log('Itinerary for each day:', itineraries.map(day => day.map(attr => attr.필수여부 + ': ' + attr.title)));
      res.status(200).send({
          itineraries
      });
      console.log('Response sent to client successfully.');
  });
});
// 여행 인원 스타일/ 동반자 / 일수 받는 부분
// 경기도 관광지 정보를 가져오고 일자별로 그룹화하는 엔드포인트
// 여행 일정 계획 요청 처리
app.post("/api/send-plan", (req, res) => {
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
      console.error("Database query error:", err);
      return res
        .status(500)
        .send({ error: "Database query failed", details: err });
    }
    // 결과를 특정 contenttypeid 값에 따라 필터링하여 일자별로 그룹화
    const groupedResults = [];
    const usedIds = new Set(); // 중복을 피하기 위해 사용된 ID 저장
    for (let i = 0; i < days; i++) {
      const day = [];
      const contentTypes = ["12", "39", "14", "39"]; // 반복 순서
      contentTypes.forEach((type) => {
        const attraction = results.find(
          (r) => r.contenttypeid === type && !usedIds.has(r.contentid)
        );
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
      data: groupedResults,
    });
    console.log(`Sending response to client for location `);
  });
});
// 셀프 추가하는 데이터 송부 코드
//###############################################################################
app.post("/api/self-plan", (req, res) => {
  console.log("Received request:", req.body); // 클라이언트에서 받은 요청의 본문 출력
  const { days, location } = req.body;
  const maxAttractionsPerType = 5; // 각 유형별 최대 관광지 수
  const contentTypes = ["12", "14", "28", "39"];
  const queries = contentTypes.map(
    (type) => `
      SELECT * FROM LocalTourPlaces LTP
      JOIN RegionCodes RC ON LEFT(LTP.zipcode, 2) = RC.PostalCodePrefix
      WHERE RC.CodeName2 = ? AND LTP.contenttypeid = '${type}'
      ORDER BY LTP.visitNo DESC
      LIMIT ${maxAttractionsPerType};
  `
  );
  // 각 쿼리를 실행하고 결과를 저장
  Promise.all(
    queries.map(
      (query) =>
        new Promise((resolve, reject) => {
          connection.query(query, [location], (err, results) => {
            if (err) {
              reject(err);
            } else {
              // 콘솔에 결과의 title과 contenttypeid 출력
              console.log(
                `Results for content type ${
                  query.match(/contenttypeid = '(\d+)'/)[1]
                } at location ${location}:`
              );
              results.forEach((result) => {
                // console.log(`Title: ${result.title}, Content Type ID: ${result.contenttypeid}`);
              });
              resolve(results);
            }
          });
        })
    )
  )
    .then((results) => {
      // 각 타입별 결과를 배열로 반환
      const data = results.flat(); // 결과 배열을 평탄화
      // console.log('Data fetched for each content type:', data);
      // console.log('selfplan 데이터 송부');
      // 클라이언트에 데이터 보내기 전에 로그 추가
      // console.log(`Sending response to client for location ${location} with data:`, data);
      // console.log(`Sending response to client for location `);
      res.send({
        message: `Travel plans generated for ${location} with specified content types.`,
        data: data,
      });
    })
    .catch((error) => {
      console.error("Database query error:", error);
      res.status(500).send({ error: "Database query failed", details: error });
    });
});
// 클라이언트에서 받은 데이터를 통해 최적 일정 추출
//###############################################################################
app.post("/api/self-plan2", (req, res) => {
  const companions = req.body.companions;
  const days = req.body.days;
  const location = req.body.location;
  const contentIds = req.body.selectedItinerary.map((item) => item.contentid);
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
  connection.query(
    sql,
    [location, contentIds, location, contentIds],
    (error, results, fields) => {
      if (error) {
        console.error("Database query error:", error);
        return res.status(500).send({ error: "Database query failed" });
      }
      console.log("Query results:", results);
      res
        .status(200)
        .send({ message: "Data fetched successfully", data: results });
    }
  );
});
app.post('/api/save-plan', (req, res) => {
    const { companions, currentUser, days, endDate, itineraries, location, startDate, style } = req.body;
    const userId = 9999999;  // 무작위 사용자 ID 생성
    const sql = `
        INSERT INTO SCHEDULE (USEREID, REGIONID, REGIONNAME, STARTDAY, ENDDAY)
        VALUES (?, ?, ?, ?, ?);
    `;
    connection.query(sql, [userId, location, location, startDate, endDate], (error, results, fields) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send({ error: 'Database query failed' });
        }
        const scheduleId = results.insertId;  // 생성된 SCHEDULEID
        let queriesCompleted = 0;
        const totalQueries = itineraries.flat().length;
        for (let i = 0; i < itineraries.length; i++) {
            const day = itineraries[i];
            for (let j = 0; j < day.length; j++) {
                const attraction = day[j];
                const sq2 = `
                    INSERT INTO SCHEDULE_DETAIL
                    (SCHEDULEID, NTHDAY, SEQ, USEREID, REGIONID, REGIONNAME, PLACEID, PLACENAME, PLACEADDRESS, MAPX, MAPY, STARTDAY, ENDDAY)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                `;
                connection.query(sq2, [
                    scheduleId, i + 1, j + 1, userId, null, location,
                    attraction.contentid, attraction.title, attraction.addr1,
                    attraction.mapx, attraction.mapy, startDate, startDate
                ], (error, results, fields) => {
                    queriesCompleted++;
                    if (error) {
                        console.error('Inner query error:', error);
                    }
                    if (queriesCompleted === totalQueries) {
                        console.log('All data inserted successfully');
                        res.status(200).send({ message: "Travel plan saved successfully", scheduleId });
                    }
                });
            }
        }
    });
});

//###############################################
app.post('/api/plan-review', (req, res) => {
  const { userID } = req.body;
  const sql = `
  SELECT * FROM SCHEDULE WHERE USEREID = ?
  `;
  // 데이터베이스에서 쿼리 실행
  connection.query(sql, [userID], (error, results) => {
      if (error) {
          console.error('Database query error:', error);
          return res.status(500).send({ error: 'Database query failed' });
      }
      // 쿼리 결과를 콘솔에 로깅
      console.log('Query results:', results);
      // 클라이언트에 결과 전송
      res.send({
          message: `Data retrieved successfully for : ${userID}`,
          data: results
      });
  });
});
//###############################################
app.post('/api/schedule-detail', (req, res) => {
  const { scheduleId } = req.body;
  const sql = `
  SELECT * FROM SCHEDULE_DETAIL WHERE SCHEDULEID = ?
  `;
  // 데이터베이스에서 쿼리 실행
  connection.query(sql, [scheduleId], (error, results) => {
      if (error) {
          console.error('Database query error:', error);
          return res.status(500).send({ error: 'Database query failed' });
      }
      // 쿼리 결과를 콘솔에 로깅
      console.log('Query results:', results);
      // 클라이언트에 결과 전송
      res.send({
          message: `Data retrieved successfully for : ${scheduleId}`,
          data: results
      });
  });
});
//#####################################
// SELECT * FROM SCHEDULE WHERE USEREID = ?
app.post('/api/plan-recall', (req, res) => {
  const lastScheduleId = Object.keys(req.body)[0];
  console.log('lastScheduleId', lastScheduleId);
  const sql = `
      SELECT ltp.*
      FROM LocalTourPlaces ltp
      WHERE ltp.contentid IN (SELECT PLACEID
          FROM SCHEDULE_DETAIL
          WHERE SCHEDULEID = ?
      );
  `;
  connection.query(sql, [lastScheduleId], (error, results) => {
      if (error) {
          console.error('Database query error:', error);
          return res.status(500).send({ error: 'Database query failed' });
      }
      // 쿼리 결과를 콘솔에 로깅
      console.log('Query results:', results);
      // 결과 데이터를 4개씩 그룹화
      let groupedResults = [];
      for (let i = 0; i < results.length; i += 4) {
          groupedResults.push(results.slice(i, i + 4));
      }
      // 클라이언트에 결과 전송
      res.send({
          message: `Data retrieved successfully for : ${lastScheduleId}`,
          data: groupedResults
      });
  });
});