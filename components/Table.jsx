import DataTable from 'react-data-table-component';
import { BiUserCircle } from 'react-icons/bi';

const Button = () => {
    return (
        <>
        <div className='btn-box'>
            <BiUserCircle/>
            <p>send</p>
        </div>
        </>
    )
}


const Photo = () => {
    return (
        <>
        <div className='photo-box'>
            <img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" alt="" />
        </div>
        </>
    )
}

const columns = [
    {
        name: 'ID',
        selector: row => row.id,
    },
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Image',
        cell: () => <BiUserCircle style={{ fontSize: '35px' }} />,
    },
    {
        name: 'Button',
        cell: () => <Button/>
    },
    {
        name: 'Date',
        selector: row => row.date,
    },
    {
        name: "Photo",
        cell: () => <Photo/>
    },
    {
        name: 'Email',
        selector: row => row.email,
    },
];

const data = [
    {
        id: 1,
        name: "John Doe",
        date: "June 20",
        email: "john@example.com"
    },

    {
        id: 2,
        name: "Jane Smith",
        date: "July 5",
        email: "jane@example.com"
    },

    {
        id: 3,
        name: "Michael Johnson",
        date: "August 15",
        email: "michael@example.com"
    },

    {
        id: 4,
        name: "Sarah Williams",
        date: "September 10",
        email: "sarah@example.com"
    },

    {
        id: 5,
        name: "David Brown",
        date: "October 25",
        email: "david@example.com"
    },

    {
        id: 6,
        name: "Emily Davis",
        date: "November 30",
        email: "emily@example.com"
    }

]


const customStyles = {
    headCells: {
        style: {
            paddingInline:"30px",
        },
    },
    cells: {
        style: {
            fontSize:"18px"
        },
    },
};

function Table() {
    return (
        <div className="table-wrapper">
        <div className="table" >
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
          />
        </div>
      </div>
    );
};

export default Table