
// import { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {

//   const [user, setUser] = useState(null);
//   const [dbUser, setDbUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Sync user to Prisma
//   async function syncUser(sessionUser) {

//     console.log("SYNC USER START");

//     try {

//       await fetch(
//         "http://localhost:3000/auth/sync-user",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             email: sessionUser.email,
//             supabaseId: sessionUser.id
//           })
//         }
//       );

//       console.log("SYNC USER DONE");

//     } catch (err) {

//       console.error("SYNC ERROR:", err);

//     }

//   }

//   // Load Prisma user
//   async function loadDbUser() {

//     console.log("LOAD DB USER START");

//     try {

//       const { data } =
//         await supabase.auth.getSession();

//       const token =
//         data.session?.access_token;

//       console.log("TOKEN:", token);

//       if (!token) {
//         console.log("NO TOKEN FOUND");
//         return;
//       }

//       const res =
//         await fetch(
//           "http://localhost:3000/users/me",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );

//       console.log("RESPONSE STATUS:", res.status);

//       if (!res.ok) {
//         console.error("FAILED TO LOAD DB USER");
//         return;
//       }

//       const userData =
//         await res.json();

//       console.log("DB USER:", userData);

//       setDbUser(userData);

//     } catch (err) {

//       console.error("LOAD DB USER ERROR:", err);

//     }

//   }

//   // THIS MUST BE INSIDE AuthProvider
//   useEffect(() => {

//     async function init() {

//       console.log("INIT START");

//       try {

//         const { data } =
//           await supabase.auth.getSession();

//         const sessionUser =
//           data.session?.user ?? null;

//         console.log("SESSION USER:", sessionUser);

//         setUser(sessionUser);

//         if (sessionUser) {

//           await syncUser(sessionUser);

//           await loadDbUser();

//         }

//       } catch (err) {

//         console.error("INIT ERROR:", err);

//       } finally {

//         console.log("INIT FINISH → loading false");

//         setLoading(false);

//       }

//     }

//     init();

//     const { data: listener } =
//       supabase.auth.onAuthStateChange(
//         async (event, session) => {

//           console.log("AUTH STATE CHANGE:", event);

//           const sessionUser =
//             session?.user ?? null;

//           setUser(sessionUser);

//           if (sessionUser) {

//             await syncUser(sessionUser);

//             await loadDbUser();

//           } else {

//             setDbUser(null);

//           }

//         });

//     return () =>
//       listener.subscription.unsubscribe();

//   }, []);

//   async function loginWithGoogle() {

//     await supabase.auth.signInWithOAuth({
//       provider: "google"
//     });

//   }

//   async function loginWithEmail(email, password) {

//     const { error } =
//       await supabase.auth.signInWithPassword({
//         email,
//         password
//       });

//     if (error) throw error;

//   }

//   async function signupWithEmail(email, password) {

//     const { error } =
//       await supabase.auth.signUp({
//         email,
//         password
//       });

//     if (error) throw error;

//   }

//   async function logout() {

//     await supabase.auth.signOut();

//     setUser(null);
//     setDbUser(null);

//   }

//   return (

//     <AuthContext.Provider
//       value={{
//         user,
//         dbUser,
//         loading,
//         loginWithGoogle,
//         loginWithEmail,
//         signupWithEmail,
//         logout
//       }}
//     >

//       {children}

//     </AuthContext.Provider>

//   );

// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

// import { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {

//   const [user, setUser] = useState(null);
//   const [dbUser, setDbUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Sync Supabase user → Prisma
//   async function syncUser(sessionUser) {

//     console.log("SYNC USER START");

//     try {

//       await fetch(
//         "http://localhost:3000/auth/sync-user",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             email: sessionUser.email,
//             supabaseId: sessionUser.id
//           })
//         }
//       );

//       console.log("SYNC USER DONE");

//     }
//     catch (err) {

//       console.error("SYNC ERROR:", err);

//     }

//   }

//   // Get access token
//   async function getToken() {

//     const session =
//       await supabase.auth.getSession();

//     return session.data?.session?.access_token;

//   }

//   // Load Prisma user
//   async function loadDbUser() {

//     console.log("LOAD DB USER START");

//     try {

//       const token = await getToken();

//       if (!token) {

//         console.log("NO TOKEN FOUND");

//         setLoading(false);
//         return;

//       }

//       console.log("TOKEN FOUND");

//       const res =
//         await fetch(
//           "http://localhost:3000/users/me",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json"
//             }
//           }
//         );

//       console.log("RESPONSE STATUS:", res.status);

//       if (!res.ok) {

//         console.error("FAILED TO LOAD DB USER");

//         setLoading(false);
//         return;

//       }

//       const userData =
//         await res.json();

//       console.log("DB USER:", userData);

