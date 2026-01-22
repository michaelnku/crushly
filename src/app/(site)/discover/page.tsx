import { requireProfile } from "@/lib/requireProfile";

export default async function DiscoverPage() {
  await requireProfile();

  return <div>Discover users 💘</div>;
}

// const page = async () => {
//   const user = await CurrentUser();

//   if (!user) {
//     return {
//       message: "Unauthorized Access",
//     };
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
//       <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
//         Crushly Official
//       </h1>
//       <p>Welcome to Discovery!</p>
//     </div>
//   );
// };

// export default page;
