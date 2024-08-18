import React, { useEffect, useState } from "react";
import ImgText from "../../../common/components/imgText";
import axios from "axios";
import { SoundOutlined } from "@ant-design/icons";
import "./index.less";

export default function Quotes() {
  const [quotes, setQuotes] = useState({});
  useEffect(() => {
    axios
      .get("http://127.0.0.1:1111/quotes")
      .then((res) => {
        setQuotes(res.data);
      })
      .catch();
  }, []);

  const audioPlay = (src) => {
    const au = document.getElementById("audio");
    au.src = src;
    au.load();
    au.play();
  };

  const getText = () => {
    if (!quotes.text) return "";
    const text = `${quotes.text || ""} ${
      quotes.author ? ` ———${quotes.author}` : ""
    }`;
    return (
      <div>
        {text}
        <span
          className="quotes-soundOutlined"
          onClick={() => {
            const s = localStorage.getItem(`speech_${quotes.id}`);
            if (s) {
              audioPlay(s);
            } else {
              axios
                .post("http://127.0.0.1:1111/textToSpeech", {
                  text,
                  id: quotes.id,
                })
                .then((res) => {
                  audioPlay(res.data.speech);
                  localStorage.setItem(
                    `speech_${res.data.id}`,
                    res.data.speech
                  );
                });
            }
          }}
        >
          <SoundOutlined />
        </span>
      </div>
    );
  };
  return (
    <div className="quotes">
      <audio id="audio">
        <source type="audio/wav" />
        您的浏览器不支持 audio 元素。
      </audio>
      <ImgText
        src="https://picsum.photos/seed/ss/1200/200"
        alt="quotes"
        text={getText()}
      />
    </div>
  );
}
