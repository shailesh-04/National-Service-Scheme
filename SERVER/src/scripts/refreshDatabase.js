import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import color from "#color";
(async () => {
    const migrationFolder = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "../database/migrations"
    );
    const files = fs.readdirSync(migrationFolder);
    const fileNames = files.sort((a, b) => {
        const numA = parseInt(
            a.split("_")[a.split("_").length - 1].split(".")[0]
        );
        const numB = parseInt(
            b.split("_")[b.split("_").length - 1].split(".")[0]
        );
        return numB - numA;
    });

    for (let filename of fileNames) {
        const migrationModule = await import(`#migrations/${filename}`);
        const migration = migrationModule.default.migration;
        await migration.dropTable();
    }
    for (let filename of fileNames.reverse()) {
        const migrationModule = await import(`#migrations/${filename}`);
        const migration = migrationModule.default.migration;
        await migration.createTable();
    }
})();
