import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Router from './routers/router'
import Backend from 'i18next-http-backend';
import Loader from './components/loader';
import { initReactI18next } from 'react-i18next';
import { Loader } from "i18next";
import './App.css';

i18n.use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false
    }
  })

function App() {
  return (
    <Supense fallback={<Loader />}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Supense>
  )
}

export default App;
