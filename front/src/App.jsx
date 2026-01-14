import React, { Suspense } from 'react'
import { GlobalProvider } from './contexts/globalContext'
import Routes from './routes'
import { PrimeReactProvider } from 'primereact/api'
import ErrorBoundary from './utils/errorBoundary';

const Loading = React.lazy(() => import('./components/loading'));

const App = () => {

  return (
    <ErrorBoundary>
      <PrimeReactProvider>
        <GlobalProvider>
          <Suspense fallback={<Loading />}>
            <Routes />
          </Suspense>
        </GlobalProvider>
      </PrimeReactProvider>
    </ErrorBoundary>
  )
}

export default App