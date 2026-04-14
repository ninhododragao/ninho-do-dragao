import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import Policies from "@/pages/Policies";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/politicas">
        <Policies initialTab="termos" />
      </Route>
      <Route path="/privacidade">
        <Policies initialTab="privacidade" />
      </Route>
      <Route path="/termos">
        <Policies initialTab="termos" />
      </Route>
      <Route path="/devolucoes">
        <Policies initialTab="devolucoes" />
      </Route>
      <Route path="/envio">
        <Policies initialTab="envio" />
      </Route>
    </Switch>
  );
}

export default App;
