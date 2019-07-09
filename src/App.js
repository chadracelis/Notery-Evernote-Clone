import React, { Component } from "react";
import "./App.css";
import Sidebar from './sidebar/Sidebar'
import Editor from './editor/Editor'

const firebase = require('firebase');

class App extends Component {

  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    }
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
        return data;
        });
        console.log(notes);
        this.setState({ notes })
      });
  }

  selectNote = (note, index) => {
    this.setState({
      selectedNoteIndex: index, 
      selectedNote: note
    })
  }
 
  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({
      notes: this.state.notes.filter(_note => _note !== note) 
    });
    if(this.state.selectedNoteIndex === noteIndex) {
      this.setState({ 
        selectedNoteIndex: null, 
        selectedNote: null 
    });
    } 
    else {
      this.state.notes.length > 1 ?
        this.selectNote(
          this.state.notes[this.state.selectedNoteIndex - 1], 
          this.state.selectedNoteIndex - 1
        ) 
        :
        this.setState({
          selectedNoteIndex: null, 
          selectedNote: null 
        });
    }
    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }
  
  noteUpdate = (id, noteObject) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObject.title,
        body: noteObject.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

  newNote = async title => {
    const note = {
      title: title,
      body: '',
    };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      const newID = newFromDB.id;
      await this.setState({
        notes: [...this.state.notes, note]
      })
      const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
      // We use the function indexOf to find the following note which we then filter to match the id of the new ID
      this.setState({
        selectedNote: this.state.notes[newNoteIndex],
        selectedNoteIndex: newNoteIndex
      })
  }

  render() {
    return (
      <div className='app-container'>
        <Sidebar 
          selectedNoteIndex={this.state.selectedNoteIndex} 
          notes={this.state.notes} 
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
          newNote={this.newNote}
        />
        {
          this.state.selectedNote ?
          <Editor 
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}
          /> :
          null
        }
      </div>
    );
  }

}

export default App;
