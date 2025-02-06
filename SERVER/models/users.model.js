import conn from "#config/db.config.js";
const create = async (body,res)=>{
    const {name,email,password,phone} = body;
    conn.query("insert into users(name,email,password,phone)values(?,?,?,?)",[name,email,password,phone],res);
}
const findAll = async (res)=>{
    conn.query("SELECT * FROM users",res);
}
const findOne = (body,res)=>{
    const {email,password} = body;
    conn.query("select * from users where email = ? and password = ?",[email,password],res);
}

export default {create,findAll,findOne}