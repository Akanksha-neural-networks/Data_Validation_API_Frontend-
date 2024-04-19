import * as React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

interface NextButtonsProps {
  selectedValues: any;
}

const NextButtons: React.FC<NextButtonsProps> = ({selectedValues}) => {
  const queryValues = encodeURIComponent(JSON.stringify(selectedValues));

  return (
    <Link href={{pathname: '/dashboard', query: {values: queryValues}}}>
      <Button variant="contained" endIcon={<SendIcon />}>
        Next
      </Button>
    </Link>
  );
};

export default NextButtons;
