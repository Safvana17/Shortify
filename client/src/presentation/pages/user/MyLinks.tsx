import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { getAllLink } from "../../../redux/slices/urlSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TablePagination,
  Link
} from "@mui/material";


const MyLinks: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [page, setPage] = useState(0)
    const limit = 10
    const { urls, pagination } = useSelector((state: RootState) => state.url)

    useEffect(() => {
        dispatch( getAllLink({params:{page: page + 1,limit }}))
    },[dispatch,page])

    const copy = (url:string)=>{
        navigator.clipboard.writeText(url)
        toast.success("Copied")
    }

    const handlePageChange = (
        _event: unknown,
        newPage:number
    )=>{
        setPage(newPage);
    }

return (
    <Paper
        sx={{
            p:3,
            borderRadius:3
        }}
    >
        <Typography
            variant="h5"
            sx= {{
                fontWeight:600,
                mb:3
            }}
        >
            Your Links
        </Typography>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Short URL
                        </TableCell>
                        <TableCell>
                            Original URL
                        </TableCell>
                        <TableCell>
                            Clicks
                        </TableCell>
                        <TableCell>
                            Created On
                        </TableCell>
                        <TableCell>
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {urls.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                align="center"
                            >
                                No links found
                            </TableCell>
                        </TableRow>
                    ) : (
                    urls.map((link)=>(
                        <TableRow
                            key={link.id}
                        >
                            <TableCell>
                                <Link
                                    href={link.shortLink}
                                    target="_blank"
                                    underline="hover"
                                >
                                    {link.shortLink}
                                </Link>
                            </TableCell>
                            <TableCell
                                sx={{
                                    maxWidth:300,
                                    overflow:"hidden",
                                    textOverflow:"ellipsis",
                                    whiteSpace:"nowrap"
                                }}
                            >
                                {link.originalLink}
                            </TableCell>
                            <TableCell>
                                {link.clicks}
                            </TableCell>
                            <TableCell>
                                {new Date(link.createdOn).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={()=>
                                        copy(link.shortLink)
                                    }
                                >
                                    Copy
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                )}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            component="div"
            count={pagination.url.totalCount}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[10]}
            onPageChange={handlePageChange}
        />
    </Paper>
)}


export default MyLinks;