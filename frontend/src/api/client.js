
// import { supabase } from "../lib/supabase";

// const BASE_URL = "http://localhost:3000";

// // helper to get token
// async function getToken() {

//   const { data } = await supabase.auth.getSession();

//   const token = data.session?.access_token;

//   if (!token) {
//     throw new Error("No auth token found");
//   }

//   return token;
// }

// export const api = {

//   async get(path) {

//     const token = await getToken();

//     const res = await fetch(BASE_URL + path, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     if (!res.ok) {
//       throw new Error("Request failed");
//     }

//     return res.json();
//   },

//   async post(path, body) {

//     const token = await getToken();

//     const res = await fetch(BASE_URL + path, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: body ? JSON.stringify(body) : undefined
//     });

//     if (!res.ok) {
//       throw new Error("Request failed");
//     }

//     return res.json();
//   },

//   async put(path, body) {

//     const token = await getToken();

//     const res = await fetch(BASE_URL + path, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: body ? JSON.stringify(body) : undefined
//     });

//     if (!res.ok) {
//       throw new Error("Request failed");
//     }

//     return res.json();
//   }

// };

// async function post(url, body, isFormData = false) {

//   const token = await getToken();

//   const res = await fetch(BASE_URL + url, {

//     method: "POST",

//     headers: isFormData
//       ? { Authorization: `Bearer ${token}` }
//       : {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },

//     body: isFormData ? body : JSON.stringify(body)

//   });

//   if (!res.ok)
//     throw new Error("Request failed");

//   return res.json();

// }

import { supabase } from "../lib/supabase";

const BASE_URL = "http://localhost:3000";

async function getToken() {

  const { data } =
    await supabase.auth.getSession();

  return data.session?.access_token;

}

export const api = {

  async get(path) {

    const token = await getToken();

    const res =
      await fetch(BASE_URL + path, {
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

    const res =
      await fetch(BASE_URL + path, {
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

    const res =
      await fetch(BASE_URL + path, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

    if (!res.ok)
      throw new Error(await res.text());

    return res.json();

  }

};