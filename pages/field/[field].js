import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Navigation } from '../_document'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Walnut Creek Little League Fields</title>
        <meta name="description" content="Fields, weather, status and more..." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <h1>
          Walnut Creek Little League Fields
        </h1>
        <p>Click on a field to see the current weather.</p>
        <div className="row">

          <div className="col-med-4 col-4">
            <div className="list-group" id="fields">
              <Navigation />
            </div>

          </div>
          <div className="col-med-8 col-8">
            <div className="card" id="widget">
              <div className="card-header"></div>
              <div className="card-body">
                <h5 className="card-title" id="school"></h5>
              </div>
              <ul className="list-group list-group-flush" id="weatherDetails">
                <li className="list-group-item card-text"><span id="temperature"></span> <span className="font-thin">&#8457;</span></li>
                <li className="list-group-item"><span id="wind" className="text-3xl font-bold"></span> <span className="text-3xl">Wind</span></li>
                <li className="list-group-item"><span id="uv" className="text-3xl font-bold"></span> <span className="text-3xl">UV</span></li>
                <li className="list-group-item"><span className="text-3xl font-bold"><span id="cloud"></span>%</span> <span className="text-3xl">Cloud</span></li>
                <li className="list-group-item"><strong>Forecast for today:</strong></li>
              </ul>
            </div>
            <div className="text-center mt-10">
              Weather data provided by <a href="https://weather-data.apple.com/legal-attribution.html">Apple WeatherKit</a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
