# CT main API 개발 가이드 문서

# API 구조

- Modules :
    - 모든 각기 모듈이 이 디렉토리 안에 존재
    - DB_moudle : 데이터베이스 연결 쿼리 모듈
        - DB_getdata.js : DB에 데이터를 요청하는 메소드 모음
        - DB_postdata.js : DB에 데이터를 생성 및 수정하는 메소드 모음
        - DB_info.js : 사용할 DB 선택
            - 이 파일의 module.export  를 통해 로컬, AWS 등 사용할 DB 선택 가능
        - DB_test.js : DB 접속 테스트용 쿼리 메소드 모음
    - EV_moudle : 이벤트 관련 모듈, 이벤트 수신 및 발생
        - Router : 이벤트 수신 (URL 라우터)
            - v1/swagger :  swagger Docs 페이지 라우터
                - “xxxx/v1” 로 연결되는 라우터
            - LR_Router : 리더관련 이벤트 수신
                - “xxxx/leader” 로 연결되는 라우터
            - UR_Router : 유저관련 이벤트 수신
                - “xxxx/user” 로 연결되는 라우터
            - SU_Router : 구독관련 이벤트 수신
                - “xxxx/sub” 로 연결되는 라
            - TR_Router : 거래관련 이벤트 수신
                - “xxxx/trade” 로 연결되는 라
            - TEST_Router : 테스트 관련 이벤트 수신
                - “xxxx/test” 로 연결되는 라
        - Trigger : 이벤트 발생 (알람, 챗봇 등)
            - TR_app_autotrade.js : 알람 메세지 메서드
            - TR_testbot.js : 챗봇 메서드
    - LR_moudle : 리더 관련 모듈
        - LR_getleader : 리더 정보 요청
    - SU_moudle : 구독 관련 모듈
        - SU_getleader : 구독 정보 요청
    - TR_moudle : 거래 관련 모듈
        - TR_getleader : 거래 정보 요청
        - TR_postleader : 거래 정보 생성
    - UR_moudle : 유저 관련 모듈
        - UR_getleader : 유저 정보 요청
        - UR_postleader : 유저 정보 생성

# 데이터 흐름

1. app.js
    - 여기에 var app = express(); 로 express app 생성
    - 라우터 xxxRouter 를 통해 라우터 파일을 import
        - ex)   var UR_Router = require('./moudes/EV_module/router/UR_Router');
    - app.use()를 통해 url 요청과 라우터 연결 (1차 url)
        - ex) app.use('/user',UR_Router);

