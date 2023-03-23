import React from 'react'
import {Link} from 'react-router-dom'
import FilterListIcon from '@mui/icons-material/FilterList';
import AllQuestions from './AllQuestions';
import './css/Sidebar_main.css'

const Sidebar_main = ({question}) => {
  return (
    <div className='main'>
      <div className='main-container'>
        <div className='main-top'>
          <h2>All Questions</h2>
          <Link to = '/addquestions'>
            <button>Ask Questions</button>
          </Link>
        </div>
        <div className='main-dec'>
          <p>{question.length} Questions</p>
          <div className='main-filter'>
            <div className='main-tab'>
              <Link>Newest</Link>
            </div>
            <div className='main-tab'>
              <Link>Active</Link>
            </div>
            <div className='main-tabs'>
            <div className='main-tab'>
              <Link>More</Link>
            </div>
            </div>
            <div className='main-filter-item'>
              <FilterListIcon/>
              <p>Filter</p>
            </div>
          </div>
        </div>
        <div className='questions'>
          {
            question.map((ques, idx)=>(
              <div key={idx} className='question'>
              <AllQuestions ques = {ques}/>
            </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar_main