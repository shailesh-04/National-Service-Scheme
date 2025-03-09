import conn from "#config/db.config.js";
import { catchErr } from "#color";
function model() {}
try {
    model.All = async (res) => {
        conn.query(
            `SELECT * FROM events ORDER BY 
                DATE(end_time) = CURDATE() ASC,
                start_time DESC `,res);
    } ;

    model.AllUpdate = async (id, body, res) => {
        conn.query(`UPDATE events SET 
            name=       ?, 
            description=?, 
            location=   ?,
            image=      ?,
            start_time= ?, 
            end_time=   ?,
            numOFUser=  ?,
            created_by= ?, 
            is_deleted =?  
            WHERE id = ${id}; `,body,res);
    };
    
    model.createFull = async (body,res) => {
        conn.query(
            `INSERT INTO events (name, description, location,image, start_time, end_time, created_by)
            VALUES (?,?,?,?,?,?,?);`,
            body,
            res
        );
    };
    model.create = async (body,res) => {
        conn.query(
            `INSERT INTO events (name, description, location, start_time, end_time, created_by)
            VALUES (?,?,?,?, ?,?);`,
            body,
            res
        );
    };
    model.findAll = async (res) => {
        conn.query(
            `SELECT id, name, description, location, start_time, end_time, numOFUser, image, created_by 
                FROM events 
                WHERE is_deleted = false  
                ORDER BY 
                DATE(end_time) = CURDATE() ASC,
                start_time DESC;  
                `,
            res
        );
    } ;

    model.findOne = async (id, res) => {
        conn.query(
            "SELECT id, name, description, location, start_time, end_time, numOFUser, image, created_by FROM events WHERE id  = ? AND is_deleted = FALSE;",
            id,
            res
        );
    };
    model.update = async (id, body, res) => {
        conn.query(
            `UPDATE events 
            SET name = ?, 
                description = ?, 
                location = ?, 
                start_time = ?, 
                end_time = ?, 
                image = ? 
            WHERE id = ${id};
            `,
            body,
            res
        );
    };
    model.remove = async (id, res) => {
        conn.query(
            `UPDATE events SET is_deleted = TRUE WHERE id = ?;`,
            [id],
            res
        );
    };
    model.restore = async (id, res) => {
        conn.query(
            `UPDATE events SET is_deleted = false WHERE id = ?;`,
            [id],
            res
        );
    };
    model.uploadImage = async (body, res) => {
        conn.query(
            `UPDATE events SET image = ?  WHERE id = ?;`,
            body,
            res
        );
    };
    model.upcoming = async (res) => {
        conn.query(
            `SELECT id,name,description,location,start_time,end_time,numOFUser,image,created_by FROM events 
            WHERE is_deleted = false 
            AND start_time >= NOW() 
            ORDER BY start_time ASC 
            LIMIT 5;`,
            res
        );
    };
} catch (error) {
    catchErr(error, "user.model");
}
export default model;
