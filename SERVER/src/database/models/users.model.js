import conn from "#config/db.config.js";
import { catchErr } from "#color";
function model() {}
try {
    model.All = async (res) => {
        conn.query("SELECT * FROM users", res);
    };
    model.updateAll = async (id, body, res) => {
        conn.query(
            "UPDATE users SET name=?, email=?, password=?, phone=?, role=?, is_deleted=? WHERE id = " +
                id,
            body,
            res
        );
    };

    model.create = async (body, res) => {
        conn.query(
            "insert into users(name,email,password,phone)values(?,?,?,?)",
            body,
            res
        );
    };
    model.singin = (body, res) => {
        conn.query(
            "select * from users where email = ? and password = ?",
            body,
            res
        );
    };
    model.findAll = async (res) => {
        conn.query("SELECT id,name, email, password, phone,role,img FROM users", res);
    };

    model.findOne = async (id, res) => {
        conn.query("SELECT * FROM users where id = ?", id, res);
    };
    model.update = async (id, body, res) => {
        conn.query(
            "UPDATE users SET name = ?, email = ?, password = ?, phone = ? WHERE id = " +
                id,
            body,
            res
        );
    };
    model.remove = async (id, res) => {
        conn.query("DELETE FROM users WHERE id = " + id + ";", res);
    };
    model.uploadImage = async (body, res) => {
        conn.query("UPDATE users SET img = ? WHERE id = ?",body, res);
    };
    model.getEventUser = async (body,res)=>{
        conn.query("SELECT id,name,email,phone,role,img FROM users WHERE id = ?",body,res);
    }
} catch (error) {
    catchErr(error, "user.model");
}
export default model;
