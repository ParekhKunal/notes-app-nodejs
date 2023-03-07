const fs = require('fs');
const chalk = require('chalk');
const getNotes = () => {
    return 'Your notes...';
};

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const addNote = function (title, body) {
    const notes = loadNotes();

    const duplicateNote = notes.find(
        function (note) {
            return note.title === title;
        }
    );
    //duplicateNote === undefined or !duplicateNote has been readed as if no duplicate note then add note
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.inverse.green.bold(' New Note added Successfully! '));
    } else {
        console.log(chalk.inverse.red.bold(' Notes title is already taken! '));
    }
};

const removeNote = function (title, body) {
    const notes = loadNotes();

    const notestoKeep = notes.filter(
        function (note) {
            return note.title != title;
        }
    );
    console.log(notes.length);
    console.log(notestoKeep.length);
    if (notes.length > notestoKeep.length) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notestoKeep);
        console.log(chalk.inverse.green.bold(' Notes Removed Successfully '));
    } else {
        console.log(chalk.inverse.red.bold(' Note not found '));
    }
};

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse.yellow.bold(' Your Notes '));

    notes.forEach((note) => {
        console.log(note.title);
    });

};

const readNote = (title) => {
    const notes = loadNotes();

    const note = notes.find(
        function (note) {
            return note.title === title;
        }
    );

    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse(' Note not found '));
    }
};

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};