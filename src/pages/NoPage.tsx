import React from 'react';
import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const NoPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Status 404
          </Typography>
          <Typography variant="h5" component="div" sx={{ my: 1 }}>
            No Page Found
          </Typography>
          <Typography color="text.secondary">
            The page you are looking for does not exist.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" component={Link} to="/cocktails?filter=name">
            Go to home page
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default NoPage;
