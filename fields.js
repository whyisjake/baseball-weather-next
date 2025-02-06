// export locations of baseball fields with their names.

const fields = {
  murwood: {
    name: "Murwood Elementary School",
    location: {
      lat: 37.884,
      lng: -122.049,
    },
    address: "2050 Vanderslice Ave, Walnut Creek, CA 94596, USA",
    placeID: "ChIJGycZRniKj4ARhazimMXcAY8",
    fields: [
      {
        name: "Field 1",
        division: "Baseball Farm",
      },
      {
        name: "Field 2",
        division: "Baseball Peanuts",
      },
    ],
  },
  foothill: {
    name: "Foothill Middle School",
    location: {
      lat: 37.92109278625953,
      lng: -122.01746979286138,
    },
    address: "2775 Cedro Ln, Walnut Creek, CA 94598",
    placeID: "ChIJJ6DVYUJghYAR2UdfX0AemTQ",
    fields: [
      {
        name: "Field 1",
        division: "60/90 Junior/Senior Baseball Field",
      },
      {
        name: "Field 2",
        division: "50/70 Intermediate Baseball Field",
      },
    ],
  },
  "oak-grove": {
    name: "Oak Grove Middle School",
    location: {
      lat: 37.939,
      lng: -122.035,
    },
    address: "2050 Minert Rd, Concord, CA 94518",
    placeID: "ChIJG2TlFONghYARWTdKXAsD9vc",
    fields: [
      {
        name: "Field 1",
        division: "Baseball Single-A",
      },
      {
        name: "Field 2",
        division: "Baseball Farm",
      },
    ],
  },
  yve: {
    name: "Ygnacio Valley Elementary School",
    info: true,
    location: {
      lat: 37.951,
      lng: -122.029,
    },
    address: "2217 Chalomar Rd, Concord, CA 94518",
    placeID: "ChIJ-Z6JqN1ghYARojRW9CAy8mU",
    fields: [
      {
        name: "Field 1",
        division: "Baseball AA",
      },
      {
        name: "Field 2",
        division: "Baseball AAA",
      },
    ],
  },
  vve: {
    name: "Valle Verde Elementary School",
    location: {
      lat: 37.933,
      lng: -122.0136,
    },
    address: "3275 Peachwillow Lane, Walnut Creek, CA 94598",
    placeID: "ChIJ3auoPmBghYARZin6TwL3jTw",
    fields: [
      {
        name: "Field 1",
        division: "Baseball Peanuts",
      },
      {
        name: "Field 2",
        division: "Baseball Farm",
      },
    ],
  },
  "castle-rock": {
    name: "Castle Rock Sports Complex",
    location: {
      lat: 37.911,
      lng: -122.011,
    },
    address: "800 Hutchinson Rd, Walnut Creek, CA 94596",
    placeID: "ChIJa4xEJxRghYARQ1Hv6ck96Vo",
    fields: [
      {
        name: "Field 1",
        division: "Softball Majors",
      },
      {
        name: "Field 2",
        division: "Baseball Majors",
      },
    ],
  },
  wci: {
    name: "Walnut Creek Intermediate School",
    location: {
      lat: 37.91,
      lng: -122.058,
    },
    address: "2425 Walnut Blvd, Walnut Creek, CA 94597",
    placeID: "ChIJ159qfLxhhYAR87OqTFcMb-8",
    fields: [
      {
        name: "Field 1",
        division: "Softball Juniors",
      },
      {
        name: "Field 2",
        division: "Baseball Majors",
      },
    ],
  },
  "indian-valley": {
    name: "Indian Valley Elementary School",
    location: {
      lat: 37.899,
      lng: -122.032,
    },
    address: "551 Marshall Dr, Walnut Creek, CA 94598",
    placeID: "ChIJ0QUB_jFghYAR6f8uL6snZ3w",
    fields: [
      {
        name: "Field 1",
        division: "Baseball AAA",
      },
      {
        name: "Field 2",
        division: "Baseball AA",
      },
    ],
  },
  parkmead: {
    name: "Parkmead Elementary School",
    location: {
      lat: 37.887,
      lng: -122.066,
    },
    address: "1920 Magnolia Way, Walnut Creek, CA 94595",
    placeID: "ChIJl_vLTN5hhYARkfRkbs3EJY0",
    fields: [
      {
        name: "Field 1",
        division: "Baseball Single-A",
      },
      {
        name: "Field 2",
        division: "Baseball Farm",
      },
    ],
  },
  tice: {
    name: "Tice Valley Park",
    location: {
      lat: 37.875,
      lng: -122.071,
    },
    address: "2055 Tice Valley Blvd Walnut Creek, CA 94596",
    placeID: "ChIJA0yXjQiKj4ARpvSybS8MovY",
    fields: [
      {
        name: "Field 1",
        division: "Baseball Peanuts",
      },
    ],
  },
  bancroft: {
    name: "Bancroft Elementary School",
    location: {
      lat: 37.929,
      lng: -122.039,
    },
    address: "2200 Parish Dr, Walnut Creek, CA 94598",
    placeID: "ChIJD1BIyf9ghYARMVJdxswymhI",
    fields: [
      {
        name: "Field 1",
        division: "Softball AAA/AA",
      },
      {
        name: "Field 2",
        division: "Baseball Intermediates",
      },
    ],
  },
  "buena-vista": {
    name: "Buena Vista Elementary School",
    location: {
      lat: 37.914,
      lng: -122.071,
    },
    address: "2355 San Juan Ave, Walnut Creek, CA 94597",
    placeID: "ChIJ19ChkJxhhYARs4neQ5NInik",
    fields: [
      {
        name: "Field 1",
        division: "Softball AAA/AA",
      },
      {
        name: "Field 2",
        division: "Softball Single-A",
      },
    ],
  },
  "walnut-heights": {
    name: "Walnut Heights Elementary School",
    location: {
      lat: 37.894,
      lng: -122.037,
    },
    address: "4064 Walnut Blvd, Walnut Creek, CA 94596",
    placeID: "ChIJlUZ9wSxghYARdTz-kq3Oc0o",
    fields: [
      {
        name: "Field 1",
        division: "Softball Single-A",
      },
    ],
  },
};

module.exports = fields;
