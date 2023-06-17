import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import Head from 'next/head';

const Table3 = () => {

    // This table has filter functionality

    const [tableData, setTableData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const [filterText, setFilterText] = useState("")

    console.log(filterText)

    const rowsPerPage = 10;

    useEffect(() => {
        setLoader(true);
        const fetchData = async () => {
            try {
                const { data: fetchdata } = await axios.get(
                    'https://gorest.co.in/public/v1/users?page=1&per_page=100'
                );
                setTableData(fetchdata);
                setLoader(false);
            } catch (error) {
                console.error('Error fetching table data:', error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable:true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable:true
        },
        {
            name: 'Gender',
            selector: row => row.gender,
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
    ];

    const offset = currentPage * rowsPerPage;
    const filteredData = tableData.data?.filter(row =>
        row.name.toLowerCase().includes(filterText.toLowerCase()) ||
        row.email.toLowerCase().includes(filterText.toLocaleLowerCase())
    );

    const pageCount = Math.ceil(tableData.data?.length / rowsPerPage);
    const currentData = filteredData?.slice(offset, offset + rowsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleClear = () => {
        setFilterText("")
    }
    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
            </Head>
            <div className='flt-input'>
                <input 
                type="text" 
                placeholder='filter'
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                />
                <button
                onClick={handleClear}
                >Filter</button>
            </div>
            <div className="wrapper3">
                <DataTable
                    columns={columns}
                    data={currentData}
                    progressPending={loader}
                    progressComponent={<h1 className="loader">My Loader Component</h1>}
                    selectableRows
                />
                <ReactPaginate
                    previousLabel="Previous"
                    nextLabel="Next"
                    breakLabel="..."
                    breakClassName="pagination-break"
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination justify-content-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
            </div>
        </>

    );
};

export default Table3;
