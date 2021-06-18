import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
    <>
      <h1>Salt City Swing Registration</h1>
      <Switch>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
