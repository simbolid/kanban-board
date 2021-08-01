const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  columns: [
    {
      title: {
        type: String,
        required: true,
      },
      cards: [
        {
          title: {
            type: String,
            required: true,
          },
          description: String,
        },
      ],
    },
  ],
});

// converting the ID field to a string makes testing easier
boardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Board', boardSchema);
