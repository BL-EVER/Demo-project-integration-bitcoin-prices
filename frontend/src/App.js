import ShowcasePrices from "./Components/ShowcasePrices";
import useApi from "./hooks/useApi";
import Header from "./Components/Header";
import ForecastPrices from "./Components/ForecastPrices";

function App() {
    const data = useApi();
  return (
    <div>
        <Header />
        <ShowcasePrices data={data}/>
        <ForecastPrices data={data} />
    </div>
  );
}

export default App;
