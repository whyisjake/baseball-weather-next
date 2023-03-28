import { router } from "next/router";
import fields from "@/fields.js";
import Fields from "@/components/fields/Fields.js";

export default function FieldDetails() {
  // Get the field.
  let field = router.query.field[0] || router.query.field;
  let fieldDetails = fields[field];

  // Dynimically load the field details based on the name of the field.
  // If the field is yve, load the Fields.yve component.
  // If the field is bancroft, load the Fields.bancroft component.
  // If the field is not found, load the Fields.default component.
  if (field === "yve") {
    return (
      <div className="card widget" id="field-details">
        <Fields.yve />
      </div>
    );
  } else {
    return (
      <div className="card widget" id="field-details">
        <div className="card-body">No details found for this field.</div>
      </div>
    );
  }
}
