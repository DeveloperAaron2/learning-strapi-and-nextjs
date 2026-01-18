import qs from "qs";

export const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const QUERY_HOME_PAGE = {
populate : {
  sections: {
  on:{
    "layout.hero-component":{
      populate : {
        HeroImage:{
          fields: ["url","alternativeText"]
        },
        link: {
          populate: true
        }
      }
    }
  }
  }
}
};

export async function getHomePage(){
    'use cache'
    const query = qs.stringify(QUERY_HOME_PAGE);
    const response = await getStrapiData(`/api/home-page?${query}`);
    return response?.data;
}

export async function getStrapiData(url: string){
    try {
        const response = await fetch(`${BASE_URL}${url}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }catch (error) {
        console.error("Error fetching Strapi data:", error);
        return null;
    }
}

export async function registerUserService(userData: object){
    const url = `${BASE_URL}/api/auth/local/register`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        console.log("User registered successfully:", data);
        return data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export async function loginUserService(userData: object){
    const url = `${BASE_URL}/api/auth/local`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
        }
        const data = await response.json();
        console.log("User logged in successfully:", data);
        return data;
    } catch (error) {
        console.error("Error login user:", error);
        throw error;
    }
}