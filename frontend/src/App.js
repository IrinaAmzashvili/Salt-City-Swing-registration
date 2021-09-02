import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import SignUpFormPage from "./components/SignUpFormPage";
import Navigation from "./components/Navigation";
import ClassesComponent from "./components/ClassesComponent";
import SingleClassComponent from "./components/SingleClassComponent";
import UserPage from './components/UserPage';
import UserAccount from './components/UserAccount';
import Footer from './components/Footer';
import CreateClass from './components/CreateClass';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <ClassesComponent />
          </Route>
          <Route exact path="/signup">
            <SignUpFormPage />
          </Route>
          <Route exact path='/classes/create'>
            <CreateClass />
          </Route>
          <Route exact path="/classes/:classId">
            <SingleClassComponent />
          </Route>
          <Route exact path='/user/:userId/account'>
            <UserAccount />
          </Route>
          <Route exact path='/user/:userId'>
            <UserPage />
          </Route>
          <Route>
            <div style={{ height: '70vh' }}>
              <h2>404 Page Not Found</h2>
            </div>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
