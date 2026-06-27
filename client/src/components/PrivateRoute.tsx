import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import { Navigate } from "react-router-dom"
import { ROUTES } from "../constants/routes"

interface PrivateRouteProps {
    children: React.ReactNode
}

const PrivateRoute: React.FC <PrivateRouteProps> = ({children}) => {
    const { user, loading, isAuthenticated } = useSelector((state: RootState) => state.auth)

    if(loading){
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary-600"></div>
            </div> 
        )
    }
    if(!isAuthenticated){
        return <Navigate to={ROUTES.PUBLIC.LOGIN} replace />
    }

    if(!user){
        return <Navigate to={ROUTES.PUBLIC.HOME} replace />
    }

    return (
        <>{children}</>
    )
}

export default PrivateRoute