import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const AccountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date,
      required: true
    }
  }
);

AccountSchema.pre('save', async function(next) {
  if(this.isModified('password')){
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
  }
});

AccountSchema.methods.comparePassword = async function (candidatePassword: any) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.Accounts || mongoose.model('Accounts', AccountSchema);
