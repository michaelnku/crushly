// "use client";

// import { useAtom } from "jotai";
// import { authClient } from "@/lib/auth-client";

// export function useCurrentUser() {
//   const [{ data, isPending, error }] = useAtom(authClient.useSession);

//   return {
//     user: data?.user ?? null,
//     isLoading: isPending,
//     error,
//     isAuthenticated: !!data?.user,
//   };
// }
