import conn from "#config/db.config.js";
import { catchErr } from "#color";
function model() {}
try {
    model.All = async (res) => {
        conn.query("SELECT * FROM images", res);
    };
    model.updateAll = async (id,body,res) => {
        conn.query("UPDATE images SET E_id = ?, imageurl = ? , is_deleted = ? WHERE id ="+id,body, res);
    };
    
    model.create = async (body, res) => {
        conn.query("INSERT INTO images(E_id,imageurl) VALUES(?,?)", body, res);
    };
    model.findAll = async (res) => {
        conn.query("SELECT id,E_id,imageurl FROM images", res);
    };
    model.eventEmages = async (res) => {
        conn.query(`SELECT images.id,images.E_id,images.imageurl, events.name AS event_name FROM images LEFT JOIN events ON images.E_id = events.id;`, res);
    };
    model.GetImages = (IDs,callback)=>{
        conn.query(`SELECT * FROM images where id IN(${IDs});`,callback);
    }

    model.remove = (id,callback)=>{
        conn.query(`DELETE FROM images WHERE id  = ${id};`,callback);
    }
    model.countRows = (callback)=>{
        conn.query(`SELECT COUNT(*) as 'numOfRow' FROM images;`,callback);
    }
} catch (error) {
    catchErr(error, "imagis.model");
}
export default model;
