
// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";

// export default function Login() {

//   const {
//     loginWithGoogle,
//     loginWithEmail,
//     signup
//   } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isSignup, setIsSignup] = useState(false);

//   async function handleSubmit() {

//     try {

//       if (isSignup) {
//         await signup(email, password);
//         alert("Signup successful. You can login now.");
//       } else {
//         await loginWithEmail(email, password);
//       }

//     } catch (err) {

//       alert(err.message);

//     }

//   }

//   return (

//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">

//       <div className="bg-white p-10 rounded-xl shadow-xl w-96">

//         <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
//           Welcome to PayTrack
//         </h1>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border p-2 mb-3 rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-2 mb-4 rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-blue-600 text-white py-2 rounded mb-3 hover:bg-blue-700"
//         >
//           {isSignup ? "Sign Up" : "Login"}
//         </button>

//         <button
//           onClick={loginWithGoogle}
//           className="w-full bg-red-500 text-white py-2 rounded mb-3 hover:bg-red-600"
//         >
//           Continue with Google
//         </button>

//         <p className="text-sm text-center">

//           {isSignup ? "Already have account?" : "No account?"}

//           <span
//             onClick={() => setIsSignup(!isSignup)}
//             className="text-blue-600 cursor-pointer ml-1"
//           >
//             {isSignup ? "Login" : "Sign Up"}
//           </span>

//         </p>

//       </div>

//     </div>

//   );

// }

import { supabase } from "../lib/supabase";

export default function Login() {

  async function loginEmail() {
    const email = prompt("Enter email:");
    const password = prompt("Enter password:");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) alert(error.message);
  }

  async function signupEmail() {
    const email = prompt("Enter email:");
    const password = prompt("Create password:");

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) alert(error.message);
    else alert("Signup successful. Now login.");
  }

  async function loginGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google"
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-200">

      <h1 className="text-5xl font-bold mb-2 text-gray-800">
        Welcome to PayTrack
      </h1>

      <p className="mb-8 text-gray-600">
        Smart Invoice & Payment Management System
      </p>

      <div className="bg-white p-8 rounded-xl shadow-md flex flex-col gap-4 w-80">

        <button
          onClick={loginGoogle}
          className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Continue with Google
        </button>

        <button
          onClick={loginEmail}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login with Email
        </button>

        <button
          onClick={signupEmail}
          className="bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
        >
          Signup with Email
        </button>

      </div>

      <p className="mt-4 text-sm text-gray-500">
        Secure login powered by Supabase
      </p>

    </div>
  );
}
