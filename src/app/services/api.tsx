import environment from "@/enviroment/environment";

export const getData = async (url: string) => {
  try {
    const URL_BASE = environment.API;
    const response = await fetch(URL_BASE + url);
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
