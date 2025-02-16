import conn from "#config/db.config.js";
import { catchErr } from "#color";
function model() {}
try {
    model.create = async (body, res) => {
        conn.query("INSERT INTO images(E_id,imageurl) VALUES(?,?)", body, res);
    };
    model.findAll = async (res) => {
        conn.query("SELECT * FROM images", res);
    };
} catch (error) {
    catchErr(error, "imagis.model");
}
export default model;
