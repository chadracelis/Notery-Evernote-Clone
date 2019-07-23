import React, { Component } from "react";
import Sidebar from '../sidebar/Sidebar'
import Editor from '../editor/Editor'
import Navbar from "../navbar/Navbar";

const firebase = require('firebase');

class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
      email: null
    }
  }
  
  componentWillMount = () => {
    firebase.auth().onAuthStateChanged(async _user => {
      if (!_user) {
        this.props.history.push("/signin");
      } else {
        await firebase
          .firestore()
          .collection("users")
          .where("email", "==", _user.email)
            await this.setState({
              email: _user.email,
            });
          console.log(this.state.email)
      }
    });
  };

  componentDidMount = async () => {
    await firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
      // this will automatically call database to update our 'notes' collection
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
    // return all notes that is not equal to deleted note 
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
    // deselect any note if a note is deleted
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
      id: Math.random()
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
      <div>
        <div className='app-container'>
          <Navbar _user={this.state.email} />
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
      </div>
    );
  }
}

export default Dashboard;
