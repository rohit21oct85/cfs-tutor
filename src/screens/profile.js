import ProfileComp from "../components/profile-comp";
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import {useState,useEffect} from 'react'
import { getTutotDetails, deleteEducation, saveEducation } from '../api/profile';

export default function Profile(){
    const [passedData, setPassedData]= useState();
    
    useEffect(() => {
        async function getData()
        {
            const data = {email:localStorage.getItem('tutor_email')};
            const response = await getTutotDetails(data);
            setPassedData(response.data.data);
        }
        getData();
        return () => {}
    }, [])

  

    return(
        <>
            <Header/>
            <Sidebar/>
            <ProfileComp data={passedData} deleteEducation={deleteEducation} saveEducation={saveEducation}/>
        </>
    )
}