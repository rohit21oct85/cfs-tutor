import axios from 'axios'
import { apiUrl, authAxios } from '../config/config'

export default async function saveFormFirst(formdata){
    try {
        return await axios.post(apiUrl + "auth/save-profile-info", formdata)
    }
    catch(e){
        return e.response
    }
}

export  async function saveEducation(formdata){
    try {
        return await axios.post(apiUrl + "auth/save-education", formdata)
    }
    catch(e){
        return e.response
    }
}

export  async function saveMasteredSubject(formdata){
    try {
        return await axios.post(apiUrl + "auth/save-mastered-subject", formdata)
    }
    catch(e){
        return e.response
    }
}

export  async function saveBankDetails(formdata){
    try {
        return await axios.post(apiUrl + "auth/save-bank-details", formdata)
    }
    catch(e){
        return e.response
    }
}

export  async function getTutotDetails(formdata){
    try {
        return await axios.post(apiUrl + "auth/get-tutor-details", formdata)
    }
    catch(e){
        return e.response
    }
}

export async function getSubjectSubSubjectData() {
    try {
        const res = await axios.get(apiUrl + 'auth/view-all')
        return res.data.data;
    }
    catch(e){
        
    }
}

export async function getDashboardData(formData) {
    try {
        const res = await authAxios.post(apiUrl + 'books/get-dashboard-data', {userId: formData})
        return res.data;
    }
    catch(e){
        
    }
}

export async function deleteEducation(key,email) {
    try {
        const res = await authAxios.post(apiUrl + 'auth/delete-education', {id: key,email:email})
        return res.data;
    }
    catch(e){
        
    }
}