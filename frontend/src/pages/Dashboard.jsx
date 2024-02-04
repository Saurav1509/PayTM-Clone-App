import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

function Dashboard() {

  return <div>
    <Appbar label={"PayTM App"} firstName={localStorage.getItem("firstName")} />
    <Balance balance={"10,000"} />
    <Users label={"Search for Users to send money"} />
  </div>
}


export default Dashboard;
