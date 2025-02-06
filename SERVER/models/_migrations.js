import conn from "#config/db.config.js";
import color from "#color";

export const tables = [
    {
        name: "users",
        field: `
            _id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            phone VARCHAR(20),
            _role VARCHAR(20) CHECK (_role IN ('1', '2', '3')) DEFAULT '1',
            img VARCHAR(255)`,
    },
];
const migration = async () => {
    tables.forEach((e) => {
        conn.query(`drop table ${e.name}`, (err) => {
            if (err) return console.log(err.sqlMessage);
            color(["Table Is Drop : "+e.name,'red','italic']);
        });
        conn.query(
            `
        CREATE TABLE ${e.name} (${e.field});
    `,
            (err) => {
                if (err) return console.log(err.sqlMessage);
                color(["Table Is Create : "+e.name,'green','bold']);
            }
        );
    });
};
migration();
conn.end();
export default migration;
