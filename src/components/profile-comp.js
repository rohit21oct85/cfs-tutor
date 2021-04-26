import BlockHeader from '../components/block-header'
import {useState,useEffect} from 'react'

export default function ProfileComp({...props}){

    const [display, setDisplay] = useState('collapse1');
    const [bank, setBank] = useState();
    const [show, setShow] = useState('none');

    const setChange = () => {
        if(show == 'none'){
            setShow('flex')
        }else{
            setShow('none');
        }
    }

    useEffect(() => {
        if(props.data){
            setBank(JSON.parse(props.data && props.data.bank_details))
        }
        return () => {}
    }, [props.data])
    return(
        <section className="content profile-page">
            <BlockHeader/>
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-4 col-md-12">
                        <div className="card profile-header">
                        <div className="body text-center">
                            <div className="profile-image">
                                <div className="user-info">
                                    <div className="image circle">
                                    <a href="#"><img src="assets/images/profile_av.jpg" className="profile-pic2 circle" alt="User"/></a>
                                    <div className="profile_pic_change">
                                        <div className="p-image p-image2"> <i className="fa fa-camera upload-button2"></i>
                                            <input className="file-upload2" type="file" accept="image/*"/>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="detail mainprofile">
                                    <h4> Charlotte</h4>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {/* <!--<div className="row clearfix">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                    <form action="/file-upload" className="dropzone">
                                        <div className="dz-message">
                                            <div className="drag-icon-cph"> <i className="material-icons">touch_app</i> </div>
                                            <p>click to upload image</p>
                                        </div>
                                        <div className="fallback">
                                            <input name="file" type="file" multiple />
                                        </div>
                                    </form>
                                    </div>
                                    </div>--> */}
                                <div className="tab-pane body" id="friends">
                                    <ul className="new_friend_list list-unstyled row">
                                    <li className="col-lg-4 col-md-2 col-sm-6 col-4"> <a href="#"> <img src="assets/images/pic1.png" className="img-thumbnail" alt="User Image"/> </a> </li>
                                    <li className="col-lg-4 col-md-2 col-sm-6 col-4"> <a href="#"> <img src="assets/images/pic2.png" className="img-thumbnail" alt="User Image"/> </a> </li>
                                    <li className="col-lg-4 col-md-2 col-sm-6 col-4"> <a href="#"> <img src="assets/images/pic3.png" className="img-thumbnail" alt="User Image"/> </a> </li>
                                    <li className="col-lg-4 col-md-2 col-sm-6 col-4"> <a href="#"> <img src="assets/images/pic4.png" className="img-thumbnail" alt="User Image"/> </a> </li>
                                    <li className="col-lg-4 col-md-2 col-sm-6 col-4"> <a href="#"> <img src="assets/images/pic5.png" className="img-thumbnail" alt="User Image"/> </a> </li>
                                    <li className="col-lg-4 col-md-2 col-sm-6 col-4"> <a href="#"> <img src="assets/images/pic6.png" className="img-thumbnail" alt="User Image"/> </a> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-12">
                        <div className="card">
                        <ul className="nav nav-tabs">
                            <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#Account">Account</a></li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane body active" id="Account">
                                {/* <!--<div className="form-group">
                                    <input type="password" className="form-control" placeholder="Current Password">
                                    </div>
                                    <div className="form-group">
                                    <input type="password" className="form-control" placeholder="New Password">
                                    </div> --> */}
                                <button className="btn btn-info btn-round" id="changepass" onClick={setChange}> Changes Password</button>
                                <div className="row clearfix" id="changepass2" style={{display:`${show}`}}>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>New Password</label>
                                            <input type="text" className="form-control" placeholder="New Password"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input type="text" className="form-control" placeholder="Confirm Password"/>
                                    </div>
                                    </div>
                                    <div className="col-md-12">
                                    <button className="btn btn-primary btn-round" id="successProfileUpdatebtn" >Submit</button>
                                    </div>
                                </div>
                                {/* <!--	<div className="row clearfix" id="successfully" style="display:none;">
                                    <div className="col-lg-12 col-md-12">
                                                        <div className="congratulation_text text-center">
                                    <img src="assets/images/like.png" className="img-fluid" alt="">
                                    <h4  className="modal-title text-center">Password Changed Successfully </h4>
                                    </div>
                                                    </div>
                                    </div> --> */}
                                <hr/>
                                <div className="row clearfix">
                                    <div className="col-lg-6 col-md-12">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input type="text" className="form-control" placeholder="Charlotte" defaultValue={props.data && props.data.fname}/>
                                    </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" className="form-control" placeholder="Deao" defaultValue={props.data && props.data.lname}/>
                                    </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                    <div className="form-group">
                                        <label>House/Building Name</label>
                                        <input type="text" name="hno" className="form-control" required defaultValue={props.data && props.data.house_name}/>
                                    </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                    <div className="form-group">
                                        <label>Street Name</label>
                                        <input type="text" name="street" className="form-control" required  defaultValue={props.data && props.data.street_name}/>
                                    </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                    <div className="form-group">
                                        <label>City</label>
                                        <input type="text" name="city" className="form-control" required defaultValue={props.data && props.data.city}/>
                                    </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                    <div className="form-group m_p_0">
                                        <label>Country</label>
                                        <select className="form-control" name="country" defaultValue={props.data && props.data.country}>
                                            <option value="select">-SELECT-</option>
                                            <option value="india" selected={props.data && props.data.country === 'india'}> India </option> 
                                            <option value="us" selected={props.data && props.data.country === 'us'}> US </option>
                                            {/* <option value="">...</option> */}
                                        </select>
                                    </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                    <div className="form-group">
                                        <label>Zip code</label>
                                        <input type="number" name="zip" className="form-control" required defaultValue={props.data && props.data.zipcode}/>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row clearfix">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="col-md-12 accordion pb-4" id="accordionExample">
                                    <div className="header">
                                    <h2><strong> Details</strong></h2>
                                    </div>
                                    <div className=" mb-0">
                                    <div className="card-header" id="heading9">
                                        <h2 className="mb-0 educ">
                                            <button type="button" className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse9" onClick={()=>{setDisplay('collapse1')}}>1. Education Qualification Details </button>                     
                                        </h2>
                                    </div>
                                    <div id="collapse9" className={`collapse ${display == 'collapse1' ? 'show' : ''}`} aria-labelledby="heading9" data-parent="#accordionExample">
                                        <div className="card-body">
                                            <div className="panel-body ">
                                                <form action="" className="row">
                                                <div className="form-group col-md-3 col-sm-3 m_p_0">
                                                    <label htmlFor="title">Class* </label>
                                                    <select className="form-control input-sm"  required>
                                                        <option value="">-SELECT-</option>
                                                        <option value="Xth">Xth</option>
                                                        <option value="XIIth">XIIth</option>
                                                        <option value="Graduation">Graduation</option>
                                                        <option value="Post Graduation">Post Graduation</option>
                                                        <option value="Doctrate">Doctrate</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-3 col-sm-3">
                                                    <label htmlFor="grade">Grade / (%)*</label>
                                                    <input type="text" className="form-control input-sm"placeholder="Percentage or Grade" required/>
                                                </div>
                                                <div className="form-group col-md-3 col-sm-3">
                                                    <label htmlFor="years">Years*</label>
                                                    <input type="text" className="form-control input-sm"  placeholder="Years" required/>
                                                </div>
                                                <div className="form-group col-md-3 col-sm-3">
                                                    <label htmlFor="subject">Subject* </label>
                                                    <input type="text" className="form-control input-sm"  placeholder="Subject" required/>
                                                </div>
                                                <div className="form-group col-md-3 col-sm-3">
                                                    <label htmlFor="school">School / Collage*</label>
                                                    <input type="text" className="form-control input-sm"  placeholder="School / Collage" required/>
                                                </div>
                                                <div className="form-group col-md-8 col-sm-8">
                                                    <label htmlFor="attach">Document Attach*</label>
                                                    <input type="file" className="form-control" name="attach[]" id="attach" required/>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    {/* <input type="button" className="btn btn-primary " value="Add more"/> */}
                                                </div>
                                                <div className="col-md-6 col-sm-6 text-right">
                                                    <div className="form-group pull-right">
                                                        <input type="submit" className="btn btn-primary" name="submit" value="Submit"/>
                                                    </div>
                                                </div>
                                                </form>
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table">
                                                <thead>
                                                    <tr className="table_title order">
                                                        <th>S. No.</th>
                                                        <th>Class</th>
                                                        <th>Grade / (%)</th>
                                                        <th>Subject</th>
                                                        <th>Year</th>
                                                        <th>&nbsp;</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {props.data && props.data.education.map((item,key)=>{
                                                        return(
                                                            <tr key={key}>
                                                                <td>key</td>
                                                                <td>{item.class}</td>
                                                                <td>{item.grade}</td>
                                                                <td>{item.subject}</td>
                                                                <td>{item.year}</td>
                                                                <td><a  href="#">[DELETE]</a></td>
                                                            </tr>
                                                        )
                                                    })}
                                                    
                                                </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className=" mb-0">
                                    <div className="card-header" id="heading10">
                                        <h2 className="mb-0 educ">
                                            <button type="button" className="btn btn-link" data-toggle="collapse" data-target="#collapse10" onClick={()=>{setDisplay('collapse2')}}>2. Mastered in Subject : Want tutoring in</button>                     
                                        </h2>
                                    </div>
                                    <div id="collapse10" className={`collapse ${display == 'collapse2' ? 'show' : ''}`} aria-labelledby="heading10" data-parent="#accordionExample">
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label>Subject</label>
                                                <input type="text" className="form-control" name="Male/female" placeholder="Subject" defaultValue={props.data && props.data.master_subject}/>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className=" mb-0">
                                    <div className="card-header" id="headingThree">
                                        <h2 className="mb-0 educ">
                                            <button type="button" className="btn btn-link" data-toggle="collapse" data-target="#collapseThree" onClick={()=>{setDisplay('collapse3')}}>3. Bank Details </button>                     
                                        </h2>
                                    </div>
                                    <div id="collapseThree" className={`collapse ${display == 'collapse3' ? 'show' : ''}`} aria-labelledby="headingThree" data-parent="#accordionExample">
                                        <div className="card-body">
                                            <div className="body">
                                                <div className="col-md-12"><strong></strong></div>
                                                <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Bank Name</label>
                                                        <input type="text" className="form-control" placeholder="Deao" defaultValue={bank && bank.Bank_Name}/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Account Holder Name</label>
                                                        <input type="text" className="form-control" name="dob"  placeholder="" defaultValue={bank && bank.Account_Name}/>
                                                    </div>
                                                </div>
                                                </div>
                                                {/* <div className="col-md-12">Expiration date</div> */}
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group m_p_0">
                                                            <label>Bank Country</label>
                                                            <input type="text" className="form-control" name="dob"  placeholder="" defaultValue={bank && bank.Bank_Country}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group m_p_0">
                                                            <label>Account Type</label>
                                                            <select className="form-control" name="Account_Type" defaultValue={bank && bank.Account_Type}>
                                                                <option value="select"> Select </option>
                                                                <option value="saving" > Saving </option>
                                                                <option value="current"> Current</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label>Account Number</label>
                                                            <input type="text" className="form-control" placeholder="Account Number" defaultValue={bank && bank.Account_Number} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label>Bank address</label>
                                                            <input type="text" className="form-control" placeholder="Bank address" defaultValue={bank && bank.Bank_Address}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6 text-left">
                                                    <div className="form-group">
                                                        <button className="btn btn-raised ">Cancel</button>
                                                        <button className="btn btn-primary">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}