import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Today = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Task"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
         Today: The page you are looking is under process.
        </Box>
      </Container>
    </Page>
  );
};

export default Today;
