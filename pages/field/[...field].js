import { Navigation } from "../_document";
import { useRouter } from "next/router";
import fields from "@/fields";
import { RotatingLines } from "react-loader-spinner";
import { useWeather } from "@/components/helpers/_fetcher";
import _ from "lodash";
import Head from "@/components/Head";
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
      <Head />
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
