import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import FooterComponent from './components/FooterComponent/FooterComponent';
import { Fragment } from 'react';
import Loading from './components/LoadingComponent/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div>
      <Loading isPending={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              const ShowFooter = route.isShowFooter ? FooterComponent : Fragment;
              if (route.path && typeof route.path === 'string') {
                return (
                  <Route key={route.path} path={route.path} element={
                    <Layout>
                      <Page />
                      <ShowFooter />
                    </Layout>
                  } />

                )
              }
              return null;
            }
            )}
          </Routes>
        </Router>
      </Loading>
    </div>
  )
}

export default App