const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// 데이터베이스 초기화
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE users (username TEXT, password TEXT, email TEXT)");
});

// body-parser 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // 추가된 부분
app.use(express.static('public'));

// 회원가입 API
app.post('/api/signup', (req, res) => {
    const { username, password, email } = req.body;

    // 이메일 값 확인을 위한 로그 추가
    console.log("Received email:", email);

    const stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?)");
    stmt.run(username, password, email, (err) => {
        if (err) {
            console.error("회원가입 실패:", err);
            res.status(500).send("회원가입 실패");
        } else {
            console.log("회원가입 성공:", { username, email });
            // 회원가입 성공 시 메인 페이지로 리다이렉트
            res.redirect('/');
        }
    });
    stmt.finalize();
});

// 사용자 목록 조회 API
app.get('/api/users', (req, res) => {
    db.all("SELECT username, password, email FROM users", [], (err, rows) => {
        if (err) {
            res.status(500).send("데이터 조회 실패");
        } else {
            // 클라이언트에 이메일을 포함한 사용자 정보를 보냄
            res.json(rows);
        }
    });
});

// 로그인 처리 API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // 요청 데이터 로그 출력
    console.log("Received login request:", { username, password });

    // 데이터베이스에서 사용자 정보를 조회하여 일치하는 사용자가 있는지 확인
    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
        if (err) {
            console.error("로그인 처리 중 오류 발생:", err);
            res.status(500).send("로그인에 실패했습니다.");
        } else {
            if (row) {
                // 일치하는 사용자가 있으면 로그인 성공
                console.log("로그인 성공:", row);
                res.status(200).send("로그인 성공");
            } else {
                // 일치하는 사용자가 없으면 로그인 실패
                console.log("로그인 실패: 사용자 이름 또는 비밀번호가 올바르지 않습니다.");
                res.status(401).send("사용자 이름 또는 비밀번호가 올바르지 않습니다.");
            }
        }
    });
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});