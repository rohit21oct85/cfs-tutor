import axios from 'axios'
import { apiUrl, authAxios } from '../config/config'

export default async function getBooks(subject_id) {
    try {
        const res = await authAxios.post(apiUrl + 'books/open', {subject_id: subject_id})
        return res.data;
    }
    catch(e){
        
    }
}

export async function getChaptersAndQuestions(isbn,chapter_no) {
    try {
        const res = await authAxios.post(apiUrl + 'books/chapter-question', {book_isbn: isbn, chapter_no: chapter_no})
        return res.data;
    }
    catch(e){
        return e
    }
}

export async function getQuestion(questionId) {
    try {
        const res = await authAxios.post(apiUrl + 'books/get-question-only', {questionId: questionId})
        return res.data;
    }
    catch(e){
        return e
    }
}
export async function startAnswering(questionId, userId) {
    try {
        const res = await authAxios.post(apiUrl + 'books/start-answering', {question_id: questionId, user_Id:userId})
        return res.data;
    }
    catch(e){
        return e
    }
}
export async function finishAnswering(formData) {
    try {
        const res = await authAxios.post(apiUrl + 'books/finish-answer', formData)
        return res.data;
    }
    catch(e){
        return e
    }
}