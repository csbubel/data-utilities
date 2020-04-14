import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Container, Grid, Segment } from "semantic-ui-react";
import Nav from "./Nav";
import Duplicates from "./Duplicates";
import DataComparer from "./DataComparer";

const App = () => {
  return (
    <Router>
      <Container style={{ paddingTop: "60px" }}>
        <Grid>
          <Grid.Column width={4}>
            <Nav />
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Segment inverted>
              <Switch>
                <Route exact path="/duplicates">
                  <Duplicates />
                </Route>
                <Route exact path="/compare">
                  <DataComparer />
                </Route>
              </Switch>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </Router>
  );
}

export default App;
