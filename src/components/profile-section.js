import React, {useState, useEffect, useRef, useContext} from 'react';
import {useHistory,useParams} from 'react-router-dom';
import saveFormFirst from '../api/profile';
import { saveEducation, saveMasteredSubject, saveBankDetails, getTutotDetails, getSubjectSubSubjectData, deleteEducation } from '../api/profile';
import { Link } from 'react-router-dom'
import BlockHeader from './block-header';

export default function ProfileSection(){
    const [stepCounter, setStepCounter] = useState(1);
    const [active, setActive] = useState('paypal');
    const [pageData, setPageData ] = useState({});
    const [bankDetails, setBankDetails ] = useState({});
    const [qual, setQual ] = useState([]);
    const [checkbox, setCheckBox ] = useState();
    const [checkbox2, setCheckBox2 ] = useState();
    const [error, setError] = useState();
    const [file, setFile] = useState();
    const [savedBankDetails, setSavedBankDetails] =useState(false);
    const [category, setCategory] = useState();
    const [subSubjectId, setSubSubjectId] = useState();
    const history = useHistory();
    const param = useParams();

    let data = {};
    let qualification = {};
    let formdata = new FormData();

    useEffect(()=>{
        async function getData()
        {
            const resp = await getSubjectSubSubjectData();
            setCategory(resp)
            const data = {email:localStorage.getItem('tutor_email')};
            const response = await getTutotDetails(data);
            let pageQ = response.data.data.education.length > 0 ? response.data.data.education : null;
            setQual(pageQ);
            setPageData(response.data.data)
            setBankDetails(response.data.bank_details)
            setSavedBankDetails(true); //since bank details are present
            setCheckBox(response.data.data['master_subject'])
            setCheckBox2(response.data.data['master_sub_subject'])
        }
        getData();
        return () => {}
    },[])

    useEffect(() => {
        setStepCounter(parseInt(param.page))
        return () => {}
    }, [])

    const incrementCounter = async(e) => {
        e.preventDefault();
        switch (stepCounter) {
            case 1:
                data['email'] = localStorage.getItem('tutor_email');
                // for (var key in pageData) {
                //     data[key] = pageData[key]
                // }
                if( data['fname'] !== undefined || data['lname'] !== undefined 
                    || data['hno'] !== undefined || data['street'] !== undefined 
                    || data['city'] !== undefined || data['country'] !== undefined 
                    || data['zip'] !== undefined){
                    const response = await saveFormFirst(data);
                    if(response.status == 200){
                        setStepCounter(stepCounter => stepCounter + 1);
                        history.push(`/profile-details/${stepCounter+1}`);
                    }
                }else{
                    setError('*All fields are Mandatory')
                }
                break;
            case 2:
                    setStepCounter(stepCounter => stepCounter + 1);
                    history.push(`/profile-details/${stepCounter+1}`);
                break;
            case 3:
                formdata.append('file',file);
                formdata.append('email',localStorage.getItem('tutor_email'))
                formdata.append('subject',checkbox)
                formdata.append('sub_subject',checkbox2)
                formdata.append('sub_subject_id',subSubjectId)
                const response = await saveMasteredSubject(formdata);
                if(response.status == 200){
                    localStorage.setItem('mastered-subject-id',subSubjectId);
                    setStepCounter(stepCounter => stepCounter + 1);
                    history.push(`/profile-details/${stepCounter+1}`);
                }
                break;
            case 4:
                if(savedBankDetails)
                {
                    setStepCounter(stepCounter => stepCounter + 1);
                    history.push(`/profile-details/${stepCounter+1}`);
                }else{
                    setError('Save Bank Details first');
                }
                break;
            case 5:
                break;
            default:
                break;
        }
        if(stepCounter < 5){
            // setStepCounter(stepCounter => stepCounter + 1);
        }
        // history.push(`/profile-details/${stepCounter+1}`)
    }

    const decrementCounter = () => {
        if(stepCounter >= 1){
            setStepCounter(stepCounter => stepCounter - 1);
        }
        history.push(`/profile-details/${stepCounter-1}`)
    }

    const changeBankDetail = (e) =>{
        setActive(e);
    }

    const handleData = (e) => {
        data[e.target.name] = e.target.value;
    }

    const secondForm = (e) => {
        qualification[e.target.name] = e.target.value;
    }
    
    const saveDegree = async(e) => {
        e.preventDefault()
        formdata.append('email',localStorage.getItem('tutor_email'))
        formdata.append('degree',qualification.degree)
        formdata.append('grade',qualification.grade)
        formdata.append('school',qualification.school)
        formdata.append('subject',qualification.subject)
        formdata.append('years',qualification.years)
        const response = await saveEducation(formdata);
        if(response.status == 200){
            qualification = {};
        }
    }

    const selectDoc = (e) =>{
        formdata.append('file',e.target.files[0])
    }

    const attachCv = (e) =>{
        setFile(e.target.files[0])
        
    }

    const deleteItem = async(index) => {
        const response = await deleteEducation(index, localStorage.getItem('tutor_email'));
    } 

    const selectSubject = (e) => {
        data[e.target.name] = e.target.value;
        delete data['sub_subject'];
        setCheckBox(e.target.value)
    }

    const selectSubSubject = (e,id) => {
        data[e.target.name] = e.target.value;
        setCheckBox2(e.target.value)
        setSubSubjectId(id);
    }

    const sendPaypalBankDetails = async(e) => {
        e.preventDefault();
        data['email'] = localStorage.getItem('tutor_email');
        const resp = await saveBankDetails(data);
        if(resp.status == 200){
            setSavedBankDetails(true);
            setError('');
        }
    }

    useEffect(() => {
		document.querySelector("body").classList.add("ls-toggle-menu")
	});

    return(
        <section className="content profile-page">
            <BlockHeader/>
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12">
                        <div className="card profile-header">
                        <div className="body text-center wizard_dv">
                            <div className="col-md-12 text-center p-0 mt-3 mb-2">
                                <div className="">
                                    {/* <form id="msform" method="POST"> */}
                                    <ul id="progressbar">
                                        <li className={stepCounter === 1 ? 'active' : ''} id="Account"><strong>Account</strong></li>
                                        <li className={stepCounter === 2 ? 'active' : ''} id="ABOUT"><strong>Education Qualification Details </strong></li>
                                        <li className={stepCounter === 3 ? 'active' : ''} id="Account"><strong>Mastered in Subject</strong></li>
                                        <li className={stepCounter === 4 ? 'active' : ''} id="Address"><strong>Bank Details</strong></li>
                                        <li className={stepCounter === 5 ? 'active' : ''} id="confirm"><strong>Finish</strong></li>
                                    </ul>
                                    <fieldset className={stepCounter == 1 ? 'showDiv' : 'hideDiv'}>
                                    <form id="msform" method="POST">
                                        <div className="form-card">
                                            <div className="row">
                                                <span style={{color:'red'}}>{error}</span>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="form-group">
                                                        <label>First Name</label>
                                                        <input type="text" name="fname" className="form-control" required onChange={handleData} defaultValue={pageData && pageData.fname}/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                <div className="form-group">
                                                    <label>Last Name</label>
                                                    <input type="text" name="lname" className="form-control" required  onChange={handleData} defaultValue={pageData && pageData.lname}/>
                                                </div>
                                                </div>
                                                {/* <div className="col-lg-4 col-md-6">
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input type="email" name="email" className="form-control" required onChange={handleData} defaultValue={pageData && pageData.email}/>
                                                </div>
                                                </div> */}
                                                <div className="col-lg-4 col-md-6">
                                                <div className="form-group">
                                                    <label>House/Building Name</label>
                                                    <input type="text" name="hno" className="form-control" required onChange={handleData} defaultValue={pageData && pageData.house_name}/>
                                                </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                <div className="form-group">
                                                    <label>Street Name</label>
                                                    <input type="text" name="street" className="form-control" required onChange={handleData} defaultValue={pageData && pageData.street_name}/>
                                                </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                <div className="form-group">
                                                    <label>City</label>
                                                    <input type="text" name="city" className="form-control" required onChange={handleData} defaultValue={pageData && pageData.city}/>
                                                </div>
                                                </div>
                                                {/* <!--<div className="col-lg-4 col-md-6">
                                                <div className="form-group m_p_0">
                                                    <label>Language Known</label>
                                                    <select name="education" required className="form-control">
                                                    <option value="">-Select Language-</option>
                                                    <option value="1">English</option>
                                                    <option value="2">Hindi</option>
                                                    </select>
                                                </div>
                                                </div>--> */}
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="form-group m_p_0">
                                                        <label>Country</label>
                                                        <select className="form-control" onChange={handleData} name="country" defaultValue={pageData && pageData.country}>
                                                            {/* <option value=""> Afghanistan </option>
                                                            <option value=""> Albania </option>
                                                            <option value=""> Algeria </option>
                                                            <option value=""> American Samoa </option>
                                                            <option value=""> Andorra </option>
                                                            <option value=""> Angola </option>*/}
                                                            <option value="select">-SELECT-</option>
                                                            <option value="india" selected={pageData.country === 'india'}> India </option> 
                                                            <option value="us" selected={pageData.country === 'us'}> US </option>
                                                            {/* <option value="">...</option> */}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                <div className="form-group">
                                                    <label>Zip code</label>
                                                    <input type="number" name="zip" className="form-control" required onChange={handleData} defaultValue={pageData && pageData.zipcode}/>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="submit" className="next action-button" value="Next" onClick={incrementCounter}/>
                                        </form>
                                    </fieldset>
                                    <fieldset className={stepCounter == 2 ? 'showDiv' : 'hideDiv'}>
                                        <form id="msform" method="POST">
                                        <div className="form-card mb-4">
                                            <div className=" row">
                                            <div className="form-group col-md-3 col-sm-3 m_p_0">
                                                <label htmlFor="title">Class* </label>
                                                <select className="form-control input-sm" name="degree"  required onChange={secondForm}>
                                                    <option value="">-SELECT-</option>
                                                    <option value="graduation">Graduation</option>
                                                    <option value="post graduation">Post Graduation</option>
                                                    <option value="doctrate">Doctrate</option>
                                                </select>
                                            </div>
                                                <div className="form-group col-md-3 col-sm-3">
                                                <label htmlFor="grade">Grade / CGPA / (%)*</label>
                                                <input type="text" className="form-control input-sm" name="grade" placeholder="Percentage or Grade / CGPA / (%)*" required onChange={secondForm}/>
                                                </div>
                                                <div className="form-group col-md-3 col-sm-3">
                                                <label htmlFor="years">Passing Year*</label>
                                                <input type="text" className="form-control input-sm" name="years" placeholder="Passing Years" required onChange={secondForm}/>
                                                </div>
                                                <div className="form-group col-md-3 col-sm-3">
                                                <label htmlFor="subject">Main Subject* </label>
                                                <input type="text" className="form-control input-sm" name="subject" placeholder="Main Subject" required onChange={secondForm}/>
                                                </div>
                                                <div className="form-group col-md-3 col-sm-3">
                                                <label htmlFor="school">School / College*</label>
                                                <input type="text" className="form-control input-sm" name="school" placeholder="School / College" required onChange={secondForm}/>
                                                </div>
                                                <div className="form-group col-md-8 col-sm-8">
                                                <label htmlFor="attach">Attach Educational Documents*</label>
                                                <input type="file" className="form-control" name="file" id="attach" required onChange={selectDoc}/>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                <button className="btn btn-raised btn-round btn-primary mt-3" onClick={saveDegree}>Save</button>
                                                </div>
                                                <div className="table-responsive col-md-12 mt-4">
                                                <table className="table">
                                                    <thead>
                                                        <tr className="table_title order">
                                                            <th>S. No.</th>
                                                            <th>ClassName</th>
                                                            <th>Grade / CGPA / (%)</th>
                                                            <th>Main Subject</th>
                                                            <th>School</th>
                                                            <th>&nbsp;</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {qual && qual.map((item,key)=>{
                                                            return(
                                                                <tr key={key}>
                                                                    <td>{key}</td>
                                                                    <td>{item.degree}</td>
                                                                    <td>{item.grade}</td>
                                                                    <td>{item.subject}</td>
                                                                    <td>{item.school}</td>
                                                                    <td><a href="#"  onClick={()=>{deleteItem(item._id)}}>[DELETE]</a></td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="button" name="next" className="next action-button" value="Next" onClick={incrementCounter}/> <input type="button" name="previous" className="previous action-button-previous" value="Previous" onClick={()=>{decrementCounter()}}/>
                                        </form>
                                    </fieldset>
                                    <fieldset className={stepCounter == 3 ? 'showDiv' : 'hideDiv'}>
                                        <form id="msform" method="POST">
                                        <div className="form-card mb-4">
                                            <div className="row">
                                                <div className="form-group text-left col-md-5">
                                                <label htmlFor="attach">Attach Your Resume / CV</label>
                                                <input type="file" className="form-control" name="file" id="attach" required onChange={attachCv}/>
                                                </div>
                                            </div>
                                            <div className="row">
                                            {category && category.map((item,key)=>{
                                                return(  
                                                    <React.Fragment key={key}>
                                                        <label className="col-md-2 study_btn1 lbl_1">{item.subject}
                                                            <input type="radio"  name="subject" value={item.subject} checked={checkbox == `${item.subject}`} onChange={selectSubject}/>
                                                            <span className="checkmark"></span>
                                                        </label>
                                                        <div className="list_buss col-md-12 Business_list1" style={{display: checkbox == `${item.subject}` ? 'block' : 'none' }}>
                                                            <ul>
                                                                {item.sub_subject.map((it,key)=>{
                                                                    return  <li key={key}><label className="check_btn1 ">{it.sub_subject}
                                                                                <input type="radio" name="sub_subject" value={it.sub_subject} checked={checkbox2 == `${it.sub_subject}`} onChange={(e)=>{selectSubSubject(e,it._id)}}/>
                                                                                <span className="checkmark2"></span>
                                                                                </label> 
                                                                            </li>
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </React.Fragment> 
                                                )
                                            })}
                                                {/*<label className="col-md-2 study_btn1 lbl_1">Business
                                                    <input type="radio"  name="subject" value="Business" checked={checkbox == 'Business'} onChange={selectSubject}/>
                                                    <span className="checkmark"></span>
                                                </label>
                                                 <label className="col-md-2 study_btn1 lbl_2">Engineering
                                                    <input type="radio" name="subject" value="Engineering" checked={checkbox == 'Engineering'} onChange={selectSubject}/>
                                                    <span className="checkmark"></span>
                                                </label>
                                                <label className="col-md-2 study_btn1 lbl_3">Maths
                                                    <input type="radio" name="subject" value="Maths" checked={checkbox == 'Maths'} onChange={selectSubject}/>
                                                    <span className="checkmark"></span>
                                                </label>
                                                <label className="col-md-2 study_btn1 lbl_4">Science
                                                    <input type="radio" name="subject" value="Science" checked={checkbox == 'Science'} onChange={selectSubject}/>
                                                    <span className="checkmark"></span>
                                                </label> 
                                                <label className="col-md-2 study_btn1 lbl_5">Social Science
                                                    <input type="radio" name="subject" value="Social Science" checked={checkbox == 'Social Science'} onChange={selectSubject}/>
                                                    <span className="checkmark"></span>
                                                </label> 
                                                <label className="col-md-2 study_btn1 lbl_6">Law
                                                    <input type="radio" name="subject" value="Law"  checked={checkbox == 'Law'} onChange={selectSubject}/>
                                                    <span className="checkmark"></span>
                                                </label> */}
                                                
                                               {/*<div className="list_buss col-md-12 Business_list1" style={{display:checkbox == 'Business' ? 'block':'none' }}>
                                                    <ul>
                                                        <h2>Business</h2>
                                                        <li><label className="check_btn1 ">Accounting
                                                            <input type="radio" name="sub_subject" value="Accounting" checked={checkbox2 == 'Accounting'} onChange={selectSubSubject}/>
                                                            <span className="checkmark2"></span>
                                                            </label> 
                                                        </li>
                                                        <li><label className="check_btn1 ">Economics
                                                            <input type="radio" name="sub_subject" value="Economics" checked={checkbox2 == 'Economics'} onChange={selectSubSubject}/>
                                                            <span className="checkmark2"></span>
                                                            </label>   
                                                        </li>
                                                        <li><label className="check_btn1 ">Finance
                                                            <input type="radio" name="sub_subject" value="Finance" checked={checkbox2 == 'Finance'} onChange={selectSubSubject}/>
                                                            <span className="checkmark2"></span>
                                                            </label>   
                                                        </li>
                                                        <li><label className="check_btn1 ">Leadership
                                                            <input type="radio" name="sub_subject" value="Leadership" checked={checkbox2 == 'Leadership'} onChange={selectSubSubject}/>
                                                            <span className="checkmark2"></span>
                                                            </label>   
                                                        </li>
                                                        <li><label className="check_btn1 ">Management
                                                            <input type="radio" name="sub_subject" value="Management" checked={checkbox2 == 'Management'} onChange={selectSubSubject}/>
                                                            <span className="checkmark2"></span>
                                                            </label>    
                                                        </li>
                                                        <li><label className="check_btn1 ">Marketing
                                                            <input type="radio" name="sub_subject" value="Marketing" checked={checkbox2 == 'Marketing'} onChange={selectSubSubject}/>
                                                            <span className="checkmark2"></span>
                                                            </label>   
                                                        </li>
                                                        <li><label className="check_btn1 ">Operations Management
                                                            <input type="radio" name="sub_subject" value="Operations Management" checked={checkbox2 == 'Operations Management'} onChange={selectSubSubject}/>
                                                            <span className="checkmark2"></span>
                                                            </label>    
                                                        </li>
                                                        <li><label className="check_btn1 ">Other
                                                            <input type="radio" name="sub_subject" value="Other"  checked={checkbox2 == 'Other'} onChange={selectSubSubject}/>
                                                            <span className="checkmark2"></span>
                                                            </label>  
                                                        </li>
                                                    </ul>
                                                </div>
                                                 <div className="list_buss col-md-12 Business_list2"  style={{display:checkbox == 'Engineering' ? 'block':'none' }}>
                                                    <ul>
                                                        <h2>Engineering</h2>
                                                        <li><label className="check_btn1 ">Bioengineering
                                                            <input type="radio" name="sub_subject" value="Bioengineering" checked={checkbox2 == 'Bioengineering'} onChange={selectSubSubject}/>
                                                            <span className="checkmark2"></span>
                                                            </label> 
                                                        </li>
                                                        <li><label className="check_btn1 "> Chemical Engineering
                                                            <input type="radio" name="sub_subject" value="Chemical Engineering" checked={checkbox2 == 'Chemical Engineering'} onChange={selectSubSubject}/>
                                                            <span className="checkmark2"></span>
                                                            </label> 
                                                        </li>
                                                        <li><label className="check_btn1 "> Civil Engineering
                                                            <input type="radio" name="sub_subject" value="Civil Engineering" checked={checkbox2 == 'Civil Engineering'} onChange={selectSubSubject}/>
                                                            <span className="checkmark2"></span>
                                                            </label> 
                                                        </li>
                                                        <li><label className="check_btn1 "> Computer Engineering
                                                            <input type="radio" name="sub_subject" value="Computer Engineering" checked={checkbox2 == 'Computer Engineering'} onChange={selectSubSubject}/>
                                                            <span className="checkmark2"></span>
                                                            </label> 
                                                        </li>
                                                        <li><label className="check_btn1 "> Computer Science
                                                            <input type="radio" name="sub_subject"  value="Computer Science" checked={checkbox2 == 'Computer Science'} onChange={selectSubSubject}/>
                                                            <span className="checkmark2"></span>
                                                            </label> 
                                                        </li>
                                                        <li><label className="check_btn1 ">Electrical Engineering
                                                            <input type="radio" name="sub_subject" value="Electrical Engineering" checked={checkbox2 == 'Electrical Engineering'} onChange={selectSubSubject}/>
                                                            <span className="checkmark2"></span>
                                                            </label> 
                                                        </li>
                                                        <li><label className="check_btn1 "> Mechanical Engineering
                                                            <input type="radio" name="sub_subject" value="Mechanical Engineering" checked={checkbox2 == 'Mechanical Engineering'} onChange={selectSubSubject}/>
                                                            <span className="checkmark2"></span>
                                                            </label> 
                                                        </li>
                                                        <li><label className="check_btn1 "> Other
                                                            <input type="radio" name="sub_subject"  value="Other" checked={checkbox2 == 'Other'} onChange={selectSubSubject}/>
                                                            <span className="checkmark2"></span>
                                                            </label> 
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="list_buss col-md-12 Business_list3" style={{display:checkbox == 'Maths' ? 'block':'none' }}>
                                                <ul>
                                                    <h2>Maths</h2>
                                                    <li><label className="check_btn1 ">Advanced Math
                                                        <input type="radio" name="sub_subject" value="Advanced Math" checked={checkbox2 == 'Advanced Math'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Algebra
                                                        <input type="radio" name="sub_subject" value="Algebra" checked={checkbox2 == 'Algebra'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Calculus
                                                        <input type="radio" name="sub_subject"  value="Calculus" checked={checkbox2 == 'Calculus'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Geometry
                                                        <input type="radio" name="sub_subject"  value="Geometry" checked={checkbox2 == 'Geometry'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Probability
                                                        <input type="radio" name="sub_subject" value="Probability" checked={checkbox2 == 'Probability'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Statistics
                                                        <input type="radio" name="sub_subject" value="Statistics" checked={checkbox2 == 'Statistics'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Trigonometry
                                                        <input type="radio" name="sub_subject" value="Trigonometry" checked={checkbox2 == 'Trigonometry'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Other
                                                        <input type="radio" name="sub_subject"  value="Other" checked={checkbox2 == 'Other'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                </ul>
                                                </div>
                                                <div className="list_buss col-md-12 Business_list4" style={{display:checkbox == 'Science' ? 'block':'none' }}>
                                                <ul>
                                                    <h2>Science</h2>
                                                    <li><label className="check_btn1 ">Advanced Physics
                                                        <input type="radio" name="sub_subject"  value="Advanced Physics" checked={checkbox2 == 'Advanced Physics'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Biochemistry
                                                        <input type="radio" name="sub_subject" value="Biochemistry" checked={checkbox2 == 'Biochemistry'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Biology
                                                        <input type="radio" name="sub_subject" value="Biology"  checked={checkbox2 == 'Biology'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Chemistry
                                                        <input type="radio" name="sub_subject" value="Chemistry" checked={checkbox2 == 'Chemistry'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Earth Science
                                                        <input type="radio" name="sub_subject" value="Earth Science" checked={checkbox2 == 'Earth Science'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Health & Nutrition
                                                        <input type="radio" name="sub_subject" value="Health & Nutrition" checked={checkbox2 == 'Health & Nutrition'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Nursing
                                                        <input type="radio" name="sub_subject" value="Nursing" checked={checkbox2 == 'Nursing'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Physics
                                                        <input type="radio" name="sub_subject" value="Physics" checked={checkbox2 == 'Physics'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Other
                                                        <input type="radio" name="sub_subject" value="Other" checked={checkbox2 == 'Other'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                </ul>
                                                </div>
                                                <div className="list_buss col-md-12 Business_list5" style={{display:checkbox == 'Social Science' ? 'block':'none' }}>
                                                <ul>
                                                    <h2>Social Science</h2>
                                                    <li><label className="check_btn1 ">Anthropology
                                                        <input type="radio" name="sub_subject" value="Anthropology" checked={checkbox2 == 'Anthropology'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Psychology
                                                        <input type="radio" name="sub_subject" value="Psychology" checked={checkbox2 == 'Psychology'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Sociology
                                                        <input type="radio" name="sub_subject" value="Sociology" checked={checkbox2 == 'Sociology'}  onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Other
                                                        <input type="radio" name="sub_subject" value="Other" checked={checkbox2 == 'Other'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Music
                                                        <input type="radio" name="sub_subject" value="Music" checked={checkbox2 == 'Music'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                </ul>
                                                </div>
                                                <div className="list_buss col-md-12 Business_list6"  style={{display:checkbox == 'Law' ? 'block':'none' }}>
                                                <ul>
                                                    <h2>Law</h2>
                                                    <li><label className="check_btn1 ">Criminal Law
                                                        <input type="radio" name="sub_subject" value="Criminal Law" checked={checkbox2 == 'Criminal Law'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                    <li><label className="check_btn1 ">Other
                                                        <input type="radio" name="sub_subject" value="Other" checked={checkbox2 == 'Other'} onChange={selectSubSubject}/>
                                                        <span className="checkmark2"></span>
                                                        </label> 
                                                    </li>
                                                </ul>
                                                </div> */}
                                            </div>
                                        </div>
                                        <input type="button" name="next" className="next action-button" value="Next" onClick={incrementCounter}/> <input type="button" name="previous" className="previous action-button-previous" value="Previous" onClick={()=>{decrementCounter()}}/>
                                        </form>
                                    </fieldset>
                                    <fieldset className={stepCounter == 4 ? 'showDiv' : 'hideDiv'}>
                                        <form id="msform" method="POST">
                                        <div className="form-card">
                                            
                                            <div className="bg_bank_dtal"><span style={{color:'red'}}>{error}</span>
                                                <div className="body p-0">
                                                {/* <!-- Nav tabs --> */}
                                                <ul className="nav nav-tabs pl-0 pr-0">
                                                    <li className="nav-item"><a className={`nav-link ${active == 'paypal' ? 'active' : ''}`} data-toggle="tab" href="#paypal-account" onClick={()=>{changeBankDetail('paypal')}}>Paypal Account</a></li>
                                                    <li className="nav-item"><a className={`nav-link ${active != 'paypal' ? 'active' : ''}`} data-toggle="tab" href="#bank-details" onClick={()=>{changeBankDetail('bank')}}>Bank Details</a></li>
                                                </ul>
                                                {/* <!-- Tab panes --> */}
                                                <div className="tab-content">
                                                    <div role="tabpanel" className={`tab-pane in ${active == 'paypal' ? 'active' : ''}`} id="#">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                            <h2>Link your PayPal account </h2>
                                                            <p>Enter your PayPal email below to have your earnings automatically transferred.</p>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12">
                                                            <div className="form-group">
                                                                <label>Email</label>
                                                                <input type="email" className="form-control" placeholder="Demo@gmail.com" name="paypal" onChange={handleData} defaultValue={pageData && pageData.paypal}/>
                                                                <button type="button" className="btn btn-raised btn-round btn-primary mt-3" onClick={sendPaypalBankDetails}>Send payments to this email</button>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div role="tabpanel" className={`tab-pane ${active != 'paypal' ? 'active' : ''}`} id="">
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6">
                                                            <div className="form-group">
                                                                <label>Bank Name</label>
                                                                <input type="text" className="form-control" placeholder="Bank name" name="Bank_Name" onChange={handleData} defaultValue={bankDetails && bankDetails.Bank_Name}/>
                                                            </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6">
                                                            <div className="form-group">
                                                                <label>Account Holder Name</label>
                                                                <input type="text" className="form-control" placeholder="Deao" name="Account_Name" onChange={handleData} defaultValue={bankDetails && bankDetails.Account_Name}/>
                                                            </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6">
                                                            <div className="form-group">
                                                                <label>Country</label>
                                                                <input type="text" className="form-control" placeholder="Country" name="Bank_Country" onChange={handleData} defaultValue={bankDetails && bankDetails.Bank_Country}/>
                                                            </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6">
                                                            <div className="form-group m_p_0">
                                                                <label>Account Type</label>
                                                                <select className="form-control" onChange={handleData} name="Account_Type" defaultValue={bankDetails && bankDetails.Account_Type}>
                                                                    <option value="select"> Select </option>
                                                                    <option value="saving" selected={pageData.country === 'saving'}> Saving </option>
                                                                    <option value="current" selected={pageData.country === 'current'}> Current</option>
                                                                </select>
                                                            </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6">
                                                            <div className="form-group">
                                                                <label>Account Number</label>
                                                                <input type="text" className="form-control" placeholder="2133 2546 7897 7898" name="Account_Number" onChange={handleData} defaultValue={bankDetails && bankDetails.Account_Number}/>
                                                            </div>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12">
                                                            <div className="form-group">
                                                                <label>Bank Address</label>
                                                                <textarea type="text" className="form-control" placeholder="Rc-137 Demo" name="Bank_Address" onChange={handleData} defaultValue={bankDetails && bankDetails.Bank_Address}></textarea>
                                                            </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6">
                                                            <div className="form-group">
                                                                <button type="button" className="btn btn-raised btn-round btn-primary mt-3" onClick={sendPaypalBankDetails}>Save later</button>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="button" name="next" className="next action-button" value="Submit" onClick={incrementCounter}/> <input type="button" name="previous" className="previous action-button-previous" value="Previous" onClick={()=>{decrementCounter()}}/>
                                        </form>
                                    </fieldset>
                                    <fieldset className={stepCounter == 5 ? 'showDiv' : 'hideDiv'}>
                                        <div className="form-card">
                                            <h2 className="purple-text text-center"><strong>SUCCESS !</strong></h2>
                                            {/* <!--<div className="row justify-content-center">
                                                <div className="col-3"> <img src="assets/images/GwStPmg.png" className="fit-image"> </div>
                                                </div> <br><br>--> */}
                                            <div className="row justify-content-center">
                                                <div className="col-7 text-center">
                                                <h5 className="purple-text text-center">Congratulations, we have received your application.</h5>
                                                <p>Our team will check your profile details and we will get in touch with you within the next 12 to 24 hours, once it gets approved.
                                                    You can start working with us as soon as you get the approval email from our side. Hoping to see you join us soon!
                                                </p>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    {/* </form> */}
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
            {/* </div> */}
            {/* </div> */}
        </section>
    )
}