const ct_aws = {
    DBhost : 'database-2.ckjinzyrqfop.ap-northeast-2.rds.amazonaws.com' , 
    DBport : '3306',
    DBuser : 'admin',
    DBpass : 'wlsdb995!',
    DBdatabase : 'copytrade_proto',
    connectionLimit : 15
}

const ct_local = {
    DBhost : '127.0.0.1',
    DBport : '3306',
    DBuser : 'root',
    DBpass : 'gjaqjq21@!',
    DBdatabase : 'copytrade_proto',
    connectionLimit : 5
}

const ct_home = {
    DBhost : '124.50.247.56',
    DBport : '3306',
    DBuser : 'root',
    DBpass : 'gjaqjq21@!',
    DBdatabase : 'copytrade_proto',
    connectionLimit : 5
}

module.exports = ct_aws