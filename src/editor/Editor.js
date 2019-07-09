import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import Styles from './Styles';

class Editor extends Component {

    constructor() {
        super();
        this.state = {
          title: '',
          body: '',
          id: ''
        }
    }

    componentDidMount = () => {
      this.setState({
        title: this.props.selectedNote.title,
        body: this.props.selectedNote.body,
        id: this.props.selectedNote.id,
      });
    }

    componentDidUpdate = () => {
      if(this.props.selectedNote.id !== this.state.id) {
        this.setState({
          title: this.props.selectedNote.title,
          body: this.props.selectedNote.body,
          id: this.props.selectedNote.id
        });
      }
    }

    updateBody = async body => {
      await this.setState({ body });
      this.update();
    }

    updateTitle = async title => {
      await this.setState({ title });
      this.update();
    }

    update = debounce(() => {
      // console.log('UPDATING');
      this.props.noteUpdate(this.state.id, {
        title: this.state.title,
        body: this.state.body
      })
    }, 1500);
    // debounce waits 1.5s for users after typing before it sends http request

    render() {
      const { classes } = this.props;
        return (
          <div className={classes.editorContainer}>
            <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
            <input 
              className={classes.titleInput}
              placeholder='Note Title..'
              value={this.state.title ? this.state.title : ''}
              onChange={(e) => this.updateTitle(e.target.value)}
            />
            <ReactQuill 
              value={this.state.body} 
              onChange={this.updateBody}
              modules={Editor.modules}
              formats={Editor.formats}
            >
            </ReactQuill>
          </div>
        );
    }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

export default withStyles(Styles)(Editor)
