const notes = require('express').Router();
const {v4:uuidv4} =require('uuid');
const fs = require('fs/promises');


// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    fs.readFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
    .catch((error)=>{
        console.log(error);
        console.log ('something went wrong when getting notes database')
    });
  });

// GET Route for a specific note
notes.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    fs.readFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.notes_id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      })
      .catch((error)=>{
        console.log(error);
        console.log ('something went wrong when getting notes database')
      });
  });

// POST Route for a new note
notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv4()
      };
  
      fs.readFile('./db/db.json')
      .then((data) => {
        let note = JSON.parse(data);
        note.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(note, null, 4));
        res.json(`note added successfully`);
        })
      .catch((error)=>{
        console.log(error);
        console.log ('something went wrong when getting notes database');
      });
      
    } else {
      res.error('Error in adding note');
    }
  });

  // DELETE Route for a specific note
notes.delete('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  //console.log(noteId)
  fs.readFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json)=>{
      //const noteList = JSON.parse(data) 

      //console.log(json);
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((note) => note.note_id !== noteId);

      if(result){
        // Save that array to the filesystem
        fs.writeFile('./db/db.json', JSON.stringify(result, null, 4));
      }

      // Respond to the DELETE request
      res.json(`Note with ID:${noteId} has been deleted`);
    })
    .catch((error)=>{
      console.log(error);
      console.log ('something went wrong when getting notes database');
    });
});

module.exports = notes;