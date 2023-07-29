import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./create.css";
import { preview, createBG } from "../assets";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import { getRandomPrompt } from "../utils";
import Axios from "axios";
const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(form.prompt && form.photo){
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/v1/post" , {
          method: 'POST',
          headers : {
            'Content-Type':'application/json',
          },
          body : JSON.stringify(form)
        })
        await response.json();
        // const response = await Axios.post("http://localhost:8000/api/v1/post",{
        //   name:form.name,
        //   prompt:form.prompt,
        //   photo:form.photo
        // })
        navigate("/")
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false);
      }
    }
    else{
      alert('Please enter a prompt and generate a image');
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8000/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        // setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
        await setForm({ ...form, photo: data.imageURL });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a Prompt");
    }
  };

  return (
    
      <section className="create-container">
        <div className="form-container">
          <div className="create">
            <h1 className="create-header">Create</h1>
            <p className="create-para">
              Create imaginative and visually stunning images through MindSketch
              and share them with the community
            </p>
          </div>
          <form className="create-form" onSubmit={handleSubmit}>
            <div>
              <FormField labelname="Your name" name="name" />
              <input
                className="form-input"
                type="text"
                id="name"
                name="name"
                placeholder=""
                value={form.name}
                onChange={handleChange}
              ></input>
              <FormField
                labelname="Prompt"
                name="Prompt"
                isSurpriseMe
                handleSurpriseMe={handleSurpriseMe}
              />
              <input
                className="form-input"
                type="text"
                name="prompt"
                placeholder="A Samurai riding a Horse on Mars, lomography."
                value={form.prompt}
                onChange={handleChange}
              ></input>
              <div className="gen-image">
                {form.photo ? (
                  <img
                    className="gen-image"
                    src={form.photo}
                    alt={form.prompt}
                  />
                ) : (
                  <img className="gen-image" src={preview} alt="preview" />
                )}

                {generatingImg && (
                  <div className="gen-loader">
                    <Loader />
                  </div>
                )}
              </div>
            </div>
            <div>
              <button
                type="button"
                className="button"
                id="gen-btn"
                onClick={generateImage}
              >
                {generatingImg ? "Generating..." : "Generate"}
              </button>
            </div>
            <div className="share-container">
              <p className="create-para">
                Once you have generated the image of your desire, you can share
                it with others in the Community
              </p>
              <button type="submit" className="button" id="share-btn" onClick={handleSubmit}>
                {loading ? "Sharing..." : "Share with Community"}
              </button>
            </div>
          </form>
        </div>
        <div className="pic-container"></div>
      </section>
   
  );
};

export default Create;
