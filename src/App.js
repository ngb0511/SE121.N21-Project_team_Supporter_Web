import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
import { Fragment } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

//Main page
function App() {
  const [isLogIn, setIsLogIn] = useState(0);
  useEffect(() => {
    if (sessionStorage.getItem('isLogIn') == 1) {
      setIsLogIn(1);
    } else setIsLogIn(0);
  }, []);

  return (
    <Router>
      <div className="App">
        {sessionStorage.getItem('isLogIn') == 1 ? (
          <Routes>
            {privateRoutes.map((route, index) => {
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        ) : (
          <></>
        )}
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
