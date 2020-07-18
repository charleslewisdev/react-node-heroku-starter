import {createMuiTheme} from '@material-ui/core/styles';

const theme = {
  overrides: {
    MUIRichTextEditor: {
      root: {
        border: '1px solid gray',
      },
      editorContainer: {
        border: '1px solid gray',
        margin: 0,
        minHeight: 200,
        padding: 5,
      },
      placeHolder: {
        position: 'static',
      },
    },
    '& .MuiFormControl-root': {
      margin: 2,
      minWidth: 120,
      maxWidth: 300,
    },
  },
};

export default createMuiTheme(theme);
