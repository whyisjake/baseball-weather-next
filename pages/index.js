import Head from "next/head";
import { Navigation } from "./_document";
import fields from "@/fields";
import { WeatherDetails, GoogleMap } from "@/components/WeatherDetails";
import _ from "lodash";
import { RotatingLines } from "react-loader-spinner";
import { useWeather } from "@/components/helpers/_fetcher";
import Header from "@/components/Header";
import Panels from "@/components/Panels";

export default function Home({ props }) {
  let field = "bancroft";
  let page = "weather";
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
        <title>Walnut Creek Little League Fields</title>
        <meta
          name="description"
          content="Fields, weather, status and more..."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container">
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
