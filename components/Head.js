import Head from "next/head";
import { _get } from "lodash";
import fields from "@/fields";
import { useRouter } from "next/router";

export default function NewHead() {
  const router = useRouter();
  let { field } = router.query;
  const name = _.get(fields, [field, "name"], "");

  return (
    <Head>
      <title>Walnut Creek Little League – {name}</title>
      <meta name="description" content="Fields, weather, status and more..." />
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
  );
}
