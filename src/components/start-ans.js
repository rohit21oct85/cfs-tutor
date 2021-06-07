import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import getBooks from '../api/book'
import DataTable from "react-data-table-component";
import { useHistory } from "react-router";

export default function StartAns(){
    const [books, setBooks] = useState();
    const [loading, setLoading] = useState(true);
    const history = useHistory();

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
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card mb-0">
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card student-list">
                        {/* <div className="header">
                            <h2> QUESTIONS</h2>
                        </div> */}
                        <div className="body">
                            <div className="row clearfix">
                                <div className="col-md-6">
                                </div>
                                <div className="col-md-6 ">
                                    <button className="btn btn-sm float-right" onClick={()=>{
                                        history.goBack();
                                    }}>back</button>
                                </div>

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
                    </div>
                </div>
            </div>
        </div>
    )
}