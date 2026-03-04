

// import { supabase } from "../lib/supabase";

// // const BASE_URL = "http://localhost:3000";
// const API_URL = import.meta.env.VITE_API_URL;
// async function getToken() {

//   const { data } =
//     await supabase.auth.getSession();

//   return data.session?.access_token;

// }

// export const api = {

//   async get(path) {

//     const token = await getToken();

//     const res =
//       await fetch(BASE_URL + path, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//     if (!res.ok)
//       throw new Error(await res.text());

//     return res.json();

//   },

//   async post(path, body) {

//     const token = await getToken();

//     const res =
//       await fetch(BASE_URL + path, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(body)
//       });

//     if (!res.ok)
//       throw new Error(await res.text());

//     return res.json();

//   },

//   async put(path, body) {

//     const token = await getToken();

//     const res =
//       await fetch(BASE_URL + path, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(body)
//       });

//     if (!res.ok)
//       throw new Error(await res.text());

//     return res.json();

//   }

// };

import { supabase } from "../lib/supabase";

const API_URL = import.meta.env.VITE_API_URL;

async function getToken() {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}

export const api = {

  async get(path) {

    const token = await getToken();

    const res = await fetch(`${API_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok)
      throw new Error(await res.text());

    return res.json();
  },

  async post(path, body) {

    const token = await getToken();

    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!res.ok)
      throw new Error(await res.text());

    return res.json();
  },

  async put(path, body) {

    const token = await getToken();

    const res = await fetch(`${API_URL}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    // if (!res.ok)
    //   throw new Error(await res.text());

    if (!res.ok) {

      const text = await res.text();
    
      try {
        const json = JSON.parse(text);
        throw new Error(json.message);
      } catch {
        throw new Error(text);
      }
    
    }
    return res.json();
  }

};