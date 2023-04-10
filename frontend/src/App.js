import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import Groups from "./components/Groups"
import Events from "./components/Events"
import GroupDetails from "./components/GroupDetails"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/groups'>
            <Groups />
          </Route>
          <Route exact path='/groups/:groupId'>
            <GroupDetails />
          </Route>
          <Route exact path='/events'>
            <Events />
          </Route>
          <Route>
            Page Not Found
          </Route>
        </Switch>}
    </>
  );
}

export default App;
