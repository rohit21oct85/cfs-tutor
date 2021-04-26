
import {useState} from 'react'
import {Link} from 'react-router-dom'

export default function Sidebar(){
    const [display, setDisplay] = useState('none');
    const [classn, setClassN] = useState('');

    const set = () => {
        console.log("sdasdas")
        if(display === 'block'){
            setDisplay('none')
            setClassN('')
        }else{
            setDisplay('block')
            setClassN('toggled')
        }
    }
    
    return(
        <>
        {/* <aside id="leftsidebar" className="sidebar">
            <ul className="nav nav-tabs">
                <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#dashboard"><i className="zmdi zmdi-home"></i></a></li>
                
            </ul>
            <div className="tab-content">
                <div className="tab-pane stretchRight active" id="dashboard">
                    <div className="menu">
                        <ul className="list profile_left">
                        <li>
                            <div className="user-info">
                                <div className="image circle">
                                    <a href="#"><img src="../images/profile_av.jpg" className="profile-pic" alt="User"/></a>
                                    <div className="profile_pic_change">
                                    <div className="p-image">
                                        <i className="fa fa-camera upload-button"></i>
                                        <input className="file-upload" type="file" accept="image/*"/>
                                    </div>
                                    </div>
                                </div>
                                <div className="detail">
                                    <h4> Charlotte</h4>
                                </div>
                            </div>
                        </li>
                        <li className="active open"><a href="admin-dashboard.php"><i className="zmdi zmdi-home"></i><span>Dashborad</span></a></li> 
                        <li>
                            <a href="#" className={`menu-toggle ${classn}`} onClick={()=>{set()}}><i className="zmdi zmdi-accounts-outline"></i><span> Tutor </span> </a>
                            <ul className="ml-menu" style={{display: `${display}`}}>
                                <li><a href="admin_tutor_active.php">Active </a></li>
                                <li><a href="admin_tutor_New.php">New </a></li>
                                <li><a href="admin_tutor_blocked.php">Blocked</a></li> 
                            </ul>
                        </li>
                        <li className=""><a href="admin_tutor_qc.php"><i className="flaticon-quality-control"></i><span>QC</span></a></li> 
                        </ul>
                    </div>
                </div>
                <div className="tab-pane stretchLeft" id="user">
                    <div className="menu">
                        <ul className="list">
                        <li>
                        <div className="user-info m-b-20 p-b-15">
                            <div className="image"><a href="#"><img src="../images/profile_av.jpg" alt="User"/></a></div>
                            <div className="detail">
                                <h4>Charlotte</h4>
                                <small>Choose Profile</small>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <a title="facebook" href="#"><i className="zmdi zmdi-facebook"></i></a>
                                    <a title="twitter" href="#"><i className="zmdi zmdi-twitter"></i></a>
                                    <a title="instagram" href="#"><i className="zmdi zmdi-instagram"></i></a>
                                </div>
                                <div className="col-4 p-r-0">
                                    <h5 className="m-b-5">$ 13</h5>
                                    <small>Reward</small>
                                </div>
                                <div className="col-4">
                                    <h5 className="m-b-5">$ 33</h5>
                                    <small>Cashback</small>
                                </div>
                                <div className="col-4 p-l-0">
                                    <h5 className="m-b-5">37</h5>
                                    <small>Order</small>
                                </div>
                            </div>
                        </div>
                        </li>
                        <li>
                            <small className="text-muted">Location: </small>
                            <p>Noida, India</p>
                            <hr/>
                            <small className="text-muted">Email address: </small>
                            <p>Charlotte@example.com</p>
                            <hr/>
                            <small className="text-muted">Phone: </small>
                            <p>+ 202-555-0191</p>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
            </aside> */}
            <aside id="leftsidebar" className="sidebar">
                <ul className="nav nav-tabs">
                    <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#dashboard"><i className="zmdi zmdi-home"></i></a></li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane stretchRight active" id="dashboard">
                        <div className="menu">
                            <ul className="list profile_left">
                            <li>
                                <div className="user-info">
                                    <div className="image circle">
                                        <a href="#"><img src="assets/images/profile_av.jpg" className="profile-pic" alt="User"/></a>
                                        <div className="profile_pic_change">
                                        <div className="p-image">
                                            <i className="fa fa-camera upload-button"></i>
                                            <input className="file-upload" type="file" accept="image/*"/>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="detail">
                                        <h4> Charlotte</h4>
                                    </div>
                                </div>
                            </li>
                            <li className="active open"><Link to="/dashboard"><i className="zmdi zmdi-home"></i><span>Dashborad</span></Link></li>
                            <li className="active open"><Link to="/profile"><i className="zmdi zmdi-account"></i><span>Profile</span></Link></li>
                            <li><Link to="/profile"><i className="zmdi zmdi-money"></i><span>My Earnings</span> </Link></li>
                            <li><Link to="start-answering"><i className="flaticon-answer"></i><span>Start Answering</span> </Link></li>
                            <li><Link to="/profile"><i className="flaticon-work"></i><span>My work Stats</span> </Link></li>
                                <li><Link to="/profile"><i className="flaticon-solution"></i><span>Sample Solutions</span> </Link></li>
                                <li><Link to="/profile"><i className="flaticon-problem"></i><span>How it Works</span> </Link></li>
                                <li><Link to="/profile"><i className="flaticon-guidelines"></i><span>Project Guidelines</span> </Link></li>
                                <li><Link to="/profile"><i className="zmdi zmdi-notifications"></i><span>Notifications</span> </Link></li>
                                <li><Link to="/profile"><i className="flaticon-faq"></i><span>FAQ</span> </Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="tab-pane stretchLeft" id="user">
                        <div className="menu">
                            <ul className="list">
                            <li>
                            <div className="user-info m-b-20 p-b-15">
                                <div className="image"><a href="#"><img src="assets/images/profile_av.jpg" alt="User"/></a></div>
                                <div className="detail">
                                    <h4>Charlotte</h4>
                                    <small>Choose Profile</small>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <a title="facebook" href="#"><i className="zmdi zmdi-facebook"></i></a>
                                        <a title="twitter" href="#"><i className="zmdi zmdi-twitter"></i></a>
                                        <a title="instagram" href="#"><i className="zmdi zmdi-instagram"></i></a>
                                    </div>
                                    <div className="col-4 p-r-0">
                                        <h5 className="m-b-5">$ 13</h5>
                                        <small>Reward</small>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="m-b-5">$ 33</h5>
                                        <small>Cashback</small>
                                    </div>
                                    <div className="col-4 p-l-0">
                                        <h5 className="m-b-5">37</h5>
                                        <small>Order</small>
                                    </div>
                                </div>
                            </div>
                            </li>
                            <li>
                                <small className="text-muted">Location: </small>
                                <p>Noida, India</p>
                                <hr/>
                                <small className="text-muted">Email address: </small>
                                <p>Charlotte@example.com</p>
                                <hr/>
                                <small className="text-muted">Phone: </small>
                                <p>+ 202-555-0191</p>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                </aside>
            </>
    )
}