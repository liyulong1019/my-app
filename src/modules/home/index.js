import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.less";
import ImgText from "@components/imgText";
import Quotes from "./Quotes";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div
        className="home-game"
        onClick={() => {
          navigate("/games");
        }}
      >
        <ImgText
          src="https://picsum.photos/seed/b/1200/200"
          fontSize="80px"
          fontFamily="fantasy"
          alt="Games"
          text="Games"
        />
      </div>
      <div className="home-weather">
        <iframe
          width={800}
          height={100}
          frameBorder={0}
          scrolling="no"
          hspace="0"
          title="Weather forecast widget"
          src="https://i.tianqi.com/?c=code&a=getcode&id=48&num=6&icon=1"
        ></iframe>
      </div>
      <Quotes />
      <h1>Hello World</h1>
      <Link to="about">About Us</Link>
      <br />
      <Link to="counter">Counter Us</Link>
    </div>
  );
}
