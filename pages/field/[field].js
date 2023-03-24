import Head from "next/head";
import { Inter } from "next/font/google";
import { Navigation } from "../_document";
import { useRouter } from "next/router";
import fields from "../../fields";
import { WeatherDetails, GoogleMap } from "@/components/_weather-details";
import Info from "@/components/_info";
import Hourly from "@/components/Hourly";
import { RotatingLines } from "react-loader-spinner";
import { useWeather } from "@/components/helpers/_fetcher";
import _, { compact } from "lodash";

const inter = Inter({ subsets: ["latin"] });

export default function Field(props) {
  const router = useRouter();
  let { field } = router.query;

  const { data, isLoading, isError } = useWeather(field);

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        ></RotatingLines>
      </div>
    );
  if (isError) return <p></p>;
  if (!data) return <p></p>;

  const name = _.get(fields, [field, "name"], "");
  const location = _.get(fields, [field, "location"], {});

  return (
    <>
      <Head>
        <title>Walnut Creek Little League – {name}</title>
        <meta
          name="description"
          content="Fields, weather, status and more..."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <h1>Walnut Creek Little League Fields</h1>
        <p>Click on a field to see the current weather.</p>
        <div className="row">
          <div className="col-med-4 col-4">
            <div className="list-group" id="fields">
              <Navigation />
            </div>
          </div>
          <div className="col-med-8 col-8">
            <div className="card" id="widget">
              <div className="card-header">
                <GoogleMap {...location} />
              </div>
              <div className="card-body">
                <h5 className="card-title" id="school">
                  {name}
                </h5>
              </div>
              <WeatherDetails {...data} />
            </div>
            <Hourly field={field} />
            <Info field={field} />
          </div>
        </div>
      </main>
    </>
  );
}
