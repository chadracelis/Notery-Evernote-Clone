const Styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: 'calc(100% - 35px)',
      position: 'absolute',
      left: '0',
      width: '300px',
      boxShadow: '0px 0px 2px black',
    },
    unreadMessage: {
      color: 'red',
      position: 'absolute',
      top: '0',
      right: '5px'
    },
    newNoteBtn: {
      width: '100%',
      height: '50px',
      borderBox: '1px solid black',
      borderBottom: '1px solid black',
      borderRadius: '0px',
      backgroundColor: '#56406E',
      color: 'white',
      '&:hover': {
        backgroundColor: '#361C54'
      }
    },
    sidebarContainer: {
      marginTop: '0px',
      width: '300px',
      height: '100%',
      maxHeight: '800px',
      boxSizing: 'border-box',
      float: 'left',
      overflowY: 'scroll',
      overflowX: 'hidden'
    },
    newNoteInput: {
      width: '100%',
      margin: '0px',
      height: '35px',
      outline: 'none',
      border: 'none',
      paddingLeft: '5px',
      '&:focus': {
        outline: '2px solid rgba(81, 203, 238, 1)'
      }
    },
    newNoteSubmitBtn: {
      width: '100%',
      backgroundColor: '#56406E',
      borderRadius: '0px',
      color: 'white',
      '&:hover': {
        backgroundColor: '#361C54'
      }
    }
  });
  
  export default Styles;