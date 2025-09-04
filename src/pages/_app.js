import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import { store } from '@/store';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  );
}

export default appWithTranslation(App);
