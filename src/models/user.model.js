import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Firstname is required'],
    },
    lastname: {
      type: String,
      required: [true, 'Lastname is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  
    name: {
      type: String,

    },
    phoneNumber: {
      type: String,
    },
    profilePicture: {
      type: String,  
    },
  },
  { timestamps: true }
);


// **Password Hashing Middleware**
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password comparison method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('UserBooksy', userSchema);
