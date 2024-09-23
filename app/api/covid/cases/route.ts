import axios from "axios";

export async function GET() {
  const BASE_URL = process.env.API_BASE_URL;

  const response = await axios.get(`${BASE_URL}/COVID-19_cases_casesByDay`);

  return Response.json({ message: response.data });
}
