import { Link } from 'react-router-dom'
import {setLogout} from '../api/auth'
import {useHistory} from 'react-router-dom'

export default function Header(){
    const history = useHistory();

    async function logout(){
        const data = await setLogout()
        if(data.status === 200){
            localStorage.removeItem('tutor_token')
            localStorage.removeItem('tutor_refresh_token');
            localStorage.removeItem('tutor_name');
            localStorage.removeItem('tutor_email');
            history.push('/');
        }
    }

    return(
        <>
        <nav className="navbar p-l-5 p-r-5">
            <ul className="nav navbar-nav navbar-left">
                <li>
                    <div className="navbar-header">
                        <a href="#" className="bars"></a>
                        <Link href="/dashboard"><span className="m-l-9"><img src="../assets/images/logo.png" className="img-fluid" alt="logo" style={{width:"240px"}}/></span></Link>
                    </div>
                </li>
                <li><a href="#" className="ls-toggle-btn" data-close="true"><i className="zmdi zmdi-swap"></i></a></li>
                <li className="dropdown"><a href="#"  title="Events" className="dropdown-toggle" data-toggle="dropdown" role="button">   <i className="zmdi zmdi-calendar"></i>  </a>
                    <div className="dropdown-menu pullDown calendar-top">
                        <div className="card mb-0">
                            <div className="body">
                                <div id="calendar"></div>
                            </div>
                        </div>
                    </div>
                </li>
                
                
                <li><a href="#" title="Inbox"><i className="zmdi zmdi-email"></i></a></li>
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button">
                        <i className="zmdi zmdi-notifications"></i>
                        <div className="notify">
                            {/* <!--<span className="heartbit">--> */}
                            {/* </span> */}
                            <span className="point"></span></div>
                    </a>
                    <ul className="dropdown-menu pullDown">
                        <li className="body">
                        <ul className="menu list-unstyled">
                            <li>
                                <a href="#">
                                    <div className="media">
                                    <i className="fa fa-book" aria-hidden="true"></i>
                                        <div className="media-body">
                                        <span className="name"><strong>4MC:</strong> what part of com what part of comwhat part of com</span>
                                        <span className="message"><strong>Rework: </strong>Answer Require More details</span>       
                                        <span className="time">2 hours ago</span>							  
                                    </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="media">
                                    <i className="fa fa-book" aria-hidden="true"></i>
                                        <div className="media-body">
                                        <span className="name"><strong>4MC:</strong> what part of com </span>
                                        <span className="message"><strong>Rework:</strong> Answer Require More details</span>       
                                        <span className="time">2 hours ago</span>							  
                                    </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="media">
                                    <i className="fa fa-book" aria-hidden="true"></i>
                                        <div className="media-body">
                                        <span className="name"><strong>4MC:</strong> what part of com...</span>
                                        <span className="message"><strong>Rework:</strong> Answer Require More details</span>       
                                        <span className="time">2 hours ago</span>							  
                                    </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="media">
                                    <i className="fa fa-book" aria-hidden="true"></i>
                                        <div className="media-body">
                                        <span className="name"><strong>4MC:</strong> what part of com...</span>
                                        <span className="message"><strong>Rework: </strong>Answer Require More details</span>       
                                        <span className="time">2 hours ago</span>							  
                                    </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="media">
                                    <i className="fa fa-book" aria-hidden="true"></i>
                                        <div className="media-body">
                                        <span className="name"><strong>4MC:</strong> what part of com...</span>
                                        <span className="message"><strong>Rework:</strong> Answer Require More details</span>       
                                        <span className="time">2 hours ago</span>							  
                                    </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        </li>
                        <li className="footer"> <a href="#">View All</a> </li>
                    </ul>
                </li>
                <li className="float-right">
                    <a className="Current_Wallet_Balance"   href="#" onClick={()=>{logout()}}><span> Logout </span></a> 
                    <a href="#" className="mega-menu" data-close="true"><i className="zmdi zmdi-power"></i></a>           
                </li>
            </ul>
        </nav>

            <div className="chat-launcher"></div>
                <div className="chat-wrapper">
                    <div className="card">
                        <div className="header">
                        <ul className="list-unstyled team-info margin-0">
                            <li className="m-r-15">
                                <h2> Alexander</h2>
                            </li>
                            
                        </ul>
                        </div>
                        <div className="body">
                        <div className="chat-widget">
                            <ul className="chat-scroll-list clearfix">
                                <li className="left float-left">
                                    <img src="../images/pic1.png" className="rounded-circle" alt=""/>
                                    <div className="chat-info"> <a className="name" href="#">Elizabeth</a> <span className="datetime">6:25</span> <span className="message">Hi, Alexander,<br/> John <br/> What are you doing?</span> </div>
                                </li>
                                <li className="right">
                                    <div className="chat-info"><span className="datetime">6:15</span> <span className="message">Hi, Alexander<br/> How are you!</span> </div>
                                </li>
                                <li className="right">
                                    <div className="chat-info"><span className="datetime">6:16</span> <span className="message">There are many variations of passages of Lorem Ipsum available</span> </div>
                                </li>
                                <li className="left float-left">
                                    <img src="../images/pic1.png" className="rounded-circle" alt=""/>
                                    <div className="chat-info"> <a className="name" href="#">Elizabeth</a> <span className="datetime">6:25</span> <span className="message">Hi, Alexander,<br/> John <br/> What are you doing?</span> </div>
                                </li>
                                <li className="left float-left">
                                    <img src="../images/pic2.png" className="rounded-circle" alt=""/>
                                    <div className="chat-info"> <a className="name" href="#">Michael</a> <span className="datetime">6:28</span> <span className="message">I would love to join the team.</span> </div>
                                </li>
                                <li className="right">
                                    <div className="chat-info"><span className="datetime">7:02</span> <span className="message">Hello, <br/>Michael</span> </div>
                                </li>
                            </ul>
                        </div>
                        <div className="input-group p-t-15">
                            <input type="text" className="form-control" placeholder="Enter text here..."/>
                            <span className="input-group-addon">
                            <i className="zmdi zmdi-mail-send"></i>
                            </span>
                        </div>
                        </div>
                    </div>
                </div>
        </>
    )
}