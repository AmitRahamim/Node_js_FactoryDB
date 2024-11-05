const express = require('express');
const cors = require('cors');
const connectDB = require('./server/config/db');

const employeeRouter = require('./server/controllers/EmployeeCont');
const departmentRouter = require('./server/controllers/DepartmentCont');
const shiftRouter = require('./server/controllers/ShiftCont');
const userRouter = require('./server/controllers/UserCont');

const app = express();
const PORT = 3000;

connectDB();

app.use(cors());

app.use('/', express.json());

app.use('/User', userRouter);

app.use('/Employee', employeeRouter);

app.use('/Department', departmentRouter);

app.use('/Shift', shiftRouter);



app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});
