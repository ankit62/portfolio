import React, { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Portfolio from "./pages/Portfolio";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoadingComplete = (): void => {
    setIsLoading(false);
  };

  return (
    <div className="App">
      {/* {isLoading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : ( */}
        <Portfolio />
      {/* )} */}
    </div>
  );
};

export default App;
