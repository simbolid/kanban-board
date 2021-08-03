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

boardSchema.set('toJSON', {
  versionKey: false,
  virtuals: false,
  /*
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    returnedObject.columns.forEach((col) => {
      col.id = col._id.toString();
      delete col._id;
    });
  }, */
});

module.exports = mongoose.model('Board', boardSchema);
