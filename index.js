const express = require("express");
const app = express();
const cors = require("cors");
const { Productes } = require("./projects/code");
const mongoose = require("mongoose");
app.use(express.json());
app.use(cors());
let {Users} = require("./projects/code")


app.get("/productes", (req, res) => {
    res.json(Productes)
});
app.post("/searchProduct/:id", (req, res) => {
    let data = req.body;
    
    if (data == "" || data == null || data == undefined) {
        return;
    }
    res.status(200).json(Productes.filter((item) => {
        item.id == req.params.id
    }));
})
app.listen(3001, () => {
    console.log("listen 3001");
});

app.get("/users", (req,res) => {
    res.json(Users)
})
app.post("/UsersSignUp", (req, res) => {
    let data = req.body;
    if (data !== null || data !== "" || data != [] || data != {}) {
        if (
            data.email !== null &&
            data.password !== null &&
            data.name !== null &&
            data.rePassword !== null &&
            data.password == data.rePassword &&
            data.email.includes("@") &&
            data.email.includes(".com") &&
            data.password.length >= 6 &&
            data.name.length >= 3 &&
            data.rePassword.length >= 6 
        ) {
            res.status(200).json("successful");
            Users.push(data);
        }
    }
})
app.post("/UsersSignIn", (req, res) => {
    let data = req.body;
    if (data !== null || data !== "" || data != [] || data != {}) {
        if (
            data.email === Users.filter((item) => item.email == data.email)[0].email &&
            data.password === Users.filter((item) => item.password == data.password)[0].password
        ) {
            res.status(200).json(Users.filter((item) => item.email == data.email)[0]);
        }
    }
})