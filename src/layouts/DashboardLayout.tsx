        import { useState } from "react";
        import { Outlet } from "react-router-dom";

        import Sidebar from "../components/layout/Sidebar";
        import Navbar from "../components/layout/Navbar";

        function DashboardLayout() {

            const [sidebarOpen, setSidebarOpen] = useState(false);

            return (
                <div className="flex min-h-screen bg-slate-50">

                    {/* Sidebar */}

                    <Sidebar
                        isOpen={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                    />

                    {/* Main Area */}

                    <div className="flex min-w-0 flex-1 flex-col">

                        {/* Navbar */}

                        <Navbar
                            onMenuClick={() => setSidebarOpen(true)}
                        />

                        {/* Page Content */}

                        <main className="flex-1 p-6">
                            <Outlet />
                        </main>

                    </div>

                </div>
            );
        }

        export default DashboardLayout;