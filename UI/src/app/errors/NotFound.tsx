import {Button, Container, Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const NotFound = () => {
  return (
    <Container component={Paper}>
      <Typography variant="body1">Hmm... Couldn't find what you were looking for...</Typography>
      <Button fullWidth component={Link} to="/catalog">Go back to store</Button>
    </Container>
  )
}

export default NotFound;