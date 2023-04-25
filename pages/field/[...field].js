import Head from "next/head";
import { Navigation } from "../_document";
import { useRouter } from "next/router";
import fields from "@/fields";
import { RotatingLines } from "react-loader-spinner";
import { useWeather } from "@/components/helpers/_fetcher";
import _ from "lodash";
import Header from "@/components/Header";
import Panels from "@/components/Panels";
import PrimaryCard from "@/components/PrimaryCard";

export default function Field(props) {
  const router = useRouter();
  const field = _.get(router.query.field, [0], "");
  const page = _.get(router.query.field, [1], "weather");

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
  const address = _.get(fields, [field, "address"], "");
  const placeID = _.get(fields, [field, "placeID"], "");

  return (
    <>
      <Head>
        <title>Walnut Creek Little League – {name}</title>
        <meta
          name="description"
          content="Fields, weather, status and more..."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          href="https://assets.ngin.com/site_files/2365/favicon.ico"
        />
        <meta property="og:title" content="Home" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Youth baseball and softball in Walnut Creek and Concord, California"
        />
        <meta
          property="og:url"
          content="http://www.wclittleleague.org/page/show/5412507-home"
        />
        <meta property="og:site_name" content="Walnut Creek Little League" />
        <meta
          property="og:image"
          content="https://cdn1.sportngin.com/attachments/logo_graphic/c47d-185345966/wcll_logo_medium.png"
        />
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
            <PrimaryCard
              name={name}
              data={data}
              location={location}
              address={address}
              placeID={placeID}
            />
            <Panels active={page} />
          </div>
        </div>
      </main>
    </>
  );
}
