import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import getBooks from '../api/book'
import DataTable from "react-data-table-component";

export default function StartAns(){
    const [books, setBooks] = useState();
    const [loading, setLoading] = useState(true);
    const columns = [
        {
            name: 'S.no',
            selector: 'sno',
            sortable: true,
            cell: (row,key) => <span>{key}</span>,
        },
        {
          name: "Book Name",
          selector: "BookName",
          sortable: true
        },
        {
          name: "ISBN13",
          selector: "ISBN13",
          sortable: true,
          right: true
        },
        {
            cell: (item) => <Link to={`/book-question-list/${item.ISBN13}`}><span className="active_ques">Start Now</span></Link>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    useEffect(() => {
        async function getData(){
            const id = localStorage.getItem('mastered-subject-id');
            console.log(id)
            const Books = await getBooks(id);
            setBooks(Books);
            setLoading(false);
        }

        getData();
        return () => {
        }
    }, [])

    return(
        <div className="container-fluid">
            <div className="row clearfix">
                {/* <div className="col-md-12">
                    <div className="card student-list">
                        <div className="header">
                            <h2><strong>Leader's </strong> Board</h2>
                        </div>
                        <div className="body">
                            <div className="table-responsive">
                            <table className="table table-hover m-b-0">
                                <thead>
                                    <tr className="table_title order">
                                        <th>Book Name	</th>
                                        <th>ISBN13</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books && books.map((item, key)=>{
                                        return(
                                            <tr key={key}>{console.log(item)}
                                                <td>{item.BookName}</td>
                                                <td>{item.ISBN13}</td>
                                                <td><Link to={`/book-question-list/${item.ISBN13}`}><a><span className="active_ques">Start Now</span></a></Link></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div> */}
                <DataTable
                    title="Books"
                    columns={columns}
                    data={books}
                    defaultSortField="sno"
                    pagination
                    striped={true}
                    highlightOnHover={true}
                    pointerOnHover={true}
                    progressPending={loading}
                />
            </div>
        </div>
            
    )
}