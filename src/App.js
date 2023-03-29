import "./App.css";
import {  Route, Switch } from "react-router-dom";
import Sidebar_container from "./components/StackOverflow/Sidebar_container";
import Question from "./components/Add-Questions/Question";
import ViewQuestion from "./components/ViewQuestion/ViewQuestion";
import Login from "./components/LoginPg/LoginPg";
import ForgotPassword from "./components/LoginPg/reset";



function App() {

  return (
    <div className="App">
      <Switch> 
        <Route exact path="/" component={Login}/>
        <Route path="/reset" component={ForgotPassword}/> 
        <Route path="/mainpg" component={Sidebar_container}/> 
        <Route path="/addquestions" component={Question}/> 
        <Route path="/question" component={ViewQuestion}/>
      </Switch>
    </div>
  );
}

export default App;
