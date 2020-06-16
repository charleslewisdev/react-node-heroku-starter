import React, {useState} from 'react';
import MUIRichTextEditor from 'mui-rte';
import {convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const NotificationEditor = () => {
  const [editorState, setEditorState] = useState(null);

  const _handleSave = (data) => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    console.log('markup', markup);
    const json = JSON.stringify({markup});
    console.log('json', json);
  };

  const _handleChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <div className="App">
      <MUIRichTextEditor
        label="Start typing..."
        onChange={_handleChange}
        onSave={_handleSave}
      />
    </div>
  );
};

export default NotificationEditor;
