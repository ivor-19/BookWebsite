import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
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

export default mongoose.models.Books || mongoose.model('Books', BookSchema);