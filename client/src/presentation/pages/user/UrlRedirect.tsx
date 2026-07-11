import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import type { AppDispatch } from '../../../redux/store'
import { getLink } from '../../../redux/slices/urlSlice'
import toast from 'react-hot-toast'

const UrlRedirect: React.FC = () => {

    const { shortCode } = useParams()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if(!shortCode){
            console.log('No short code')
            return
        }
        let cancelled = false
        const resolve = async() => {
            const result = await dispatch(getLink({shortCode}))
            if(cancelled) return
            if(getLink.fulfilled.match(result)){
                console.log('redirecting...')
                window.location.replace(result.payload)
            }else{
                toast.error("Invalid short url")
            }
        }
        resolve()

        return () => {
            cancelled = true
        }

    }, [dispatch, shortCode])
  return (
    <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
    </div>
  )
}

export default UrlRedirect
