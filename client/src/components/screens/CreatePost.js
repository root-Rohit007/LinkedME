import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
const CretePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (url) {
      //Calling to createpost
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"), //adding token to headers
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-3" });
          } else {
            M.toast({
              html: "Created post Successfully",
              classes: "#43a047 green darken-1",
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postDetails = () => {
    // sending data to cloudinary
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "LinkedME");
    data.append("cloud_name", "rohit007");
    fetch("https://api.cloudinary.com/v1_1/rohit007/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        //successful sending data
        console.log(data);
        //We got the url --> Set the url
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="card input-filed"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
        background: " linear-gradient(to right, #614385, #516395)",
        borderRadius: "15px",
      }}
    >
      {/* Input Text */}
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Input Body */}
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      {/* Upload a pic */}
      <div className="file-field input-field">
        <div
          className="btn #64b5f6 blue darken-1"
          style={{ background: "linear-gradient(to right, #24c6dc, #514a9d)" }}
        >
          <span>Uplaod Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
        style={{ background: "linear-gradient(to right, #24c6dc, #514a9d)" }}
        onClick={() => postDetails()}
      >
        Submit post
      </button>
    </div>
  );
};

export default CretePost;
