import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/a:id" component={DetailPage} />
        <Route exact path="/b:id" component={DetailPage} />
      </Switch>
    </Router>
  );
}

export default App;
