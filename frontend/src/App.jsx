import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { GlobalContextProvider } from "./context/GlobalContext";

import Assistant from "./pages/Assistant";
import MyChats from "./pages/MyChats";

function SimplePage({ title }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <h1 className="text-2xl font-bold text-slate-700">
        {title}
      </h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <GlobalContextProvider>

        <Routes>

          <Route
            path="/"
            element={
              <Navigate
                to="/assistant"
                replace
              />
            }
          />

          <Route
            path="/assistant"
            element={<Assistant/>}
          />

          <Route
            path="/dashboard"
            element={
              <SimplePage title="Dashboard" />
            }
          />

          <Route
            path="/standards"
            element={
              <SimplePage title="Indian Standards" />
            }
          />

          <Route
            path="/certification"
            element={
              <SimplePage title="Certification" />
            }
          />

          <Route
            path="/laboratories"
            element={
              <SimplePage title="Laboratories" />
            }
          />

          <Route
            path="/hallmarking"
            element={
              <SimplePage title="Hallmarking" />
            }
          />

          <Route
            path="/consumer-zone"
            element={
              <SimplePage title="Consumer Zone" />
            }
          />

          <Route
            path="/document-library"
            element={
              <SimplePage title="Document Library" />
            }
          />

          <Route
            path="/ask-question"
            element={
              <SimplePage title="Ask a Question" />
            }
          />

          <Route
            path="/my-chats"
            element={<MyChats />}
          />

          <Route
            path="/saved-results"
            element={
              <SimplePage title="Saved Results" />
            }
          />

          <Route
            path="/feedback"
            element={
              <SimplePage title="Feedback" />
            }
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/assistant"
                replace
              />
            }
          />

        </Routes>

      </GlobalContextProvider>

    </BrowserRouter>
  );
}

export default App;