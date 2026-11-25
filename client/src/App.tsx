import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import Area from "@/pages/Area";
import Pedido from "@/pages/Pedido";
import Policies from "@/pages/Policies";
import Catalogo from "@/pages/Catalogo";
import Seguimento from "@/pages/Seguimento";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/loja/:area">{(p: { area: string }) => <Area id={p.area} />}</Route>
      <Route path="/pedido" component={Pedido} />
      <Route path="/catalogo" component={Catalogo} />
      <Route path="/brindes" component={Catalogo} />
      <Route path="/seguimento" component={Seguimento} />
      <Route path="/politicas"><Policies initialTab="termos" /></Route>
      <Route path="/privacidade"><Policies initialTab="privacidade" /></Route>
      <Route path="/termos"><Policies initialTab="termos" /></Route>
      <Route path="/devolucoes"><Policies initialTab="devolucoes" /></Route>
      <Route path="/garantia"><Policies initialTab="garantia" /></Route>
      <Route path="/ral"><Policies initialTab="ral" /></Route>
      <Route path="/livro-reclamacoes"><Policies initialTab="livro-reclamacoes" /></Route>
      {/* Endereços antigos (Natal, produtos, etc.) vão para a página inicial */}
      <Route component={Home} />
    </Switch>
  );
}

export default App;
