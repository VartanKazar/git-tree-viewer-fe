import './App.css';
import GraphPage from './Pages/GraphPage';
import CommitPage from './Pages/CommitPage';
import HomePage from './Pages/HomePage';
import { ApiHandlerProvider } from './Helpers/ApiHandler';

import { Routes, Route } from 'react-router-dom';
import { GlobalStoreProvider } from './Helpers/GlobalStore';


function App() {
  return (
    <GlobalStoreProvider>
      <ApiHandlerProvider>
        <div className="App">
          <Routes>
              <Route path="/commit" element={<CommitPage/>}/>
              <Route path="/graph" element={<GraphPage/>}/>
              <Route path="/" element={<HomePage/>}/>
          </Routes>
        </div>
      </ApiHandlerProvider>
    </GlobalStoreProvider>
  );
}

export default App;
