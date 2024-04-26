const express = require('express');
const app = express();

// 규칙이다.
// app.get('/' function(req,res){})
// npm install cors 이거 하고 아래 코드 입력
const cors = require('cors'); 
//cors 설정이다.
app.use(cors()); 
// 모든 클라이언트에서의 접속을 허용한다는 의미. 
console.log('포인트 체크');

const bodyParser = require('body-parser');
//const bodyParser = require('body-parser'); 라인은 Node.js 어플리케이션에서 body-parser 라이브러리를 사용하기 위해 모듈을 가져오는 구문

const mysql = require('mysql2');
// npm install mysql2  이거 설치 해야 함. 

console.log('포인트 체크');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306, //mysql의 기본 포트
    user: 'gangnam',
    // root는 모든 권한이 있음(다른 계정 삭제 권한까지) 이에 왠만하면 root 권한 부여 하지 않음.
    password: 'qwe123!@#',
    database: 'Cielo',
})

console.log('포인트 체크');

connection.connect(err => {
    if (err) {

        console.error('MySQL 연결 에러: ' + err.message);
        console.error(err.stack); // 에러 스택 트레이스 추가
        return;
    }
    console.log("MySQL 연결 성공");
});

console.log('포인트 체크');

app.use(bodyParser.json());
// JSON 타입의 데이터를 파싱하기 위해 설정
app.use(bodyParser.urlencoded({extended:true}));
// URL 인코딩 데이터를 파싱하기 위해 설정
// ========================================

// POST 요청 처리

console.log('포인트 체크');



const port = 3000;
app.listen(port, () => {
    console.log(`서버 실행 중 http://192.168.0.78:${port}`);
});


app.post('/query', (req, res) => {
    // post인데 클라이언트에서 get으로 보내서 계속 오류남 
    console.log('areaBasedListDB 도착');
    console.log(req.body);

    const items = Object.values(req.body);
    let query = `INSERT INTO LocalTourPlaces (addr1, addr2, areacode, booktour, cat1, cat2, cat3, contentid, contenttypeid, createdtime, firstimage, firstimage2, cpyrhtDivCd, mapx, mapy, mlevel, modifiedtime, sigungucode, tel, title, zipcode) VALUES ?`;

    let values = items.map(item => [
        item.addr1, item.addr2, item.areacode, item.booktour, item.cat1, item.cat2, item.cat3, item.contentid,
        item.contenttypeid, item.createdtime, item.firstimage, item.firstimage2, item.cpyrhtDivCd,
        item.mapx, item.mapy, item.mlevel, item.modifiedtime, item.sigungucode, item.tel, item.title, item.zipcode
    ]);

    connection.query(query, [values], (err, result) => {
        if (err) {
            console.error("데이터 삽입 에러:", err);
            res.status(500).send("데이터베이스 삽입 실패");
        } else {
            console.log("데이터 삽입 성공:", result);
            res.send("데이터 삽입 성공");
        }
    });
});

// app.get('/query', (req, res) => {
//     console.log('test');
//     res.send('hello world');
// })