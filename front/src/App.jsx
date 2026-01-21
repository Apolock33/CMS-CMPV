import { PrimeReactProvider } from 'primereact/api'
import React, { Suspense } from 'react'
import { GlobalProvider } from './contexts/globalContext'
import ErrorBoundary from './utils/errorBoundary';
import Routes from './routes'

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