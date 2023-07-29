import React from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";
import './card.css'
const Card = ({_id, name, prompt, photo}) => {
  return (
    <div className="card">
      <img className="card-img" src={photo} alt={prompt}></img>
      <div className="card-data">
        <p className="card-prompt">{prompt}</p>
        <div className="card-userinfo">
          <div className="card-userdata">
            <div className="card-userAvatar">{name[0]}</div>
            <p className="card-userName">{name}</p>
          </div>
          <button className="card-btn" type="button" onClick={()=> downloadImage(_id,photo)}><img className="card-downpic" src={download} alt="↓"/></button>
        </div>
      </div>
    </div>
  );
};

export default Card;
