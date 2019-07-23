const Styles = theme => ({
    listItem: {
      cursor: 'pointer'
    },
    textSection: {
      maxWidth: '85%'
    },  
    deleteIcon: {
      position: 'absolute',
      right: '15px',
      top: 'calc(50% - 15px)',
      '&:hover': {
        color: 'red'
      }
    }
  });
  
  export default Styles;