import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Styles from './Styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

class SidebarItem extends Component {

    selectNote = (n, i) => this.props.selectNote(n, i);

    deleteNote = note => {
        if(window.confirm(`Are you sure you want to delete ${note.title}?`)) {
        // back ticks allows us to write a string
        this.props.deleteNote(note);
        }
    }

    render() { 
        const {_index, _note, classes, selectedNoteIndex} = this.props;
        return (
            <div key={_index}>
                <ListItem 
                  className={classes.listItem}
                  selected={selectedNoteIndex === _index}
                  alignItems='flex-start'
                >
                  <div 
                    className={classes.textSection}
                    onClick={() => this.selectNote(_note, _index)}
                  >
                    <ListItemText
                      primary={_note.title}
                      secondary={removeHTMLTags(_note.body.substring(0, 30)) + '...'}
                    >
                    </ListItemText>
                    <DeleteIcon 
                      className={classes.deleteIcon}
                      onClick={() => this.deleteNote(_note)} 
                    >
                    </DeleteIcon>
                  </div>
                </ListItem>
            </div>
        );
    }
}
 
export default withStyles(Styles)(SidebarItem)

// selected is a property from the ListItem component which checks if the attached variable is true, it will be highlighted

// under secondary property of ListItemText component, we're telling our app to reveal 1st 30 characters of our note body
// and remainder as... in our sidebar. We also invoke removeHTMLTags because without it, our body will display html tags 
// such as <p></p>