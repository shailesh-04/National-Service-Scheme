import conn from "#config/db.config.js";

conn.query(`SELECT start_time FROM events 
WHERE is_deleted = false 
AND start_time >= NOW() 
ORDER BY start_time ASC 
LIMIT 5;
`,(err,data)=>{
    if(err)
        return console.log(err);
    console.log(data);
});

conn.end();