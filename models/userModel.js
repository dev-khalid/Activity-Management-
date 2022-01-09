import mongoose from 'mongoose'; 
const userSchema = mongoose.Schema({
  userId: {
    type: 'string', 
    required: ['userId is required']
  }, 
  displayName: { 
    type: 'string', 
  },
  email: {
    type: 'email',
  }
})

const User = mongoose.model('User',userSchema); 
export default User; 
//ajke saradine ami ektu mongodb er relation gula dekhbo and surely ami eikhane implement korbo seigula + ajkei application take secure kore heroku te up dibo . 