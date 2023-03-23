import React, { useEffect, useState } from 'react'
import Sidebar_content from './Sidebar_content'
import Sidebar_main from './Sidebar_main'
import './css/Sidebar_container.css'
import Base from '../Base/Base'
import { useHistory } from 'react-router-dom'
import { decodeToken } from "react-jwt";
import axios from 'axios'

const Sidebar_container = () => {
  const [question,setQuestion] = useState([])

  const history = useHistory()

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return history.push("/");
      const user = decodeToken(token);
      if (!user) {
        localStorage.removeItem("token");
        history.push("/");
      }
    };

    const getQuestions = async () =>{
      await axios.get("https://stack-overflow-backend-kohl.vercel.app/api/question", {
        headers:{"x-auth-token": localStorage.getItem("token")}
      })
      .then((res)=>{
        // console.log(res.data)
        setQuestion(res.data.reverse())
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    getUser();
    getQuestions();
  }, []);

  return (
    <Base>
    <div className='sidebar_container_main'>
        <div className='sidebar_container_div1'>
            <Sidebar_content/>
            <Sidebar_main question={question}/>
        </div>
    </div>
    </Base>
  )
}

export default Sidebar_container