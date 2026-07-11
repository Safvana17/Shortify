import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { getAllLink, getLink } from "../../../redux/slices/urlSlice";
import DataTable from "../../components/DataTable";
import type { Column } from "../../../types/Table";
import type { Url } from "../../../types/Url";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";


const MyLinks: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [page, setPage] = useState(0)
    const limit = 10
    const { urls, pagination, loading } = useSelector((state: RootState) => state.url)

    useEffect(() => {
        dispatch( getAllLink({params:{page: page + 1,limit }}))
    },[dispatch,page])

    const copy = (url:string)=>{
        navigator.clipboard.writeText(url)
        toast.success("Copied")
    }

    const handleViewLink = async(shortCode: string) => {
        try {
            await dispatch(getLink({shortCode})).unwrap()
            navigate(`/${shortCode}`)
        } catch (error) {
            toast.error(typeof error === 'string' ? error : 'Failed to redirect url')
        }
    }

    const columns: Column<Url>[] =  [
        {header: 'Short Url', key: 'shortLink', render: (val) => <span className='font-bold text-gray-600'>{val}</span>},
        {header: 'Original Link', key: 'originalLink', render: (val) => <span className='font-bold text-gray-600'>{val}</span>},
        {header: 'Created On', key: 'createdOn', render: (val) => <span className='font-bold text-gray-800'>{val}</span>},
        {header: 'Actions', key: 'id', render: (_, url) => (
            <div className="flex items-center gap-1 sm:gap-2">
                <Button
                    type="button"
                    onClick={() =>copy(url.shortLink)}
                >
                    Copy
                </Button>
                <Button
                    type="button"
                    onClick={() =>handleViewLink(url.shortCode)}
                >
                    view
                </Button>
            </div>
        )}
    ]

return (
        <DataTable
           columns={columns}
           isLoading={loading}
           data={urls}
           emptyMessage="No Links Found"
           pagination={{
            currentPage:page,
            totalPages: pagination.url.totalPages,
            totalCount: pagination.url.totalCount,
            onPageChange: (page) => setPage(page)
           }}
        >
        </DataTable>
)}


export default MyLinks;