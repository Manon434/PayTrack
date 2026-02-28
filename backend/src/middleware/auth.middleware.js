
// import prisma from "../lib/prisma.js";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY
// );

// export default async function authMiddleware(req, res, next) {

//   try {

//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.replace("Bearer ", "");

//     const { data, error } = await supabase.auth.getUser(token);

//     if (error || !data.user) {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     // find user in Prisma
//     const dbUser = await prisma.user.findUnique({
//       where: {
//         supabaseId: data.user.id
//       }
//     });

//     if (!dbUser) {
//       return res.status(401).json({
//         message: "User not found in database"
//       });
//     }

//     // attach user to request
//     req.user = dbUser;

//     next();

//   } catch (err) {

//     res.status(401).json({
//       message: "Unauthorized"
//     });

//   }

// }

import prisma from "../lib/prisma.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function authMiddleware(req, res, next) {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const token = authHeader.replace("Bearer ", "");

    const { data, error } =
      await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }

    // Find user in Prisma using supabaseId
    const dbUser = await prisma.user.findUnique({
      where: {
        supabaseId: data.user.id
      }
    });

    if (!dbUser) {
      return res.status(401).json({
        message: "User not found in database"
      });
    }

    // Attach Prisma user to request
    req.user = dbUser;

    next();

  } catch (err) {

    console.error("Auth middleware error:", err);

    res.status(401).json({
      message: "Unauthorized"
    });

  }

}

