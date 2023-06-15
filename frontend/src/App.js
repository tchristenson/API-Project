import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import Groups from "./components/Groups"
import GroupDetails from "./components/GroupDetails"
import Events from "./components/Events"
import EventDetails from "./components/EventDetails";
import CreateGroupForm from "./components/GroupNewForm";
import EditGroupForm from "./components/GroupEditForm";
import CreateEventForm from "./components/EventNewForm";
import UserProfilePage from "./components/UserProfilePage";

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
          <Route exact path='/groups/new'>
            <CreateGroupForm />
          </Route>
          <Route exact path='/groups/:groupId/events/new'>
            <CreateEventForm />
          </Route>
          <Route exact path='/groups/:groupId/edit'>
            <EditGroupForm />
          </Route>
          <Route exact path='/groups/:groupId'>
            <GroupDetails />
          </Route>
          <Route exact path='/events'>
            <Events />
          </Route>
          <Route exact path='/events/:eventId'>
            <EventDetails />
          </Route>
          <Route exact path="/users/:userId">
              <UserProfilePage />
            </Route>
          <Route>
            Page Not Found
          </Route>
        </Switch>}
    </>
  );
}

export default App;
