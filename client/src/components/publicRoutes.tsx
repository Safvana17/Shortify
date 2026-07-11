import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import { Navigate } from "react-router-dom"
import { ROUTES } from "../constants/routes"

interface PublicRouteProps {
    children: React.ReactNode
}

const PublicRoute: React.FC<PublicRouteProps> = ({children}) => {
    const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth)
    console.log("PublicRoute loading:", loading);
    
    if(loading){
        return(
            <div className="flex h-screen items-center justify-center bg-white">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
            </div>
        )
    }

    if(isAuthenticated && user) {
        return <Navigate to={ROUTES.USER.DASHBOARD} replace />
    }

    return (
        <>
          {children}
        </>
    )
}

export default PublicRoute