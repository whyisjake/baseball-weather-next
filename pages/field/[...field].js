import Head from "next/head";
import { Inter } from "next/font/google";
import { Navigation } from "../_document";
import { useRouter } from "next/router";
import fields from "../../fields";
import { WeatherDetails, GoogleMap } from "@/components/WeatherDetails";
import { RotatingLines } from "react-loader-spinner";
import { useWeather } from "@/components/helpers/_fetcher";
import Panels from "@/components/Panels";
import _ from "lodash";

const inter = Inter({ subsets: ["latin"] });

export default function Field(props) {
  const router = useRouter();
  const field = _.get(router.query.field, [0], "");
  const page = _.get(router.query.field, [1], "");

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
          <div className="col-sm-4">
            <div className="list-group" id="fields">
              <Navigation />
            </div>
          </div>
          <div className="col-sm-8">
            <div className="card widget">
              <div className="card-img-top">
                <GoogleMap {...location} />
              </div>
              <div className="card-body">
                <h1 className="card-title" id="school">
                  {name}
                </h1>
              </div>
              <WeatherDetails {...data} />
            </div>
            <Panels active={page} />
          </div>
        </div>
      </main>
    </>
  );
}
