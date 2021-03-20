import { useContext } from "react";
import OptionAdd from "./components/OptionAdd";
import OptionChart from "./components/OptionChart";
import OptionList from "./components/OptionList";
import { SocketContext } from "./context/SocketContext";

function HomePage() {

    const {online} = useContext(SocketContext);

    return (
        <div className="container">
            <div className="alert">
                <p>
                    Service status:
                    {
                        online
                        ? <span className="text-success"> Online </span>
                        : <span className="text-danger"> Offline </span>
                    }
                </p>
            </div>
            <h1>Options</h1>
            <hr/>
            <div className="row">
                <div className="col">
                    <OptionChart />
                </div>
            </div>
        <div className="row">
            <div className="col-8">
                <OptionList />
            </div>
            <div className="col-4">
                <OptionAdd />
            </div>
          </div>
        </div>
    );
}

export default HomePage;
