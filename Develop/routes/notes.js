const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const fs = require('fs');



notes.get('/', (req, res) => {
  fs.readFile('db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
  })
})

notes.post('/', (req, res) => {
    
  const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuid()
  }

  return fs.readFile('db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      notes.push(newNote);

      fs.writeFile('db/db.json', JSON.stringify(notes), () => {
          res.json(true);
      })
  })
})


notes.delete('/:id', (req, res) => {
  const id = req.params.id;

  return fs.readFile('db/db.json', 'utf8', (err, data) => {
      if (err) throw err;

      const notes = JSON.parse(data);
      const deleteNote = notes.filter(note => id !== note.id)

      fs.writeFile('db/db.json', JSON.stringify(deleteNote), () => {
          res.json(true);
      })
  })
})




module.exports = notes;
    


  
  