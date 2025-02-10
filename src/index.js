import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Root";
import App from "./App";
import {
  Error,
  IslamicCalendar,
  PrayerTimetable,
  AlQuran,
  Quran,
  SurahPage,
  Surahs,
  Juz,
  Translations,
  FullQuran,
  ZakatCalculator,
  DateConverter,
  ContactUs,
  BlogPage,
  About,
  PrayerTimes,
  IslamicHolidayPage,
  QiblaDir,
  PrivacyPolicy,
  Tandc,
} from "./Pages";
import Loading from "./Components/Loading/Loading";
import ChangeLocation from "./Components/SetLocation/ChangeLocation/ChangeLocation";
// import LocationTracker from "./Components/SetLocation/AutoDetectedLocation/LocationTracker";

import ApiTest from "./Test/test";
import {LocationTracker} from "./Store/stateLocationStore";

// Simulate a promise for loading delay
const waitPromise = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};


const Home = lazy(() =>
  waitPromise(1000).then(() => import("./Components/Home/Home"))
);




const Route = createBrowserRouter([
  {
    path: "",
    element: (
      <>
        <LocationTracker/>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/blogs",
        element: <BlogPage />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/change-location",
        element: <ChangeLocation />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <Tandc />,
      },

      {
        path: "/test-api",
        element: (
          <div className="min-h-screen mt-[6.5rem]">
            <ApiTest />
          </div>
        ),
      },
    ],
  },
  {
    path: "/essentials",
    element: <Root />,
    children: [
      {
        path: "/essentials/qibla-direction",
        element: <QiblaDir />,
      },

      {
        path: "/essentials/islamic-holidays",
        element: <IslamicHolidayPage />,
      },

      {
        path: "/essentials/zakat-calculator",
        element: <ZakatCalculator />,
      },
      {
        path: "/essentials/islamic-calendar",
        element: <IslamicCalendar />,
      },
      {
        path: "/essentials/prayer-times",
        element: <PrayerTimes />,
      },
      {
        path: "/essentials/prayer-times-table",
        element: <PrayerTimetable />,
      },
      {
        path: "/essentials/al-quran",
        element: <AlQuran/>,
      },
      {
        path: "/essentials/:surahNumber/:surahName-ayahs",
        element: <SurahPage />,
      },
      {
        path: "/essentials/full-quran",
        element: <FullQuran/>,
      },
      {
        path: "/essentials/surahs",
        element: <Surahs />,
      },
      {
        path: "/essentials/juz",
        element: <Juz />,
      },
      {
        path: "/essentials/translations",
        element: <Translations />,
      },
      {
        path: "/essentials/quran/translations/:identifier",
        element: <Quran />,
      },
      {
        path: "/essentials/date-converter",
        element: <DateConverter />,
      },

      {
        path: "*",
        element: <Error />,
      },
    ],
  },

  {
    path: "*",
    element: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.StrictMode>
      <RouterProvider router={Route} />
    </React.StrictMode>
  </>
);
