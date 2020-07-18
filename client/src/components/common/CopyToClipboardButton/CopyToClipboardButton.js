import React, {useRef} from 'react';
import toastr from 'toastr';
import {IconButton} from '@material-ui/core';
import {FileCopy} from '@material-ui/icons';
import useStyles from './styles';

const CopyToClipboardButton = ({text}) => {
  const styles = useStyles();

  const textAreaRef = useRef(null);

  const _copyToClipboard = () => {
    textAreaRef.current.select();
    document.execCommand('copy');
    toastr.success('Copied to clipboard');
  };

  return (
    <IconButton
      aria-label="Copy to Clipboard"
      color="primary"
      onClick={_copyToClipboard}
    >
      <FileCopy />
      <textarea
        className={styles.offscreen}
        ref={textAreaRef}
        value={text}
        readOnly
        aria-hidden="true"
      />
    </IconButton>
  );
};

export default CopyToClipboardButton;
