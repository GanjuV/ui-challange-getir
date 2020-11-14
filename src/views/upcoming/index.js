import React from 'react';

import {
  Box,
  Container,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from '../../components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Upcoming = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="upcoming"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
            Upcoming: The page you are looking is under process.
          </Typography>
        </Container>
      </Box>
    </Page>
  );
};

export default Upcoming;
