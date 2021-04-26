import BlockHeader from '../components/block-header'
import {useEffect, useState} from 'react'
import { getDashboardData } from '../api/profile'

export default function Dash(){
    const [data, setData] = useState({});

    useEffect(() => {
        async function getData()
        {   
            const userId = localStorage.getItem('tutor_id');
            const resp = await getDashboardData(userId);
            setData(resp)
        }

        getData();
        return () => {}
    }, [])

    return(
        <section className="content user profile-page">
            <BlockHeader/>
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-4 col-md-6 col-sm-12 text-center Order_Assignment">
                        <div className="card Order_Assignment_text">
                        <div className="header">
                            <h2 className="text-left"><strong>Question </strong></h2>
                        </div>
                        <div className="body">
                            <span><img src="assets/images/question.png" className="img-fluid" alt=""/></span>                        
                            <h4 className="m-t-20">{data && data.answeredQuestions}   </h4>
                            <p className=" m-b-0"> Total Question Solved</p>
                            <a href="#" className="btn order_now mt-4">View Now</a>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 text-center Order_Assignment">
                        <div className="card Order_Assignment_text">
                        <div className="header">
                            <h2 className="text-left"><strong>Approved </strong> </h2>
                        </div>
                        <div className="body">
                            <span><img src="assets/images/approve.png" className="img-fluid" alt=""/></span>                        
                            <h4 className="m-t-20">{data && data.approvedQuestions} </h4>
                            <p className=" m-b-0"> Total Approved </p>
                            <a href="#" className="btn order_now mt-4">View Now</a>                      
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 text-center Order_Assignment">
                        <div className="card Order_Assignment_text">
                        <div className="header">
                            <h2 className="text-left"><strong>Rework</strong> </h2>
                        </div>
                        <div className="body">
                            <span><img src="assets/images/rework.png" className="img-fluid" alt=""/></span>                        
                            <h4 className="m-t-20">{data && data.reworkedQuestions}</h4>
                            <p className=" m-b-0">Total Rework </p>
                            <a href="#" className="btn order_now mt-4">View Now</a>                     
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-xl-12">
                        <div className="banner banner-color mt-0">
                        <div className="col-xl-2 col-lg-2 col-md-12">
                            <img src="assets/images/svg/new_message.svg" alt="image" className="image"/> 
                        </div>
                        <div className="page-content col-xl-5 col-lg-5 col-md-12">
                            <h4 className="mt-0 tutor_h">My Earning</h4>
                            <p className="mb-1 add_more_power">175$	 </p>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-4 text-right Earn_Referral d-flex d-block">  
                            <a href="#" className="btn ml-auto">View All  </a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12 affilit_orders">
                <div className="card student-list">
                    <div className="header">
                        <h2 className="float-left">Top Earners </h2>
                    </div>
                    <div className="body">
                        <div className="table-responsive text-center table_complete_active">
                        <table className="table table-hover m-b-0">
                            <thead>
                                <tr>
                                    <th>  Photo </th>
                                    <th>Name    </th>
                                    <th>Rating  </th>
                                    <th> Subject  </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img src="assets/images/icon_img.png" className="img-fluid" alt=""/> </td>
                                    <td> Zeeshan Rahman</td>
                                    <td><span className="completed">4 Star </span></td>
                                    <td>Chemistry</td>
                                </tr>
                                <tr>
                                    <td><img src="assets/images/icon_img2.png" className="img-fluid" alt=""/> </td>
                                    <td> Devika Bankar</td>
                                    <td><span className="active">5 Star</span></td>
                                    <td>Finance</td>
                                </tr>
                                <tr>
                                    <td><img src="assets/images/icon_img3.png" className="img-fluid" alt=""/></td>
                                    <td> Radhika Mutneja</td>
                                    <td><span className="completed">4 Star</span></td>
                                    <td>Biochemistry</td>
                                </tr>
                                <tr>
                                    <td><img src="assets/images/icon_img4.png" className="img-fluid" alt=""/></td>
                                    <td> Amandeep Singh</td>
                                    <td><span className="active">5 Star</span></td>
                                    <td>Earth-science</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
            </section>
    )
}