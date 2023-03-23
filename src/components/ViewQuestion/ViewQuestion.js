import React, { useEffect } from "react";
import MainQuestion from "./MainQuestion";
import Sidebar_content from "../StackOverflow/Sidebar_content"
import Base from "../Base/Base";
import { decodeToken } from "react-jwt";
import { useHistory } from "react-router-dom";

function ViewQuestion() {

  const history =  useHistory()

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

  return (
    <Base>
    <div className="sidebar_container_main">
      <div className="sidebar_container_div1">
        <Sidebar_content/>
        <MainQuestion />
      </div>
    </div>
    </Base>
  );
}

export default ViewQuestion;