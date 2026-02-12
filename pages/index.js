import { Navigation } from "./_document";
import fields from "@/fields";
import _ from "lodash";
import { RotatingLines } from "react-loader-spinner";
import { useWeather } from "@/components/helpers/_fetcher";
import Panels from "@/components/Panels";
import PrimaryCard from "@/components/PrimaryCard";
import Head from "@/components/Head";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { getDefaultField } from "@/utils/geolocation";

export default function Home({ props }) {
  const [field, setField] = useState("bancroft");
  
  useEffect(() => {
    getDefaultField().then(setField);
  }, []);
  let page = "weather";
  const { data, isLoading, isError } = useWeather(field);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="hidden lg:block lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft dark:shadow-gray-900/50 p-4 lg:sticky lg:top-20" id="fields">
              <Navigation />
            </div>
          </aside>
          <div className="w-full lg:w-2/3 space-y-6">
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
