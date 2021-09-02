import React from 'react';
import Box from '@material-ui/core/Box';
import BounceLoader from 'react-spinners/BounceLoader';

const Spinner = () => (
  <Box
    position="fixed"
    top="45%"
    left="50%"
  >
    <BounceLoader size={80} color="#009150" />
  </Box>
);

export default Spinner;
