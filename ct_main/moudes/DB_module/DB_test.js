const mariadb = require('mariadb');
const vals = require('./DB_info');

// DB접속을 위한 connection pool을 설정
const pool = mariadb.createPool({
    host: vals.DBhost, port:vals.DBport,
    user: vals.DBuser, password: vals.DBpass,
    connectionLimit: 5
});


// DB 관련 함수 프로토타입
// sql을 실행하고 그 모든 
async function show_tables(){

    // conn에 접속 pool 할당
    // rows에 결과값 할당됨
    let conn, rows;

    // try-catch문을 통해 SQL쿼리 전송 및 응답 수신
    try{
        conn = await pool.getConnection();
        conn.query('USE copytrade_proto;');
        rows = await conn.query('SHOW tables;');
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        console.log("---DB module recieve | start ---")
        console.log(rows)
        console.log("---DB module recieve | end   ---")
        return rows;
    }
}

async function showtable_cmmcode(){

    // conn에 접속 pool 할당
    // rows에 결과값 할당됨
    let conn, rows;

    // try-catch문을 통해 SQL쿼리 전송 및 응답 수신
    try{
        conn = await pool.getConnection();
        conn.query('USE copytrade_proto;');
        rows = await conn.query('select * from ct_cmm_code;');
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        console.log("---DB module recieve | start ---")
        console.log(rows)
        console.log("---DB module recieve | end   ---")
        return rows;
    }
}

module.exports = {
    show_tables: show_tables,
    showtable_cmmcode : showtable_cmmcode,
}