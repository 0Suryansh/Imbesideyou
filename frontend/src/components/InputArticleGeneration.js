import React from "react";
import Box from "@mui/material/Box";
import { Typography, TextField, Button, Modal } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import toast from 'react-hot-toast';
import { toastStyle } from '../utility/helper'
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const InputArticleGeneration = () => {
  const [open, setOpen] = React.useState(false);
  const [buttonName, setButtonName] = React.useState("Generate");
  const [output,setOutput]=React.useState("null")
  const [textInput,setTextInput]=React.useState("")

  React.useEffect(()=>{
    if(textInput===""){
      setButtonName("Generate")
    }
  },[textInput])

  async function handleOpen() {
    if(textInput===""){
      toast.error('Please Enter some text to Generate',{...toastStyle.error})
      return
    }
    setButtonName("Generating...");
    setOutput("null")
    setOpen(true);
    const loggedIn=false
    if(loggedIn){
      const res=await axios.get("http://localhost:9001/api/text-summarize/635e54278cf5a1b23edbdb91")
      console.log(res.data.output_para)
      setOutput(res.data.output_para)
    }else{
       await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `${textInput}`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response)=>{
        const output=response.data.choices[0].text
        setOutput(output)
      })
    }
  };
  const handleClose = () => {
    setButtonName("Re-Generate");
    setOpen(false);
  };

  const handleChange = (e) => {
    setTextInput(e.target.value);
  };

  return (
    <Box
      sx={{
        textAlign: "left",
        backgroundColor: "#fff",
        margin: 2,
        padding: 5,
        borderRadius: 2,
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          display: { md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        📖Content Generation📖
      </Typography>
      <Typography
        variant="h6"
        sx={{
          display: { md: "flex" },
          mt: 2,
          fontFamily: "helvetica",
          fontWeight: 100,
          letterSpacing: ".1rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Generate any content for your Blog with a click of a button. This Article generation can generate post on various different topics.
      </Typography>
      <Typography
        variant="p"
        sx={{
          display: { md: "flex" },
          mt: 5,
          fontFamily: "verdana",
          fontWeight: 100,
          letterSpacing: ".1rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Paste or write about your topic and then click the Summarize Button🖋️
      </Typography>
      <TextField
        fullWidth
        value={textInput}
        onChange={handleChange}
        name="input-box"
        id="outlined-basic"
        label="Enter Text Here"
        variant="outlined"
        sx={{ mt: 2 }}
        multiline
        rows={2}
      />
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => {
          handleOpen();
        }}
      >
        {buttonName}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your Summarized result is:-
          </Typography>
          <Box sx={{ display: "flex", justifyContent:"center",mt:2 }}>
            {output==="null"?<div style={{textAlign:"justify"}}>
              <div style={{textAlign:"center"}}>
            <CircularProgress />
            </div>
            </div>:(
              <div>
              <Typography id="modal-modal-description" sx={{ mt: 2,textAlign:"justify" }}>
                {output}
              </Typography>
              <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={()=>{
                if(localStorage.getItem('isAuthenticated')){
                  axios
                    .post("http://localhost:9001/api/document", {
                      user_id:JSON.parse(localStorage.getItem('isAuthenticated')).sub,
                      doc_type:"Content",
                      input_para:textInput,
                      output_para:output
                      })
                    .then((response) => {
                      toast.success('Document Saved Successfully 🥳',{...toastStyle.success})
                    });
                }else{
                toast.error('Please Login First to Save it',{...toastStyle.error})
                }
              }}
              >
              Save
              </Button>
          </div>
          )}
          </Box>
          
        </Box>
      </Modal>
    </Box>
  );
};
export default InputArticleGeneration;
