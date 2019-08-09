import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export default function GroupedButtons() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ButtonGroup fullWidth aria-label="full width outlined button group">
          <Button>Full</Button>
          <Button>width</Button>
          <Button>ButtonGroup</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
