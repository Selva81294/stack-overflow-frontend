import React from 'react'
import {Link} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import './css/AllQuestions.css' 
import ReactHtmlParser from "html-react-parser"

const AllQuestions = ({ques}) => {

    function maxLengthAnswer(str,n){
        return str?.length > n ? str.substr(0,n-1) + "..." : str
    }

    const tags = ques?.tags;

  return (
    <div className='all-questions'>
        <div className='all-questions-container'>
            <div className='all-questions-left'>
                <div className='all-options'>
                    <div className='all-option'>
                        <p>0</p>
                        <span>Votes</span>
                    </div>
                    <div className='all-option'>
                        <p>{ques?.answerDetails?.length}</p>
                        <span>Answers</span>
                    </div>
                    <div className='all-option'>
                        <small>3 Views</small>
                    </div>
                </div>
            </div>
            <div className='question-answer'>
                <Link  to={`/question?q=${ques?._id}`}>{ques?.title}</Link>
                <div style={{width:"90%"}}>
                    <div>{ReactHtmlParser(maxLengthAnswer(ques?.body, 200))}</div>
                </div>
                <div style={{display:"flex", marginTop:"20px"}}>
                {
                    tags.map((tagdata,idx)=>(
                        <div key={idx}>
                        <span className='question-tags'>
                            {tagdata}
                        </span>
                    </div> 
                    ))
                }
                </div>
                <div className='author'>
                    <small>{ques?.created_at}</small>
                    <div className='author-details'>
                        <Avatar/>
                        <p>{ques?.user}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AllQuestions