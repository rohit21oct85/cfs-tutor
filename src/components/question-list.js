import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getChaptersAndQuestions } from '../api/book'
import { useParams } from "react-router";
import DataTable from "react-data-table-component";

export default function QuestionList(){
    let  param  = useParams();
    const [chapters, setChapters] = useState();
    const [questions, setQuestions] = useState();
    const [loading, setLoading] = useState(true);
    const [chapter_no, setchapter_no] = useState();

    const changeChapter = (e)=>{
        setchapter_no(e.target.value)
    }
    
    useEffect(() => {
        async function getData(){
            const chap = chapter_no == null ? "0" : chapter_no;
            const resp = await getChaptersAndQuestions(param.isbn, chap);
            console.log(resp)
            if(resp.chapters){
                setChapters(resp.chapters)
            }
            if(resp.questions && resp.questions.length>0){
                setQuestions(resp.questions)
                setLoading(false);
            }
        }
        getData();
        return () => {
        }
    }, [chapter_no])

    const columns = [
        {
            name: 'S.no',
            selector: 'sno',
            sortable: true,
            maxWidth: '100px', 
            cell: (row, key) => <span>{key}</span>,
        },
        {
            name: "Question",
            selector: "question",
            sortable: true,
            cell: row => <div>{row.question.substring(0,140)}</div>,
        },
        {
            cell: (item) => <Link to={`/answer-question/${item._id}`}><span className="active_ques">Start Now</span></Link>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
      ];

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
                                <form action="" className="form-inline ">
                                    <p className="mr-4 pl-3">Filter By</p>
                                    <div className="input-container col-md-4 select_filter1 mr-4">
                                    <select className="input-field" onChange={changeChapter}>
                                        {chapters ? chapters.map((item,key)=>{
                                            return(
                                                <option key={key} value={item.chapter_no} >{item.chapter_name}</option>
                                            )
                                        }): <option>loading...</option>}
                                    </select>
                                    </div>
                                    <div className="input-container col-md-4 select_filter1">
                                    <select className="input-field">
                                        {questions ? questions.map((item,key)=>{
                                            return(
                                                <option key={key} value={item._id} >{item.question.substring(0,100)}</option>
                                            )
                                        }): <option>loading...</option>}
                                    </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* <div className="body">
                            <div className="table-responsive">
                                <table className="table table-hover m-b-0">
                                    <thead>
                                    <tr className="table_title order">
                                        <th>S.No	</th>
                                        <th className="w-50h">Question : 1DT	</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><span className="">1</span></td>
                                        <td>What is the difference between monotheism, monism, henotheism and polytheism?	</td>
                                        <td><a href="questionAnswer.php"><span className="active_ques">Start Now <i className="fa fa-arrow-right fa-md"></i></span></a></td>
                                    </tr>
                                    <tr>
                                        <td><span className="">2</span></td>
                                        <td>Are humans made in the</td>
                                        <td><a href="questionAnswer.php"><span className="active_ques">Start Now <i className="zmdi zmdi-arrow-right" style={{fontSize: "16px"}}></i></span></a></td>
                                    </tr>
                                    <tr>
                                        <td><span className="">3</span></td>
                                        <td>Why are images banned in Judaism and Islam? Are there exceptions?</td>
                                        <td><a href="questionAnswer.php"><span className="active_ques">Start Now</span></a></td>
                                    </tr>
                                    <tr>
                                        <td><span className="">4</span></td>
                                        <td>What are Sufism and the Kabbalah? Why are they sometimes seen as undermining Islamic and Jewish mono</td>
                                        <td><a href="questionAnswer.php"><span className="active_ques">Start Now</span></a></td>
                                    </tr>
                                    <tr>
                                        <td><span className="">5</span></td>
                                        <td>Compare and contrast the iconography of Hindu and Daoist deities.</td>
                                        <td><a href="questionAnswer.php"><span className="active_ques">Start Now</span></a></td>
                                    </tr>
                                    <tr>
                                        <td><span className="">6</span></td>
                                        <td>Compare and contrast the Christian, Hindu and Daoist Trinity.</td>
                                        <td><a href="questionAnswer.php"><span className="active_ques">Start Now</span></a></td>
                                    </tr>
                                    <tr>
                                        <td><span className="">7</span></td>
                                        <td>Compare and contrast the notion of divine incarnations in Hinduism, Daoism and Christianity.</td>
                                        <td><a href="questionAnswer.php"><span className="active_ques">Start Now</span></a></td>
                                    </tr>
                                    <tr>
                                        <td><span className="">8</span></td>
                                        <td>How have Christ and Buddha been portrayed dinreligiousart throughout history?	</td>
                                        <td><a href="questionAnswer.php"><span className="active_ques">Start Now</span></a></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div> */}
                    

                <DataTable
                    title="Questions"
                    columns={columns}
                    data={questions}
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
    )
}