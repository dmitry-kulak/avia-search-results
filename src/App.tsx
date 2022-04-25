import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import styles from "./App.module.scss";
import Flights from "./components/Flights/Flights";
import SearchFilter from "./components/SearchFilter/SearchFilter";
import { AppContext } from "./index";

const App = observer(() => {
  const { fetchFlights } = useContext(AppContext);

  useEffect(() => {
    void fetchFlights();
  }, []);

  return (
    <div className={styles.app}>
      <SearchFilter />
      <Flights />
    </div>
  );
});

export default App;

App.displayName = "App";
