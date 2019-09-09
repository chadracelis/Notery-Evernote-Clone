import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Styles from './Styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItem from '../sidebarItem/SidebarItem';

class Sidebar extends Component {

    constructor() {
        super();
        this.state = {
            addingNote: false,
            title: null
        }
    }

    newNoteBtnClick = () => {
        console.log('clicked');
        this.setState({
            addingNote: !this.state.addingNote,
            title: null
        })
    }

    updateTitle = (title) => {
        this.setState({
            title
        })
    }

    submitNote = () => {
        // console.log(this.state);
        this.props.newNote(this.state.title);
        this.setState({
            title: null,
            addingNote: false
        })
    }

    selectNote = (n, i) => this.props.selectNote(n, i);
    
    deleteNote = note => {
        this.props.deleteNote(note);
    }

    render() { 
        const { notes, classes, selectedNoteIndex } = this.props;
        if(notes) {
        // if notes is not null 
            return (
                <div className={classes.sidebarContainer}>
                    <Button 
                      onClick={this.newNoteBtnClick} 
                      className={classes.newNoteBtn}
                    >
                      {this.state.addingNote ? 'Cancel' : 'New Note' }
                    </Button>
                      {
                        this.state.addingNote ? 
                        <div>
                          <input 
                            type='text' 
                            className={classes.newNoteInput} 
                            placeholder='Enter Note Title' 
                            onKeyUp={(e) => this.updateTitle(e.target.value)}
                          />
                          <Button 
                            className={classes.newNoteSubmitBtn}
                            onClick={this.submitNote}
                          > Submit Note
                          </Button>
                         </div> :
                         null
                      }
                    <List>
                      {
                        notes.map((_note, _index) => {
                            return (
                              <div key={_index}>
                                <SidebarItem 
                                  _note={_note}
                                  _index={_index}
                                  selectedNoteIndex={selectedNoteIndex}
                                  selectNote={this.selectNote}
                                  deleteNote={this.deleteNote}
                                />
                                <Divider></Divider>
                              </div>
                            )
                        })
                      }
                    </List>
                </div>
            );
        } else {
            return <div>Loading Notery..</div>
        }
        
    }
}
 
export default withStyles(Styles)(Sidebar)
