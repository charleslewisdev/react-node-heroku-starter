import React from 'react';
import {CenteredContent} from 'components/common';
import useStyles from './styles';

const Home = () => {
  const styles = useStyles();

  return (
    <CenteredContent>
      <div className={styles.Home}>
        <h1>Welcome to the AgNotify, the agnostic notification service</h1>
        <p>
          AgNotify is a simple notification service that can easily be
          integrated with your web apps. We call it "agnostic" because unlike
          other solutions, AgNotify does not need to sync with your app's user
          database. The notifications you create can contain formatted text,
          lists, links and more by supporting HTML and Markdown formats.
        </p>
        <p>Select an option from the navigation menu to begin</p>
      </div>
    </CenteredContent>
  );
};

export default Home;
