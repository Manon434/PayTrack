
// import { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {

//   const [user, setUser] = useState(null);
//   const [dbUser, setDbUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Get access token safely
//   async function getToken() {

//     const { data } = await supabase.auth.getSession();

//     return data.session?.access_token;

//   }

//   // ✅ Sync Supabase user → Prisma
//   async function syncUser(sessionUser) {

//     try {

//       await fetch("http://localhost:3000/auth/sync-user", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           email: sessionUser.email,
//           supabaseId: sessionUser.id
//         })
//       });

//     } catch (err) {

//       console.error("Sync error:", err);

//     }

//   }

//   // ✅ Load Prisma user (NO getSession inside)
//   async function loadDbUser(token) {

//     try {

//       const res = await fetch(
//         "http://localhost:3000/users/me",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       if (!res.ok) {

//         setDbUser(null);
//         return;

//       }

//       const data = await res.json();

//       setDbUser(data);

//     } catch (err) {

//       console.error("Load DB user error:", err);

//     }

//   }

//   // ✅ Initialize session ONCE (no race condition)
//   useEffect(() => {

//     let mounted = true;

//     async function init() {

//       try {

//         const { data } = await supabase.auth.getSession();

//         const session = data.session;

//         if (!mounted) return;

//         if (session?.user) {

//           setUser(session.user);

//           await syncUser(session.user);

//           await loadDbUser(session.access_token);

//         }

//       } catch (err) {

//         console.error("Init error:", err);

//       } finally {

//         if (mounted) setLoading(false);

//       }

//     }

//     init();

//     const { data: listener } =
//       supabase.auth.onAuthStateChange(
//         async (event, session) => {

//           if (!mounted) return;

//           if (session?.user) {

//             setUser(session.user);

//             await syncUser(session.user);

//             await loadDbUser(session.access_token);

//           } else {

//             setUser(null);
//             setDbUser(null);

//           }

//           setLoading(false);

//         });

//     return () => {

//       mounted = false;

//       listener.subscription.unsubscribe();

//     };

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
//         getToken,   // ✅ FIXED
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

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

// ✅ Use environment variable for backend URL
const API_URL = import.meta.env.VITE_API_URL;

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

      await fetch(`${API_URL}/auth/sync-user`, {
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

  // ✅ Load Prisma user
  async function loadDbUser(token) {

    try {

      const res = await fetch(
        `${API_URL}/users/me`,
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

  // ✅ Initialize session ONCE
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
        getToken,
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