1. 라우터 
    - 1차 url (유저, 리더, 구독, 거래, 테스트) 에서 2차 기능 url로 분기 처리
    - express.router 사용
    - 여기서 모듈을 사용하여 기능 구성
    - 예시 : 회원가입 (’http://xxxx/user/new’)
    
    ```jsx
    // 회원가입 이벤트 라우터
    // xxx:3000/user에서 post로 회원가입시 작동
    router.post('/new', async function(req, res, next) {
        
        data = req.body;
        console.log(req.body)
        res.statusCode = 200;
        res.end('ok');
    
        // 받은 데이터 확인
        console.log(`EV data: ${JSON.stringify(data)}`);
        
        // 받은 데이터를 UR모듈의 함수에 전달
        ur_userpost.user_signup(data);
    });
    ```
    

1. 기능 모듈
    - 라우터에 호출되어 해당 기능을 중간에서 처리
    - 데이터 전처리 및 관련 기능을 분할 하기위해 사용
    - 예시 - 회원가입을 위한 유저 데이터를 DB로 전달
    
    ```jsx
    var db_postdata = require('../DB_module/DB_postdata');
    
    // 회원정보 data를 받아서 DB에 업데이트
    function user_signup(data){
        // 받은 데이터 확인
        console.log(`UR data: ${JSON.stringify(data)}`);
    
        // DB 모듈로 데이터 전달
        db_postdata.POST_user(data);
    
    }
    ```
    

1. DB 모듈
    - DB와 에게 쿼리메세지를 통해 데이터베이스 관련 작업을 수행
    - 쿼리의 response 데이터는 promise  형식이기 때문에 try,catch,finally 구문 사용
    - get 일 경우는 return 에 요청한 데이터 처리
    - 예시 1) 회원가입 유저 데이터 - post
    
    ```jsx
    // UR 모듈에서 유저 데이터를 받아 DB를 업데이트
    async function POST_user(data){
    
        console.log(`DB data : ${JSON.stringify(data)}`)
    
        PUBLIC_ID = data.PUBLIC_ID
        PUBLIC_ST = data.PUBLIC_ST
        REG_DT = data.REG_DT
        MOD_DT = data.MOD_DT
        ACCESS_KEY = data.ACCESS_KEY
        SECRET_KEY = data.SECRET_KEY
    
        let conn, output;
        try{
            conn = await pool.getConnection();
            conn.query('USE copytrade_proto');
            console.log(`INSERT INTO ct_public (PUBLIC_ID, PUBLIC_ST, REG_DT, MOD_DT, ACCESS_KEY, SECRET_KEY) VALUES (${PUBLIC_ID}, '${PUBLIC_ST}', '${REG_DT}', '${MOD_DT}', '${ACCESS_KEY}', '${SECRET_KEY}')`)
            output = await conn.query(`INSERT INTO ct_public (PUBLIC_ID, PUBLIC_ST, REG_DT, MOD_DT, ACCESS_KEY, SECRET_KEY) VALUES (${PUBLIC_ID}, '${PUBLIC_ST}', '${REG_DT}', '${MOD_DT}', '${ACCESS_KEY}', '${SECRET_KEY}');`)
        }
        catch(err){
            throw err;
        }
        finally{
            if(conn) conn.end()
            console.log(output)
            return;
        }
        
    }
    ```
    
    - 예시 2) 모든 유저목록 데이터 조회 - get
    
    ```jsx
    //모든 유저 목록을 불러오기
    async function Get_all_user(){
        let conn, rows;
        try{
            
            conn = await pool.getConnection();
            conn.query('USE copytrade_proto;');
            rows = await conn.query(`select * from ct_public;`);
            //console.log(rows)
        }
        catch(err){
            throw err;
        }
        finally{
            if (conn) conn.end();
            //console.log(rows)
            return rows;
        }
    }
    ```
    

### 정리

1. url 요청 → 라우터  :  app.js에서 1차 분기 및 요청을 라우터 로 전달
    
    ![Untitled](CT%20main%20API%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%20179519b0f41441afbb1bc7604767bd9d/Untitled.png)
    
2. 라우터 → 기능 모듈 :  라우터에서 기능 모듈을 호출하여 기능 처리
    
    ![Untitled](CT%20main%20API%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%20179519b0f41441afbb1bc7604767bd9d/Untitled%201.png)
    
3. 기능 모듈 → DB 모듈 : DB모듈에 데이터 처리 요청
    
    ![Untitled](CT%20main%20API%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%20179519b0f41441afbb1bc7604767bd9d/Untitled%202.png)
    
4. DB 모듈 : 쿼리를 통해 처리 및 데이터 수신 (post는 여기서 종료)
    
    ![Untitled](CT%20main%20API%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%20179519b0f41441afbb1bc7604767bd9d/Untitled%203.png)
    
5. DB → 기능 모듈  : 수신 데이터 전달
    - return rows : 여기서 rows가 DB 수신 데이터
        - 이 데이터를 전달
        
        ![Untitled](CT%20main%20API%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%20179519b0f41441afbb1bc7604767bd9d/Untitled%204.png)
        
        - DB_data 에 rows 전달
6. 기능 모듈 → 라우터 : 수신 데이터 전달
    - UR_data 에 DB_data 전달
    
    ![Untitled](CT%20main%20API%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%20179519b0f41441afbb1bc7604767bd9d/Untitled%205.png)
    
7. 라우터 : 처리 완료
    - 받은 데이터를 이용해 전달 및  처리
    
    ![Untitled](CT%20main%20API%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%20179519b0f41441afbb1bc7604767bd9d/Untitled%206.png)
    

# 개발 순서

## 1. **API 분류 선택**

- 리더 기능 / 유저 기능 / 거래 기능 / 구독 기능 / 테스트 기능

ex) 리더 기능

## 2. **기능 분류 선택**

