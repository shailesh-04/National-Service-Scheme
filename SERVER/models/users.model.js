import conn from "#config/db.config.js";
import {catchErr} from "#color";
function model(){

};
try {
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
        conn.query("SELECT * FROM users", res);
    };

    model.findOne = async (id, res) => {
        conn.query("SELECT * FROM users where _id = ?", id, res);
    };
    model.update = async (id, body, res) => {
        conn.query(
            "UPDATE users SET name = ?, email = ?, password = ?, phone = ? WHERE _id = " +
                id,
            body,
            res
        );
    };
    model.remove = async (id, res) => {
        conn.query("DELETE FROM users WHERE _id = ?;", [id], res);
    };
} catch (error) {
    catchErr(error,'user.model');
}
export default model;
