import React from 'react';
import {GlobalMessage} from 'components/common';

const MESSAGES = [
  'Wait...go where now?',
  "Now isn't this embarassing?",
  "I think we're lost, Rick.",
  'Uh oh!',
];

const NotFound = () => {
  const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  return <GlobalMessage text={message} />;
};

export default NotFound;
