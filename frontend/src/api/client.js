

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


// import { supabase } from "../lib/supabase";

// const API_URL = import.meta.env.VITE_API_URL;

// async function getToken() {
//   const { data } = await supabase.auth.getSession();
//   return data.session?.access_token;
// }

// export const api = {

//   async get(path) {

//     const token = await getToken();

//     const res = await fetch(`${API_URL}${path}`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     if (!res.ok)
//       throw new Error(await res.text());

//     return res.json();
//   },

//   async post(path, body) {

//     const token = await getToken();

//     const res = await fetch(`${API_URL}${path}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify(body)
//     });

//     if (!res.ok)
//       throw new Error(await res.text());

//     return res.json();
//   },

//   async put(path, body) {

//     const token = await getToken();

//     const res = await fetch(`${API_URL}${path}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify(body)
//     });

//     // if (!res.ok)
//     //   throw new Error(await res.text());

//     if (!res.ok) {

//       const text = await res.text();
    
//       try {
//         const json = JSON.parse(text);
//         throw new Error(json.message);
//       } catch {
//         throw new Error(text);
//       }
    
//     }
//     return res.json();
//   }

// };


// import { supabase } from "../lib/supabase";

// const API_URL = import.meta.env.VITE_API_URL;

// // 🔥 SAFE TOKEN GETTER
// async function getToken() {
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session) return null;

//   return session.access_token;
// }

// // 🔥 GENERIC FETCH
// async function request(path, options = {}) {
//   const token = await getToken();

//   if (!token) {
//     throw new Error("User not authenticated");
//   }

//   const res = await fetch(`${API_URL}${path}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//       ...(options.headers || {}),
//     },
//   });

//   if (!res.ok) {
//     const text = await res.text();

//     try {
//       const json = JSON.parse(text);
//       throw new Error(json.message);
//     } catch {
//       throw new Error(text);
//     }
//   }

//   return res.json();
// }

// export const api = {
//   get: (path) => request(path),

//   post: (path, body) =>
//     request(path, {
//       method: "POST",
//       body: JSON.stringify(body),
//     }),

//   put: (path, body) =>
//     request(path, {
//       method: "PUT",
//       body: JSON.stringify(body),
//     }),
// };

// 🚀 DEMO MODE API (NO BACKEND CALLS)

export const api = {
  getInvoices: async () => [],
  createInvoice: async () => ({ success: true }),
  approveInvoice: async () => ({ success: true }),
  rejectInvoice: async () => ({ success: true }),
  getUser: async () => ({
    name: "Mehak",
    role: "ADMIN"
  })
};