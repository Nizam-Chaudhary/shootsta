import express from 'express';
import bodyParser from 'body-parser';
import routes from './route/index.routes.js';
import sequelize from './config/db.config.js';

const app = express();
const port = 3000;
 

// Sync models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
});
   
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", routes);
  
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



