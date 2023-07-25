import { DataSource } from "typeorm"
import { User } from "./model/user.model";

const dataSource: DataSource = new DataSource({
    type: process.env.DB_TYPE as ("postgres") || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 32768,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgrespw",
    database: process.env.DB_DATABASE || "testdb",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})

export default dataSource;