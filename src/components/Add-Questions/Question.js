import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../Add-Questions/css/Question.css";
import { TagsInput } from "react-tag-input-component";
import Base from "../Base/Base";
import { useHistory } from "react-router-dom";
import { decodeToken } from "react-jwt";
import axios from "axios";

const Question = () => {

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [loading,setLoading] = useState(false)
  
  const history = useHistory()
   
  const handleQuill = (value) =>{
    setBody(value)
  }

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
    getUser();
  }, []);

const handleSubmit = async (e) =>{
  e.preventDefault()
  if (title !== "" && body !== "") {
    const bodyJSON = {
      title,
      body,
      tags,
    };
    await axios
      .post("https://stack-overflow-backend-kohl.vercel.app/api/question", bodyJSON, {
        headers:{"x-auth-token": localStorage.getItem("token")}
      })
      .then((res) => {
        // console.log(res.data);
        alert("Question added successfully");
        history.push("/mainpg");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

  return (
    <Base>
    <div className="add-question">
      <div className="add-question-container">
        <div className="head-title">
          <h1>Ask a public question</h1>
        </div>
        <div className="question-container">
          <div className="question-options">
            <div className="question-option">
              <div className="title">
                <h3>Title</h3>
                <small>
                  Be specific and imagine you’re asking a question to another
                  person.
                </small>
                <input
                  value={title} onChange={(e)=>setTitle(e.target.value)}
                  type="text"
                  placeholder="e.g. Is there an R function for finding the index of
                           an element in a vector?"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Body</h3>
                <small>
                  Include all the information someone would need to answer your
                  question
                </small>
                <ReactQuill value={body} onChange={handleQuill} className="react-quill" theme="snow" />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Tags</h3>
                <small>
                  Add upto 5 tags to describe what your question about
                </small>
                {/* <pre>{JSON.stringify(selected)}</pre> */}
                <TagsInput classNames={{tag:'tag-cls', input: 'input-cls'}}
                  value={tags}
                  onChange={setTags}
                  name="tags"
                  placeHolder="press enter to add tags"
                />
              </div>
            </div>
          </div>
        </div>
        <button disabled={loading} type="submit" onClick={handleSubmit}  className="button">
          {loading ? "Adding Question...": "Add your question"}</button>
      </div>
    </div>
    </Base>
  );
};

export default Question;
