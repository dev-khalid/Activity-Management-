// import jwt from 'jsonwebtoken';
// import catchAsync from 'express-async-handler';
// import promisify from 'promisify'; 
// const authorization = catchAsync(async (req, res, next) => {
//   const decoded = await promisify(jwt.verify)(req.cookies.access_token,process.env.JWT_SECRET); 
//   req.userId = decoded.userId; 
//   next(); 
// });
// export default authorization;
