import BlockHeader from '../components/block-header'
import QuestionList from '../components/question-list'
import Header from '../components/header'
import Sidebar from '../components/sidebar'

export default function BookQuestionList(){
    return(
        <>
        <Header/>
        <Sidebar/>
        <section className="content profile-page">
            <BlockHeader/>
            <QuestionList/>
        </section>
        </>
    )
}