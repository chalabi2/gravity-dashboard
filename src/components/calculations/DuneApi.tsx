import axios from "axios";

export default async function getDuneData() {
  const headers = {
    "x-dune-api-key": "sZehxljPPvH3E2wh4bbEI8LHhDse7SrY"
  };

  // Call the Dune API
  try {
    const response = await axios.post('https://api.dune.com/api/v1/query/1855393/results?', {}, {
      headers: headers
    });

    // Log the returned response
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
