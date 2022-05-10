/* eslint-disable default-case */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const cors = require("cors");
const db = require("./db");
// 设置允许跨域访问该服务
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());

// 登录
app.post("/api/login", (req, res) => {
  // sql查询user表
  console.log(req.body);
  const params = req.body.type || "query";
  db.query(
    `SELECT * FROM user where account = '${req.body.account}'`,
    params,
    function (results, fields) {
      // 以json的形式返回
      res.json({ results });
    }
  );
});
//登陆成功后连表查询信息
app.post("/api/loginInfo", (req, res) => {
  // sql查询user表
  console.log(req.body);
  const params = req.body.type || "query";
  db.query(
    `SELECT
    * 
   FROM
     user, student,employment
   WHERE
     user.account = student.student_id and student.student_id = employment.student_id  and user.account = '${req.body.id}'`,
    params,
    function (results, fields) {
      res.json({ results });
    }
  );
});

app.post("/api", (req, res) => {
  console.log(req.body);
  const params = req.body.type || "query";
  db.query(req.body.sql, params, function (results, fields) {
    // 以json的形式返回
    res.json({ results });
  });
});

app.listen(5000, () => {
  console.log("running in the server...");
});
