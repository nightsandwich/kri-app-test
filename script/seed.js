'use strict'

const {db, models: {User, State, County, Note} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  const al = await State.create({name: "Alabama", abbreviation: "AL"});
    const ak = await State.create({name: "Alaska", abbreviation: "AK"});
    const as = await State.create({name: "American Samoa", abbreviation: "AS"});
    const az = await State.create({name: "Arizona", abbreviation: "AZ"});
    const ar = await State.create({name: "Arkansas", abbreviation: "AR"});
    const ca = await State.create({name: "California", abbreviation: "CA"});
    const co = await State.create({name: "Colorado", abbreviation: "CO"});
    const ct = await State.create({name: "Connecticut", abbreviation: "CT"});
    const de = await State.create({name: "Delaware", abbreviation: "DE"});
    const dc = await State.create({name: "District Of Columbia", abbreviation: "DC"});
    const fm = await State.create({name: "Federated States Of Micronesia", abbreviation: "FM"});
    const fl = await State.create({name: "Florida", abbreviation: "FL"});
    const ga = await State.create({name: "Georgia", abbreviation: "GA"});
    const gu = await State.create({name: "Guam", abbreviation: "GU"});
    const hi = await State.create({name: "Hawaii", abbreviation: "HI"});
    const id = await State.create({name: "Idaho", abbreviation: "ID"});
    const il = await State.create({name: "Illinois", abbreviation: "IL"});
    const ind = await State.create({name: "Indiana", abbreviation: "IN"});
    const ia = await State.create({name: "Iowa", abbreviation: "IA"});
    const ks = await State.create({name: "Kansas", abbreviation: "KS"});
    const ky = await State.create({name: "Kentucky", abbreviation: "KY"});
    const la = await State.create({name: "Louisiana", abbreviation: "LA"});
    const me = await State.create({name: "Maine", abbreviation: "ME"});
    const mh = await State.create({name: "Marshall Islands", abbreviation: "MH"});
    const md = await State.create({name: "Maryland", abbreviation: "MD"});
    const ma = await State.create({name: "Massachusetts", abbreviation: "MA"});
    const mi = await State.create({name: "Michigan", abbreviation: "MI"});
    const mn = await State.create({name: "Minnesota", abbreviation: "MN"});
    const ms = await State.create({name: "Mississippi", abbreviation: "MS"});
    const mo = await State.create({name: "Missouri", abbreviation: "MO"});
    const mt = await State.create({name: "Montana", abbreviation: "MT"});
    const ne = await State.create({name: "Nebraska", abbreviation: "NE"});
    const nv = await State.create({name: "Nevada", abbreviation: "NV"});
    const nh = await State.create({name: "New Hampshire", abbreviation: "NH"});
    const nj = await State.create({name: "New Jersey", abbreviation: "NJ"});
    const nm = await State.create({name: "New Mexico", abbreviation: "NM"});
    const ny = await State.create({name: "New York", abbreviation: "NY", summary: 'Supreme, County Courts'});
    const nc = await State.create({name: "North Carolina", abbreviation: "NC"});
    const nd = await State.create({name: "North Dakota", abbreviation: "ND"});
    const mp = await State.create({name: "Northern Mariana Islands", abbreviation: "MP"});
    const oh = await State.create({name: "Ohio", abbreviation: "OH"});
    const ok = await State.create({name: "Oklahoma", abbreviation: "OK"});
    const or = await State.create({name: "Oregon", abbreviation: "OR"});
    const pw = await State.create({name: "Palau", abbreviation: "PW"});
    const pa = await State.create({name: "Pennsylvania", abbreviation: "PA"});
    const pr = await State.create({name: "Puerto Rico", abbreviation: "PR"});
    const ri = await State.create({name: "Rhode Island", abbreviation: "RI"});
    const sc = await State.create({name: "South Carolina", abbreviation: "SC"});
    const sd = await State.create({name: "South Dakota", abbreviation: "SD"});
    const tn = await State.create({name: "Tennessee", abbreviation: "TN"});
    const tx = await State.create({name: "Texas", abbreviation: "TX"});
    const ut = await State.create({name: "Utah", abbreviation: "UT"});
    const vt = await State.create({name: "Vermont", abbreviation: "VT"});
    const vi = await State.create({name: "Virgin Islands", abbreviation: "VI"});
    const va = await State.create({name: "Virginia", abbreviation: "VA"});
    const wa = await State.create({name: "Washington", abbreviation: "WA"});
    const wv = await State.create({name: "West Virginia", abbreviation: "WV"});
    const wi = await State.create({name: "Wisconsin", abbreviation: "WI"});
    const wy = await State.create({name: "Wyoming", abbreviation: "WY"});

    const xx = await State.create({name: "--Other Research Material--", abbreviation: "XX"});
    
    const other = ['Regulatory', 'Political', 'Databases'];
    await Promise.all(other.map(item => County.create({name: item, stateId: xx.id})));
    

    const txCounties = [
        {
          "county": "Austin",
          "stateId": 51
        },
        {
          "county": "Bell",
          "stateId": 51
        },
        {
          "county": "Bexar",
          "stateId": 51
        },
        {
          "county": "Bowie",
          "stateId": 51
        },
        {
          "county": "Brazoria",
          "stateId": 51
        },
        {
          "county": "Brazos",
          "stateId": 51
        },
        {
          "county": "Cass",
          "stateId": 51
        },
        {
          "county": "Collin",
          "stateId": 51
        },
        {
          "county": "Dallas",
          "stateId": 51
        },
        {
          "county": "Duval",
          "stateId": 51
        },
        {
          "county": "Fort Bend",
          "stateId": 51
        },
        {
          "county": "Harris",
          "stateId": 51
        }
       ];
       const nyCounties = [
        {
          "county": "Albany",
          "stateId": 37
        },
        {
          "county": "Allegany",
          "stateId": 37
        },
        {
          "county": "Broome",
          "stateId": 37
        }
    ];
  const caCounties = [
    {
      "county": "Alameda",
      "stateId": 6
    },
    {
      "county": "Los Angeles",
      "stateId": 6
    },
    {
      "county": "Sacramento",
      "stateId": 6
    },
    {
      "county": "San Benito",
      "stateId": 6
    },
    {
      "county": "San Bernardino",
      "stateId": 6
    },
    {
      "county": "San Diego",
      "stateId": 6
    },
    {
      "county": "San Francisco",
      "stateId": 6
    },
    {
      "county": "San Joaquin",
      "stateId": 6
    },
    {
      "county": "San Luis Obispo",
      "stateId": 6
    },
    {
      "county": "San Mateo",
      "stateId": 6
    },
    {
      "county": "Santa Barbara",
      "stateId": 6
    },
    {
      "county": "Santa Clara",
      "stateId": 6
    },
    {
      "county": "Santa Cruz",
      "stateId": 6
    },
    {
      "county": "Shasta",
      "stateId": 6
    },
    {
      "county": "Sierra",
      "stateId": 6
    },
    {
      "county": "Siskiyou",
      "stateId": 6
    },
    {
      "county": "Solano",
      "stateId": 6
    },
    {
      "county": "Sonoma",
      "stateId": 6
    },
    {
      "county": "Stanislaus",
      "stateId": 6
    },
    {
      "county": "Sutter",
      "stateId": 6
    },
    {
      "county": "Tehama",
      "stateId": 6
    },
    {
      "county": "Trinity",
      "stateId": 6
    },
    {
      "county": "Tulare",
      "stateId": 6
    },
    {
      "county": "Tuolumne",
      "stateId": 6
    },
    {
      "county": "Ventura",
      "stateId": 6
    },
    {
      "county": "Yolo",
      "stateId": 6
    },
    {
      "county": "Yuba",
      "stateId": 6
    }
   ];
  const flCounties = [
    {
      "county": "Alachua",
      "stateId": 12
    },
    {
      "county": "Baker",
      "stateId": 12
    },
    {
      "county": "Bay",
      "stateId": 12
    },
    {
      "county": "Bradford",
      "stateId": 12
    },
    {
      "county": "Brevard",
      "stateId": 12
    },
    {
      "county": "Broward",
      "stateId": 12
    },
    {
      "county": "Calhoun",
      "stateId": 12
    },
    {
      "county": "Charlotte",
      "stateId": 12
    },
    {
      "county": "Citrus",
      "stateId": 12
    },
    {
      "county": "Clay",
      "stateId": 12
    },
    {
      "county": "Collier",
      "stateId": 12
    },
    {
      "county": "Columbia",
      "stateId": 12
    },
    {
      "county": "DeSoto",
      "stateId": 12
    },
    {
      "county": "Dixie",
      "stateId": 12
    },
    {
      "county": "Duval",
      "stateId": 12
    },
    {
      "county": "Escambia",
      "stateId": 12
    },
    {
      "county": "Flagler",
      "stateId": 12
    },
    {
      "county": "Franklin",
      "stateId": 12
    },
    {
      "county": "Gadsden",
      "stateId": 12
    },
    {
      "county": "Gilchrist",
      "stateId": 12
    },
    {
      "county": "Glades",
      "stateId": 12
    },
    {
      "county": "Gulf",
      "stateId": 12
    },
    {
      "county": "Hamilton",
      "stateId": 12
    },
    {
      "county": "Hardee",
      "stateId": 12
    },
    {
      "county": "Hendry",
      "stateId": 12
    },
    {
      "county": "Hernando",
      "stateId": 12
    },
    {
      "county": "Highlands",
      "stateId": 12
    },
    {
      "county": "Hillsborough",
      "stateId": 12
    },
    {
      "county": "Holmes",
      "stateId": 12
    },
    {
      "county": "Indian River",
      "stateId": 12
    },
    {
      "county": "Jackson",
      "stateId": 12
    },
    {
      "county": "Jefferson",
      "stateId": 12
    },
    {
      "county": "Lafayette",
      "stateId": 12
    },
    {
      "county": "Lake",
      "stateId": 12
    },
    {
      "county": "Lee",
      "stateId": 12
    },
    {
      "county": "Leon",
      "stateId": 12
    },
    {
      "county": "Levy",
      "stateId": 12
    },
    {
      "county": "Liberty",
      "stateId": 12
    },
    {
      "county": "Madison",
      "stateId": 12
    },
    {
      "county": "Manatee",
      "stateId": 12
    },
    {
      "county": "Marion",
      "stateId": 12
    },
    {
      "county": "Martin",
      "stateId": 12
    },
    {
      "county": "Miami-Dade",
      "stateId": 12
    },
    {
      "county": "Monroe",
      "stateId": 12
    },
    {
      "county": "Nassau",
      "stateId": 12
    },
    {
      "county": "Okaloosa",
      "stateId": 12
    },
    {
      "county": "Okeechobee",
      "stateId": 12
    },
    {
      "county": "Orange",
      "stateId": 12
    },
    {
      "county": "Osceola",
      "stateId": 12
    },
    {
      "county": "Palm Beach",
      "stateId": 12
    },
    {
      "county": "Pasco",
      "stateId": 12
    },
    {
      "county": "Pinellas",
      "stateId": 12
    },
    {
      "county": "Polk",
      "stateId": 12
    },
    {
      "county": "Putnam",
      "stateId": 12
    },
    {
      "county": "Santa Rosa",
      "stateId": 12
    },
    {
      "county": "Sarasota",
      "stateId": 12
    },
    {
      "county": "Seminole",
      "stateId": 12
    },
    {
      "county": "St. Johns",
      "stateId": 12
    },
    {
      "county": "St. Lucie",
      "stateId": 12
    },
    {
      "county": "Sumter",
      "stateId": 12
    },
    {
      "county": "Suwannee",
      "stateId": 12
    },
    {
      "county": "Taylor",
      "stateId": 12
    },
    {
      "county": "Union",
      "stateId": 12
    },
    {
      "county": "Volusia",
      "stateId": 12
    },
    {
      "county": "Wakulla",
      "stateId": 12
    },
    {
      "county": "Walton",
      "stateId": 12
    },
    {
      "county": "Washington",
      "stateId": 12
    }
   ];
   await Promise.all(flCounties.map(county => {
    return County.create({name: county.county, summary: 'this is the summary blah blah blah blah', stateId: county.stateId});
 }));
   await Promise.all(caCounties.map(county => {
    return County.create({name: county.county, summary: 'this is the summary blah blah blah blah', stateId: county.stateId});
 }));

   await Promise.all(txCounties.map(county => {
       return County.create({name: county.county, summary: 'this is the summary blah blah blah blah',  stateId: county.stateId});
    }));
       await Promise.all(nyCounties.map(county => {
        County.create({name: county.county, summary: 'this is the summary blah blah blah blah', stateId: county.stateId });
    })); 
    
    const newYork = await County.create({name: 'New York', stateId: ny.id});
    const bronx = await County.create({name: 'Bronx', stateId: ny.id});
    const kings = await County.create({name: 'Kings', stateId: ny.id});
    const queens = await County.create({name: 'Queens', stateId: ny.id});
    const suffolk = await County.create({name: 'Suffolk', stateId: ny.id});
    const westchester = await County.create({name: 'Westchester', summary: 'search clerk', stateId: ny.id});
    
    const maricopa = await County.create({name: 'Maricopa', stateId: az.id});
    const coti = await User.create({firstName: 'Corinne', lastName: 'Tinacci', initials: 'CT', password: 'ct_pw'});
    const wike = await User.create({firstName: "William", lastName: "Keefer", initials: "WK", password: 'wk_pw'});

    const note1 = await Note.create({title: 'ecourts', link: 'https://iapps.courts.state.ny.us/webcivil/ecourtsMain', stateId: ny.id, userId: coti.id});
    const note2 = await Note.create({title: 'ACRIS', link: 'https://a836-acris.nyc.gov/DS/DocumentSearch/PartyName', stateId: ny.id, userId: coti.id});    
    const note3 = await Note.create({title: 'Kings site', link: 'https://iapps.courts.state.ny.us/webccos/kingscc/', countyId: kings.id, userId: coti.id});   
    const note4 = await Note.create({title: 'NY Crim', link: 'https://iapps.courts.state.ny.us/chrs/SignIn', stateId: ny.id, userId: coti.id, paid: true, password: true});    
    const note5 = await Note.create({title: 'Queens site', link: 'https://iapps.courts.state.ny.us/webccos/queenscc/', countyId: queens.id, userId: coti.id});    
    const note6 = await Note.create({title: 'eLaw', text: 'sometimes has cases and docs not in ecourts', link: 'https://www.elaw.com/eLaw21/index.html', stateId: ny.id, userId: coti.id});     
    const note7 = await Note.create({title: 'superior court', link: 'http://www.superiorcourt.maricopa.gov/docket/', countyId: maricopa.id, userId: coti.id});
    const note8 = await Note.create({title: 'justice court', link: 'http://justicecourts.maricopa.gov/FindACase/index.aspx', countyId: maricopa.id, userId: coti.id});

  console.log(`seeded successfully`)
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
