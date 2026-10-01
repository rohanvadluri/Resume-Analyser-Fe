import { useCallback, useState } from "react";

import AppRoutes from "./routes/AppRoutes";
import SplashScreen from "./components/common/SplashScreen";
import { useAuthContext } from "./context/AuthContext";

function App() {

    const { isAuthenticated } = useAuthContext();

    const [showSplash, setShowSplash] = useState(
        !isAuthenticated
    );

    const handleSplashComplete = useCallback(() => {
        setShowSplash(false);
    }, []);

    return (
        <>
            {showSplash && !isAuthenticated && (
                <SplashScreen
                    onComplete={handleSplashComplete}
                />
            )}

            <AppRoutes />
        </>
    );
}

export default App;