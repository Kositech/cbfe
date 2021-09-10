import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Router from './routers/router'
import Backend from 'i18next-http-backend';
import Loader from './components/loader';
import { initReactI18next } from 'react-i18next';
import i18n from "i18next";
import './css/side-menu.scss'
import './css/nav-top.scss'
import './css/dropdown.scss'
import './css/icon.scss'
import './App.scss';
import './css/common.scss'
import './css/responsive.scss'

i18n.use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: ['zh-HK','en'],
    debug: true,

    interpolation: {
      escapeValue: false
    }
  })

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Suspense>
  )
}

export default App;
