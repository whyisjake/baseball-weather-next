import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";
import fields from "@/fields";
import { useRouter } from "next/router";

export function Navigation(props) {
  const router = useRouter();
  let { field } = router.query;
  if (field === undefined) {
    field = "bancroft";
  }

  // For each field, return a list item with the field name.
  return (
    <>
      {Object.entries(fields)
        .sort((a, b) => a[1].name.localeCompare(b[1].name))
        .map(([key, value]) => (
          <Link
            href={`/field/${key}`}
            className={
              field === key
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }
            key={key}
          >
            {value.name}
          </Link>
        ))}
    </>
  );
}

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
