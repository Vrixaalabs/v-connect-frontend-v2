import { ApolloProvider } from '@apollo/client';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import routes from '~react-pages';
import AuthProvider from '@/components/AuthProvider';
import LoadingSpinner from '@/components/LoadingSpinner';
import RouteWrapper from '@/components/RouteWrapper';
import { ToastProvider } from './components/ui/toast';
import { apolloClient } from './lib/graphql';
import { store } from './store';
// import Navigation from './components/Navigation'

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <ToastProvider>
            <div className='min-h-screen bg-background'>
              {/* <Navigation /> */}
              <main>
                <Suspense fallback={<LoadingSpinner size='lg' className='min-h-[400px]' />}>
                  <RouteWrapper>{useRoutes(routes)}</RouteWrapper>
                </Suspense>
              </main>
            </div>
          </ToastProvider>
        </AuthProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
