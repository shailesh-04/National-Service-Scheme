import conn from "#config/db.config.js";
import { catchErr } from "#color";
class RegistrationModel{
    static async getAll(res){
        conn.query("SELECT * FROM registration", res);
    };
    static async inEventfindUsers(id,res){
        conn.query("SELECT * FROM registration WHERE event_id = ?",[id], res);
    };
    static async create(body, res){
        conn.query("INSERT INTO registration(user_id,event_id) VALUES(?,?)", body, res);
    };
    static async changeStatus(id,status,res){
        conn.query("UPDATE registration SET status = ? where id = ?",[status,id], res);
    };
    static async check(body,callback){
        conn.query("SELECT * FROM registration WHERE user_id = ? AND event_id = ? ",body,callback);
    }
}
export default RegistrationModel;