ex) 리더기능 - 신규 리더 생성

## 3. **url 정의**

- /leader/new

## 4. **라우터 생성 및 app.js 와 연결**

- LR_Router.js
    - 대부분 파일은 존재함
    - 신규 라우터를 만들경우 파일 생성
    - 필요한 기능 모듈들을 주석으로 미리 표시
    
    ```jsx
    var router = express.Router();
    
    // 리더생성 이벤트 라우터
    // xxx:3000/leader 에서 post로 회원가입시 작동
    router.post('/new', async function(req, res, next) {
        
        data = req.body;
        console.log(req.body)
        res.statusCode = 200;
        res.end('ok');
    
        // 받은 데이터 확인
        console.log(`EV data: ${JSON.stringify(data)}`);
        
        // 받은 데이터를 LR모듈의 함수에 전달
        /** 여기에 LR 모듈 이 들어가야 함 */
        
    });
    
    module.exports = router;
    ```
    
- app.js
    
    ```jsx
    var LR_Router = require('./moudes/EV_module/router/LR_Router');
    app.use('/leader',LR_Router);
    ```
    
    - 대부분 이미 있음, 신규 카테고리를 만들 경우 연결
- postman 등을 사용하여 라우팅이 잘 되었는지 테스트
    
    ![Untitled](CT%20main%20API%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%20179519b0f41441afbb1bc7604767bd9d/Untitled%207.png)
    

## 5. **기능 모듈 메서드 생성**

- LR_postleader.js
    
    ```jsx
    
    // 회원정보 data를 받아서 DB에 업데이트
    function leader_new(data){
        // 받은 데이터 확인
        console.log(`UR data: ${JSON.stringify(data)}`);
    
        // DB 모듈로 데이터 전달
        /** 여기에 DB 모듈 함수 연결 */
    
    }
    
    module.exports = {
        leader_new : leader_new,
    }
    ```
    
- 이 모듈을 방금 만든 LR_Router.js에 import하여 연동 테스트 → 데이터가 잘 전달되었는지 확인
    - LR_Router.js
        
        ```jsx
        var LR_leaderPost = require('../../LR_module/LR_postleader');
        
        router.post('/new', async function(req, res, next) {
            
            data = req.body;
            console.log(req.body)
            res.statusCode = 200;
            res.end('ok');
        
            // 받은 데이터 확인
            console.log(`EV data: ${JSON.stringify(data)}`);
            
            // 받은 데이터를 LR모듈의 함수에 전달
            LR_leaderPost.leader_new(data);
        
        });
        ```
        
    - postman 테스트
        
        ![Untitled](CT%20main%20API%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%20179519b0f41441afbb1bc7604767bd9d/Untitled%207.png)
        
        ![Untitled](CT%20main%20API%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%20179519b0f41441afbb1bc7604767bd9d/Untitled%208.png)
        

## 6. DB 모듈 메서드 생성