//       setDbUser(userData);

//     }
//     catch (err) {

//       console.error("LOAD DB USER ERROR:", err);

//     }
//     finally {

//       setLoading(false);

//       console.log("LOAD DB USER FINISHED");

//     }

//   }

//   // Init
//   useEffect(() => {

//     async function init() {

//       console.log("INIT START");

//       try {

//         const { data } =
//           await supabase.auth.getSession();

//         const sessionUser =
//           data.session?.user ?? null;

//         console.log("SESSION USER:", sessionUser);

//         setUser(sessionUser);

//         if (sessionUser) {

//           await syncUser(sessionUser);

//           await loadDbUser();

//         }

//       }
//       catch (err) {

//         console.error("INIT ERROR:", err);

//       }
//       finally {

//         setLoading(false);

//         console.log("INIT FINISHED");

//       }

//     }

//     init();

//     const { data: listener } =
//       supabase.auth.onAuthStateChange(
//         async (event, session) => {

//           console.log("AUTH STATE CHANGE:", event);

//           const sessionUser =
//             session?.user ?? null;

//           setUser(sessionUser);

//           if (sessionUser) {

//             await syncUser(sessionUser);

//             await loadDbUser();

//           }
//           else {

//             setDbUser(null);

//             setLoading(false);

//           }

//         });

//     return () =>
//       listener.subscription.unsubscribe();

//   }, []);

//   async function loginWithGoogle() {

//     await supabase.auth.signInWithOAuth({
//       provider: "google"
//     });

//   }

//   async function loginWithEmail(email, password) {

//     const { error } =
//       await supabase.auth.signInWithPassword({
//         email,
//         password
//       });

//     if (error) throw error;

//   }

//   async function signupWithEmail(email, password) {

//     const { error } =
//       await supabase.auth.signUp({
//         email,
//         password
//       });

//     if (error) throw error;

//   }

//   async function logout() {

//     await supabase.auth.signOut();

//     setUser(null);
//     setDbUser(null);

//   }

//   return (

//     <AuthContext.Provider
//       value={{
//         user,
//         dbUser,
//         loading,
//         loginWithGoogle,
//         loginWithEmail,
//         signupWithEmail,
//         logout,
//         getToken
//       }}
//     >

//       {children}

//     </AuthContext.Provider>

//   );

// }

// export function useAuth() {

//   return useContext(AuthContext);

// }

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Get access token safely
  async function getToken() {

    const { data } = await supabase.auth.getSession();

    return data.session?.access_token;

  }

  // ✅ Sync Supabase user → Prisma
  async function syncUser(sessionUser) {

    try {

      await fetch("http://localhost:3000/auth/sync-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: sessionUser.email,
          supabaseId: sessionUser.id
        })
      });

    } catch (err) {

      console.error("Sync error:", err);

    }

  }

  // ✅ Load Prisma user (NO getSession inside)
  async function loadDbUser(token) {

    try {

      const res = await fetch(
        "http://localhost:3000/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) {

        setDbUser(null);
        return;

      }

      const data = await res.json();

      setDbUser(data);

    } catch (err) {

      console.error("Load DB user error:", err);

    }

  }

  // ✅ Initialize session ONCE (no race condition)
  useEffect(() => {

    let mounted = true;

    async function init() {

      try {

        const { data } = await supabase.auth.getSession();

        const session = data.session;

        if (!mounted) return;

        if (session?.user) {

          setUser(session.user);

          await syncUser(session.user);

          await loadDbUser(session.access_token);

        }

      } catch (err) {

        console.error("Init error:", err);

      } finally {

        if (mounted) setLoading(false);

      }

    }

    init();

    const { data: listener } =
      supabase.auth.onAuthStateChange(
        async (event, session) => {

          if (!mounted) return;

          if (session?.user) {

            setUser(session.user);

            await syncUser(session.user);

            await loadDbUser(session.access_token);

          } else {

            setUser(null);
            setDbUser(null);

          }

          setLoading(false);

        });

    return () => {

      mounted = false;

      listener.subscription.unsubscribe();

    };

  }, []);

  async function loginWithGoogle() {

    await supabase.auth.signInWithOAuth({
      provider: "google"
    });

  }

  async function loginWithEmail(email, password) {

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    if (error) throw error;

  }

  async function signupWithEmail(email, password) {

    const { error } =
      await supabase.auth.signUp({
        email,
        password
      });

    if (error) throw error;

  }

  async function logout() {

    await supabase.auth.signOut();

    setUser(null);
    setDbUser(null);

  }

  return (

    <AuthContext.Provider
      value={{
        user,
        dbUser,
        loading,
        getToken,   // ✅ FIXED
        loginWithGoogle,
        loginWithEmail,
        signupWithEmail,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {
  return useContext(AuthContext);
}
