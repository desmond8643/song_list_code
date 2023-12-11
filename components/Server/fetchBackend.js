import axios from "axios"

export async function fetchFestivalPlusData() {
  try {
    const response = await axios.get("/api/festivalplus")
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function fetchBuddiesData() {
  try {
    const response = await axios.get("/api/buddies")
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function fetchChartsData() {
  try {
    const response = await axios.get("/api/charts")
    return response.data
  } catch (error) {
    console.error(error)
  }
}
