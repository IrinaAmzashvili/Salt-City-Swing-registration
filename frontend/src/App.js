import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import SignUpFormPage from "./components/SignUpFormPage";
import Navigation from "./components/Navigation";
import ClassesComponent from "./components/ClassesComponent";
import SingleClassComponent from "./components/SingleClassComponent";
import UserPage from './components/UserPage';
import Footer from './components/Footer';

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
          <Route path="/signup">
            <SignUpFormPage />
          </Route>
          <Route path="/classes/:classId">
            <SingleClassComponent />
          </Route>
          <Route path='/user/:userId'>
            <UserPage />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
