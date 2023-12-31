import mysql from "mysql";
import cors from "cors";
import express from "express";
import "dotenv/config";
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL database in clever cloud
// const db = mysql.createConnection({
//   host: "bbilwoqg4l9vaqaluiee-mysql.services.clever-cloud.com",
//   user: "u12pizxdgxmtviog",
//   password: "u12pizxdgxmtviog",
//   database: "bbilwoqg4l9vaqaluiee",
// });

// console.log(process.env.DB_HOST);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.NAME,
});

app.get("/catgories", (req, res) => {
  const q = "select * from catgories";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
    }

    return res.json(data);
  });
});

app.get("/card", (req, res) => {
  const q = "select * from card";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
    }

    return res.json(data);
  });
});

app.get("/card/:cat", (req, res) => {
  const q = "select * from card where cat=?";
  const cat = req.params.cat;
  db.query(q, [cat], (err, data) => {
    if (err) {
      console.log(err);
    }

    return res.json(data);
  });
});

app.get("/card/search/:qu", (req, res) => {
  const q = "select * from card where title like ? ";
  const title = req.params.qu;
  db.query(q, ["%" + title + "%"], (err, data) => {
    if (err) {
      console.log(err);
    }

    return res.json(data);
  });
});

app.get("/card/id/:id", (req, res) => {
  const q = "select * from card where id=? ";
  const id = req.params.id;
  db.query(q, [id], (err, data) => {
    if (err) {
      res.json("err");
    }

    return res.json(data);
  });
});

app.delete("/card/:id", (req, res) => {
  const q = "DELETE FROM card WHERE id = ? ";
  const id = req.params.id;
  db.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
    }

    return res.json(data);
  });
});

app.post("/card", (req, res) => {
  const q = "INSERT INTO card (`title`, `img`, `cat`, `tokken`) VALUES (?)";
  const values = [req.body.title, req.body.img, req.body.cat, req.body.tokken];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
    }

    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
