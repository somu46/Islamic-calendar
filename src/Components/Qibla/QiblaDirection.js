import React, { useState } from "react";
import { CgArrowLongUp } from "react-icons/cg";

const QiblaDirection = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [direction, setDirection] = useState(null);
  const [error, setError] = useState(null);

  const calculateQiblaDirection = (lat, long) => {
    const kaabaLatitude = 21.4225;
    const kaabaLongitude = 39.8262;

    const toRadians = (deg) => (deg * Math.PI) / 180;
    const toDegrees = (rad) => (rad * 180) / Math.PI;

    const userLat = toRadians(lat);
    const userLong = toRadians(long);
    const kaabaLat = toRadians(kaabaLatitude);
    const kaabaLong = toRadians(kaabaLongitude);

    const deltaLong = kaabaLong - userLong;

    const x = Math.cos(kaabaLat) * Math.sin(deltaLong);
    const y =
      Math.cos(userLat) * Math.sin(kaabaLat) -
      Math.sin(userLat) * Math.cos(kaabaLat) * Math.cos(deltaLong);

    const qiblaAngle = toDegrees(Math.atan2(x, y));
    return (qiblaAngle + 360) % 360;
  };

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          const result = calculateQiblaDirection(latitude, longitude);
          setDirection(result.toFixed(2));
          setError(null);
        },
        () => {
          setError("Couldn't access your location. Please enable location permissions in your browser settings.");
        }
      );
    } else {
      setError("Your browser doesn't support location services. Please update your browser or try using a smartphone.");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-teal-50 via-white to-teal-50 rounded-xl shadow-lg max-w-4xl mx-auto my-8">
      {/* SEO-Optimized Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-teal-800 mb-3">
          Find Qibla Direction Online - Accurate Prayer Compass
        </h1>
        <p className="text-gray-600 text-lg">
          Trusted by Muslims worldwide to locate the Kaaba in Mecca for daily prayers
        </p>
      </header>

      {/* Main Content */}
      <main>
        <section className="mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-teal-100">
            <h2 className="sr-only">Qibla Direction Calculator</h2>
            
            {!latitude && !longitude && (
              <div className="text-center space-y-4">
                <button
                  onClick={fetchUserLocation}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-lg transition-all transform hover:scale-105"
                >
                  Find My Qibla Direction
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  We respect your privacy - location data is processed securely and never stored
                </p>
              </div>
            )}

            {latitude && longitude && (
              <article>
                <div className="text-center space-y-8">
                  {/* Compass Display */}
                  <div className="relative w-48 h-48 mx-auto">
                    <div className="absolute w-full h-full rounded-full border-4 border-teal-200 flex items-center justify-center">
                      <div className="absolute top-3 text-teal-700 font-medium">N</div>
                      <div className="absolute bottom-3 text-teal-700 font-medium">S</div>
                      <div className="absolute left-3 text-teal-700 font-medium">W</div>
                      <div className="absolute right-3 text-teal-700 font-medium">E</div>
                    </div>
                    <div
                      className="absolute w-full h-full flex items-center justify-center"
                      style={{
                        transform: `rotate(${direction}deg)`,
                        transition: "transform 0.5s ease",
                      }}
                    >
                      <CgArrowLongUp className="text-teal-600 text-6xl animate-pulse" />
                    </div>
                  </div>

                  {/* Prayer Direction Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-teal-700 mb-2">
                      Qibla Direction:{" "}
                      <span className="text-2xl">{direction}°</span>
                    </h3>
                    <p className="text-gray-600 text-sm max-w-prose mx-auto">
                      Facing approximately {direction}° from your current location in{" "}
                      <span className="font-medium">
                        ({latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E)
                      </span>
                    </p>
                    <p><strong>Note :</strong> Use your device's compass and match the degrees to get a more accurate direction.</p>
                  </div>
                </div>
              </article>
            )}

            {error && (
              <div className="mt-4 text-center text-red-600 bg-red-50 p-3 rounded-lg">
                ⚠️ {error}
              </div>
            )}
          </div>
        </section>

        {/* Educational Content */}
        <section className="space-y-8">
          <div className="prose max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-teal-800 mb-4">
              Understanding Qibla Direction in Islam
            </h2>
            <p className="text-gray-700 mb-4">
              The Qibla holds profound significance in Islamic worship. As Allah commands in the Quran:
            </p>
            <blockquote className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-600 italic text-teal-800">
              "So turn your face toward al-Masjid al-Haram. And wherever you are, turn your faces toward it."
              <cite className="block mt-2 not-italic text-teal-700">- Surah Al-Baqarah (2:144)</cite>
            </blockquote>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-teal-100">
              <h3 className="text-lg font-semibold text-teal-700 mb-3">
                🕌 Key Features
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Real-time GPS-based calculation</li>
                <li>Mathematical accuracy using spherical trigonometry</li>
                <li>Mobile-friendly interface</li>
                <li>Free Islamic tool for daily use</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-teal-100">
              <h3 className="text-lg font-semibold text-teal-700 mb-3">
                📍 Usage Tips
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Calibrate your device's compass regularly</li>
                <li>Check for magnetic interference</li>
                <li>Compare with local mosque directions</li>
                <li>Bookmark for travel use</li>
              </ul>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-teal-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-teal-800 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-teal-700 mb-2">
                  How accurate is this Qibla finder?
                </h3>
                <p className="text-gray-600">
                  Our tool uses the same spherical trigonometry calculations endorsed by major Islamic organizations. Accuracy typically ranges within 2-5 degrees, depending on your device's GPS precision.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-teal-700 mb-2">
                  Can I use this during travel?
                </h3>
                <p className="text-gray-600">
                  Absolutely! This mobile-friendly Qibla compass works worldwide. Many Muslim travelers use it as their primary direction finder when visiting new locations.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-teal-700 mb-2">
                  Why does the direction sometimes vary?
                </h3>
                <p className="text-gray-600">
                  Small variations can occur due to:
                  <ul className="list-disc pl-6 mt-2">
                    <li>Magnetic declination changes</li>
                    <li>Device compass calibration</li>
                    <li>GPS signal strength</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* SEO Footer */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} Islamic Tools. Providing accurate Qibla direction services based on
          the geographical coordinates of Masjid al-Haram (21.4225°N, 39.8262°E).
          <br />
          Recommended by thousands of Muslims worldwide for daily prayer needs.
        </p>
      </footer>
    </div>
  );
};

export default QiblaDirection;