
import dbConnection from "./config/databaseConnection";
import log from "./utils/logger";
import createServer from "./utils/server";



const app:any = createServer();

app.listen(process.env.PORT, async () => {
  log.info(`App is running at http://localhost:${process.env.PORT}`);

  await dbConnection()
});
