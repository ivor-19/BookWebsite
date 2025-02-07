// app/user/layout.tsx (User-specific layout)
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { data: session } = useSession();  // Check if the user is logged in
  
  // if (!session) {
  //   // If no session, you might want to redirect to login or show something else
  //   // You can use Next.js redirect here if needed
  //   return <div>Please log in first</div>;
  // }

  return (
    <>
     <ProtectedRoute>
        <Header />
          <main>{children}</main>  {/* Render user-specific pages */}
        <Footer />
     </ProtectedRoute>
    </>
  );
}
