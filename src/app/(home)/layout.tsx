import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import "./home.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main>
        <div className="owl-topbar">
          <SidebarTrigger />
          <h1>The OWL</h1>
        </div>
        <div className="owl-layout">{children}</div>
      </main>
    </SidebarProvider>
  );
}
