import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './shootsta.sqlite'  // Path to the SQLite database file
});


export default sequelize;