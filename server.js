import { app } from './app.js';
import colors from 'colors'

app.listen(process.env.PORT, () => {
  console.log(
    `Sever Started on PORT ${process.env.PORT} in ${process.env.NODE_EVN} mode`.rainbow.bold
  );
});