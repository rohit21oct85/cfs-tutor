import { useParams } from "react-router";
import {useEffect, useState} from 'react';
import { getQuestion,startAnswering,finishAnswering } from '../api/book'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-classic-with-mathtype';

export default function Answer(){
    let  param  = useParams();
    const[question,setQuestion]= useState();
    const [formData, setFormData] = useState({});
    const [display,setDisplay] = useState('none');
    const [error, setError ] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // setFormData({ ...formData, question_id: param.questionId });
        setFormData({ ...formData, user_Id: localStorage.getItem('tutor_id'),question_id: param.questionId,tutor_name:  localStorage.getItem('tutor_name') });
        async function getData(){
            const resp = await getQuestion(param.questionId);
            setQuestion(resp);
            const response = await startAnswering(param.questionId,localStorage.getItem('tutor_id'));
        }
        getData();
        return () => {
        }
    }, [])

    const setSkip = ()=> {
        if(display == 'none'){
            setDisplay('block')
            setFormData({ ...formData, answer_type: 'skip'});

        }else{
            setDisplay('none');
            setFormData({ ...formData, answer_type: ''});

        }
    }

    const setReason = (e) => {
        setFormData({ ...formData, reason: e.target.value});
    }

    const handleSubmit = async(e, btn) =>{
        e.preventDefault();
        if(btn == 1){
            if(formData.temp_answer == "" || formData.temp_answer == undefined){
                setError('Enter Valid Answer')
                return;
            }
        }
        
        if(formData.answer_type =='skip' && (formData.reason == '' || formData.reason == undefined)){
            setError('Select a reason to Skip')
            return;
        }
        setLoading(true);
        console.log(formData)
        const res = await finishAnswering(formData);
        if(res.error == false){
            setLoading(false)
            setError('')
        }
    }
    return(
        <div className="container-fluid">
            <div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card mb-0">
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card student-list">
                        <div className="header">
                            <h2> QUESTIONS</h2>
                        </div>
                        <div className="body">
                            <div className="row clearfix">
                                <p>{question && question.question}</p>
                            </div>
                        </div>
                        <div className="header">
                            <h2> Complete Answer</h2>
                        </div>
                        <div className="body">
                            <div className="row clearfix">
                                <div className="text-center">
                                <CKEditor
                                    editor={ ClassicEditor }
                                    config={{
                                        toolbar: {
                                            items: [
                                                'MathType', 'ChemType','heading', 
                                                '|',
                                                'bold',
                                                'italic',
                                                'link',
                                                'bulletedList',
                                                'numberedList',
                                                'imageUpload',
                                                'mediaEmbed',
                                                'insertTable',
                                                'blockQuote',
                                                'undo',
                                                'redo'
                                            ]
                                        },
                                    }}
                                    onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        // console.log("Editor is ready to use!", editor);
                                        editor.editing.view.change(writer => {
                                          writer.setStyle(
                                            "height",
                                            "300px",
                                            editor.editing.view.document.getRoot()
                                          );
                                          writer.setStyle(
                                            "width",
                                            "1200px",
                                            editor.editing.view.document.getRoot()
                                          );
                                        });
                                    }}
                                    data=""
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        setFormData({ ...formData, temp_answer: data });
                                    } }
                                />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <button className="btn btn-info btn-round" id="" onClick={(e)=>handleSubmit(e,1)}> {loading? 'Submitting...': 'Submit'}</button>
                            <button className="btn btn-danger btn-round" id="" onClick={()=>setSkip()}> Skip</button>
                            <span style={{color:"red",padding: "10px", marginLeft: "50px"}}>{error}</span>
                        </div>
                        <div className="col-md-12 Reason_bg Reason_bg1 mt-4" style={{display:`${display}`}}>
                            <p> Reason for Skip</p>
                        <div className="custom-control custom-radio">
                           <input type="radio" className="custom-control-input" name="tutor" value="incomplete-question" id="tutor1" onChange={setReason}/>
                           <label className="custom-control-label" htmlFor="tutor1">Incomplete Question</label>
                        </div>
                        <div className="custom-control custom-radio">
                           <input type="radio" className="custom-control-input" name="tutor" value="difficult-question" id="tutor2" onChange={setReason}/>
                           <label className="custom-control-label" htmlFor="tutor2">Difficult Question</label>
                        </div>
                            <button className="btn btn-info btn-round mt-4 reasonbtn" id="btntutor" onClick={handleSubmit}>{loading? 'Submitting...': 'Submit'}</button>
                     </div>
                    </div>
                </div>
            </div>
        </div>
    )
}