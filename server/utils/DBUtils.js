import mysql from "mysql2/promise";

const dbConnection = async () => {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      port: "3306",
      user: "root",
      password: "",
      database: "auth_database",
    });
    console.log("Connected to the MySQL database");
    return db; 
  } catch (error) {
    console.log("Error connecting to the database:", error);
    throw error;
  }
};

export default dbConnection;