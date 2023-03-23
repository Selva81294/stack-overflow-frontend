import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Bookmark from '@mui/icons-material/Bookmark';
import History from '@mui/icons-material/History';
import { Avatar } from '@mui/material';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import './index.css'
import axios from 'axios';
import parser from "html-react-parser"


const MainQuestion = () => {
const [show,setShow] = useState(false)
const [answer,setAnswer] = useState("")
const [comment, setComment] =useState("")
const [vote,setVote] = useState(0)

const [questionData, setQuestionData] = useState()

let search = window.location.search
const params = new URLSearchParams(search)
const id = params.get("q")
useEffect(()=>{
    async function getQuestionDetails(){
        await axios.get(`https://stack-overflow-backend-kohl.vercel.app/api/question/${id}`,{
            headers:{"x-auth-token": localStorage.getItem("token")}
        })
        .then((res)=>{
            // console.log(res.data[0])
            setQuestionData(res.data[0])
        }).catch((err)=>{
            console.log(err)
        })
    }
    getQuestionDetails()
},[id])

async function getUpdatedAnswer(){
    await axios.get(`https://stack-overflow-backend-kohl.vercel.app/api/question/${id}`,{
        headers:{"x-auth-token": localStorage.getItem("token")}
    })
    .then((res)=>{
        // console.log(res.data[0])
        setQuestionData(res.data[0])
    }).catch((err)=>{
        console.log(err)
    })
}



const handleQuill = (value) =>{
    setAnswer(value)
}

const handleSubmit = async ()=>{
    if (answer !== "") {
        const body = {
            question_id: id,
            answer
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }
        await axios.post('https://stack-overflow-backend-kohl.vercel.app/api/answer', body, config)
        .then((res)=>{
            // console.log(res.data)
            alert("answer added successfully")
            setAnswer("")
            getUpdatedAnswer()
        }).catch((err)=>{
            console.log(err)
        })
    }
}

const handleComment = async () =>{
    if(comment !== ""){
        const commentBody = {
            question_id: id,
            comment
        }
        await axios.post(`https://stack-overflow-backend-kohl.vercel.app/api/comment/${id}`, commentBody , {
            headers: {"x-auth-token": localStorage.getItem("token")}
        }).then((res)=>{
            setComment("")
            setShow(false)
            getUpdatedAnswer()
        })
    }
}

  return (
    <div className='main'>
        <div className='main-container'>
            <div className='main-top'>
                <h2 className='main-question'>{questionData?.title}</h2>
                <Link to="/addquestions">
                    <button>Ask Question</button>
                </Link>
            </div>
            <div className='main-desc'>
                <div className='info'>
                    <p>{questionData?.created_at}</p>
                    <p>Active <span>today</span></p>
                    <p>viewed <span>43 times</span></p>
                </div>
            </div>
            <div className='all-questions'>
             <div className='all-questions-container'>
                <div className='all-questions-left'>
                    <div className='all-options'>
                        <p className='arrow'>🔼</p>
                        <p className='arrow'>0</p>
                        <p className='arrow'>🔽</p>
                        <Bookmark/>
                        <History/>
                    </div>
                </div>
                <div className='question-answer'>
                    <p>{parser(`${questionData?.body}`)}</p>
                    <div className='author'>
                        <small>asked {questionData?.created_at}</small>
                        <div className='auth-details'>
                            <Avatar/>
                            <p>{questionData?.user}</p>
                        </div>
                    </div>
                    <div className='comments'>
                    <div className='comment'>
                        {
                           questionData?.comments?.map((data)=>(      
                            <p>{data?.comment} - <span>{data?.user}</span>
                            <small> {data?.created_at}</small></p>                    
                           )) 
                        }
                        </div>

                        <p onClick={()=>setShow(!show)}>Add a comment</p>
                        {
                            show &&  (<div className='title'>
                                <textarea value={comment} onChange={(e)=>setComment(e.target.value)} type="text" placeholder="Add your comment..." rows={5}
                                style={{margin:"5px 0px", padding:"10px", border:"2px solid skyblue",
                                borderRadius:"3px", outline:"none"}}></textarea>
                                <button onClick={handleComment} style={{maxWidth:"fit-content"}}>Add comment</button>
                            </div>)
                        }
                    </div>
                </div>
             </div>
            </div>
            <div className='all-questions'>
                <p style={{marginBottom:"20px", fontSize:"1.3rem", fontWeight:"300"}}>{questionData?.answerDetails?.length} Answer(s)</p>
                {
                    questionData?.answerDetails?.map((data)=>(
                        <div key={data._id} className='all-questions-container'>
                        <div className='all-questions-left'>
                            <div className='all-options'>
                                <p className='arrow'>🔼</p>
                                <p className='arrow'>0</p>
                                <p className='arrow'>🔽</p>
                                <Bookmark/>
                                <History/>
                            </div>
                        </div>
                        <div className='question-answer'>
                            <p>{parser(`${data?.answer}`)}</p>
                            <div className='author'>
                                <small>asked {data?.created_at}</small>
                                <div className='auth-details'>
                                    <Avatar/>
                                    <p>{data?.user}</p> 
                                </div>
                            </div>
                        </div>
                        </div>
                    ))
                }

            </div>
        </div>
        <div className='main-answer'>
            <h3 style={{fontSize:"22px", margin:"10px 0px", fontWeight:"400"}}>Your answer</h3>
            <ReactQuill value={answer} onChange={handleQuill} className="react-quill" theme="snow" style={{height:"200px", color:"whitesmoke"}}/>
        </div>
        <button type='submit' onClick={handleSubmit} style={{maxWidth:"fit-content", marginTop:"50px"}}>Post Your Answer</button>
    </div>
  )
}

export default MainQuestion