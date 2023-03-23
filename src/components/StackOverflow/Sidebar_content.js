import React from "react";
import Stars from "@mui/icons-material/Stars";
import Public from "@mui/icons-material/Public";
import Work from "@mui/icons-material/Work";
import { Link } from "react-router-dom";
import './css/Sidebar_content.css'

const Sidebar_content = () => {
  return (
    <div className="sidebar_content_main">
      <div className="sidebar_content_main1">
        <div className="sidebar_content_main2">
      <div className="sidebar_content_option">
        <Link>HOME</Link>
      </div>

      <div className="sidebar_content_option">
        <p>PUBLIC</p>
        <div className="link">
          <div className="link-tag">
          <Public />
          <Link>Question</Link>
        </div>
        <div className="tags">
          <p>Tags</p>
          <p>Users</p>
        </div>
      </div>
      </div>

      <div className="sidebar_content_option">
        <p>COLLECTIVES</p>
        <div className="link">
          <div  className="link-tag">
          <Stars />
          <Link>Explore Collectives</Link>
        </div>
      </div>
      </div>

      <div className="sidebar_content_option">
        <p>FIND A JOB</p>
        <div className="link">
        <div  className="link-tag">
          <Link>Question</Link><br/>
        </div>
      </div>
      </div>

      <div className="sidebar_content_option">
        <p>TEAMS</p>
        <div className="link">
        <div  className="link-tag">
          <Work/>
          <Link>Companies</Link>
        </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Sidebar_content;
