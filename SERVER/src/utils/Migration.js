import database from "#config/db.config.js";
class Migration {
    constructor(table, fieldDefinitions, constraints = []) {
        database.testConnection();
        this.table = table;
        this.fields = Object.entries(fieldDefinitions).map(
            ([fieldName, type]) => ({
                fieldName,
                type,
            })
        );
        this.constraints = constraints;
    }
    async createTable() {
        const fieldDefs = this.fields.map(
            (field) => `${field.fieldName} ${field.type.join(" ")}`
        );

        const allDefs = [...fieldDefs, ...this.constraints]; // Combine fields and constraints

        const query = `CREATE TABLE ${this.table} (\n  ${allDefs.join(
            ",\n  "
        )}\n);`;

        try {
            await database.query(query);
            console.log("Successfully created table", this.table);
        } catch (error) {
            console.error("Failed to create table!");
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async dropTable() {
        try {
            await database.query(`DROP TABLE IF EXISTS ${this.table}`);
            console.log("Successfully dropped table", this.table);
        } catch (error) {
            console.error("Failed to drop table!");
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async truncateTable() {
        try {
            await database.query(`TRUNCATE TABLE ${this.table}`);
            console.log("Successfully truncated table", this.table);
        } catch (error) {
            console.error("Failed to truncate table!");
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async addColumn(fieldName, type) {
        try {
            await database.query(
                `ALTER TABLE ${this.table} ADD COLUMN ${fieldName} ${type.join(
                    " "
                )}`
            );
            console.log(
                `Successfully added column ${fieldName} to table ${this.table}`
            );
            this.fields.push({ fieldName, type });
        } catch (error) {
            console.error(`Failed to add column ${fieldName}`);
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async dropColumn(columnName) {
        try {
            await database.query(
                `ALTER TABLE ${this.table} DROP COLUMN ${columnName}`
            );
            console.log(
                `Successfully dropped column ${columnName} from table ${this.table}`
            );
            this.fields = this.fields.filter(
                (field) => field.fieldName !== columnName
            );
        } catch (error) {
            console.error(`Failed to drop column ${columnName}`);
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async renameTable(newTableName) {
        try {
            await database.query(
                `ALTER TABLE ${this.table} RENAME TO ${newTableName}`
            );
            this.table = newTableName;
            console.log(`Successfully renamed table to ${newTableName}`);
        } catch (error) {
            console.error(`Failed to rename table ${this.table}`);
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async tableExists() {
        try {
            const result = await database.query(
                `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = '${this.table}')`
            );
            return result.rows[0].exists;
        } catch (error) {
            console.error(`Failed to check if table ${this.table} exists`);
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async migrate(callback) {
        try {
            await callback(this);
            console.log(
                `Migration for table ${this.table} completed successfully`
            );
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async sql(query, params) {
        try {
            const [result] = await database.query(query, params);
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    getFieldDefinitions() {
        return this.fields.reduce((acc, field) => {
            acc[field.fieldName] = field.type;
            return acc;
        }, {});
    }
}
export default Migration;
