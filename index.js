const express = require('express') // express moduledmf rkwudha
const app = express() // function을 이용하여 새로운 express app을 만들고
const port = 5000 // 백서버로 둘 포함
const bodyParser = require('body-parser'); // 3. bodyParser를 가져와 줌
const cookieParser = require('cookie-parser');
 
const config = require('./config/key');

const { User } = require("./models/User"); // 1. User 데이터를 가져와 줘야 함

//application/x-www-form-urlencoded <- 이렇게 된 데이터를 분석하여 가져와줌, body-parser에 옵션 줌
app.use(bodyParser.urlencoded({extended: true})); 

//application/json <- 이런 데이터를 분석하여 가져와 줌.
app.use(bodyParser.json());
app.use(cookieParser());


const mongoose = require('mongoose');
const res = require('express/lib/response');
mongoose.connect(config.mongoURI, {
useNewUrlParser: true, useUnifiedTopology: true //useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
 .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World! hello haha'))

app.post('/register', (req, res) => {

    // 회원가입할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.

    const user = new User(req.body) // 2. 인스턴스를 만들어 줌. req.body : id, password등 정보 들어있음 bodyParser통해서
    console.log(user,"user!");
    user.save((err, userInfo) => { //save <- mongoDB에서 오는 메소드. 정보들이 userModel에 저장됨, 에러 발생 시 json형식으로 변환  
        if(err) return res.json({success: false, err}) // json형식으로 에러가 있을 경우 전달
        return res.status(200).json({ // status(200)은 성공했다는 뜻
            success: true
        })
    }) //user 정보들이 저장됨
})

app.post('/login', (req, res) => {

    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
    }) 
})


user.comparePassword(req.body.password, (err, isMatch) => {
    if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

        //비밀번호까지 맞다면 토큰 생성하기
        user.generateToken(err, user) => {
            if(err) return res.status(400).send(err);

            // 토큰을 저장한다. 어디에? 
            res.cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id })
        } 
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