- DB_postdata.js
    - SQL 쿼리를 통해 수신된 데이터 처리
    - 만약 return 할 데이터가 있다면 전달
    
    ```jsx
    // 신규 리더 정보 DB 등록
    async function POST_leader(data){
    
        console.log(`DB data : ${JSON.stringify(data)}`)
    
        LEADER_UID = data.LEADER_UID
        LEADER_NAME = data.LEADER_NAME
        LEADER_IMAGE = data.LEADER_IMAGE
        LEADER_CAPACITY = data.LEADER_CAPACITY
        LEADER_PRICE = data.LEADER_PRICE
        LEADER_AMOUNT = data.LEADER_AMOUNT
        EXCHANGE_TYPE = data.EXCHANGE_TYPE
        ACCESS_KEY = data.ACCESS_KEY
        SECRET_KEY = data.SECRET_KEY
        TRADER_ST = data.TRADER_ST
        REG_DT = data.REG_DT
        MOD_DT = data.MOD_DT
    
        let conn, output;
        try{
            conn = await pool.getConnection();
            conn.query('USE copytrade_proto');
            console.log(`INSERT INTO ct_public (LEADER_UID, PUBLIC_ST, LEADER_IMAGE, LEADER_CAPACITY, LEADER_PRICE, LEADER_AMOUNT, EXCHANGE_TYPE, ACCESS_KEY, SECRET_KEY, TRADER_ST, REG_DT, MOD_DT) VALUES (${LEADER_UID}, '${PUBLIC_ST}', '${LEADER_IMAGE}', '${LEADER_CAPACITY}', '${LEADER_PRICE}', '${LEADER_AMOUNT}', '${EXCHANGE_TYPE}'), '${ACCESS_KEY}', '${SECRET_KEY}','${TRADER_ST}','${REG_DT}','${MOD_DT}'`)
            output = await conn.query(`INSERT INTO ct_public (LEADER_UID, PUBLIC_ST, LEADER_IMAGE, LEADER_CAPACITY, LEADER_PRICE, LEADER_AMOUNT, EXCHANGE_TYPE, ACCESS_KEY, SECRET_KEY, TRADER_ST, REG_DT, MOD_DT) VALUES (${LEADER_UID}, '${PUBLIC_ST}', '${LEADER_IMAGE}', '${LEADER_CAPACITY}', '${LEADER_PRICE}', '${LEADER_AMOUNT}','${EXCHANGE_TYPE}'), '${ACCESS_KEY}', '${SECRET_KEY}','${TRADER_ST}','${REG_DT}','${MOD_DT}');`)
        }
        catch(err){
            throw err;
        }
        finally{
            if(conn) conn.end()
            console.log(output)
            return;
        }
        
    }
    
    module.exports = {
        POST_leader : POST_leader
    
    }
    ```
    
- 기능 모듈에 추가
    - 기능 모듈에 DB 모듈 import
    
    ```jsx
    var db_postdata = require('../DB_module/DB_postdata');
    
    // 회원정보 data를 받아서 DB에 업데이트
    function leader_new(data){
        // 받은 데이터 확인
        console.log(`UR data: ${JSON.stringify(data)}`);
    
        // DB 모듈로 데이터 전달
        db_postdata.POST_leader(data)
    
    }
    
    module.exports = {
        leader_new : leader_new,
    }
    ```
    
- 테스트를 위한 쿼리 생성
    
    ```json
    {
    "LEADER_UID": "test_uid",
    "LEADER_NAME": "test_name",
    "LEADER_IMAGE": "test_image",
    "LEADER_CAPACITY": 999,
    "LEADER_PRICE": 99,
    "LEADER_AMOUNT": 99,
    "EXCHANGE_TYPE": "ET01",
    "ACCESS_KEY": "test_ak",
    "SECRET_KEY": "test_sk",
    "TRADER_ST": "RS01",
    "REG_DT": "2023-05-11 16:00:59",
    "MOD_DT": "2023-05-11 16:01:00"
    }
    ```
    
- postman을 통한 테스트
    
    ![Untitled](CT%20main%20API%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%20179519b0f41441afbb1bc7604767bd9d/Untitled%209.png)
    
- DB 확인
    
    ![Untitled](CT%20main%20API%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%20179519b0f41441afbb1bc7604767bd9d/Untitled%2010.png)
    

## 7. 사용

- 예제 : ct_admin에서 모든 리더 목록을 불러오기
- 다음은 React의 클래스형 component에서 api를 사용하여 데이터를 불러와 state에 저장하는 예시이다.
    
    ```jsx
    constructor(props){
            super(props)
            this.state = {
                list: null
            }
    
            this.callAPI = this.callAPI.bind(this);
        }
    
        componentDidMount() {
            this.callAPI();
        }
    
        callAPI(){
            fetch("http://124.50.247.56:3000/leader/all")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    list: data
                });
            })
            .catch(error => console.error(error));
        }
    ```
    
    - component가 호출되면 this.state.list에 모든 리더 목록이 자동으로 입력된다.
    - 이후 this.state.list를 이용하여 api를 통해 불러온 데이터에 접근할 수 있다.
    
- DB 상태
    
    ![Untitled](CT%20main%20API%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%20179519b0f41441afbb1bc7604767bd9d/Untitled%2011.png)
    
- 구성화면
    
    ![Untitled](CT%20main%20API%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%89%E1%85%A5%20179519b0f41441afbb1bc7604767bd9d/Untitled%2012.png)