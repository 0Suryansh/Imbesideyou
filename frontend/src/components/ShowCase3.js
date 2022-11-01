import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea, Modal } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';
import { toastStyle } from '../utility/helper'
import CircularProgress from "@mui/material/CircularProgress"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ShowCase3 = () => {
  let navigate=useNavigate()

  const [open, setOpen] = React.useState(false);
  const [docs, setDocs] = React.useState();
  React.useEffect(() => {
    async function fetchData() {
      if(!localStorage.getItem("isAuthenticated")){
        return
      }
      const id=JSON.parse(localStorage.getItem("isAuthenticated")).sub
      const req = await axios.get(`http://localhost:9001/api/allcontent/${id}`);
      setTimeout(() => {
        setDocs(req.data);        
      }, 1000);
    }
    fetchData();
  }, [docs]);

  const handleClose = () => {
    setOpen(false);
  };
  async function handleOpen() {
    setOpen(true);
  }

  return (
    <div style={{textAlign:"center"}}>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "#fff",
        margin: 2,
        borderRadius: 2,
        justifyContent:"center",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
      }}
    >
      <Card sx={{ maxWidth: 345, margin: 6 }} onClick={()=>{navigate('/input-article')}}>
        <CardActionArea>
          <CardContent sx={{textAlign:"center"}}>
          <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AddIcon />
            </IconButton>
            <Typography gutterBottom variant="h5" component="div">
              Start a New Project
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Generate any content for your Blog with a click of a button. This Content generation can generate post on various different topics.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Box>
      {localStorage.getItem("isAuthenticated")?(
        <div>
        {docs?<Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "#fff",
          margin: 2,
          borderRadius: 2,
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        }}
      >
        {docs?.map((response) => (
          <Card sx={{ maxWidth: 345, margin: 6 }}>
            <CardActionArea>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {response.output_para.substring(2,200) + "..."}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{display:"flex",justifyContent:"space-between"}}>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => {
                  handleOpen();
                }}
              >
                Read More...
              </Button>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <DeleteIcon onClick={()=>{
                  axios.delete('http://localhost:9001/api/delete/'+response._id).then(res => {  
                    toast.success('Deleted Successfully',{...toastStyle.success})
                  })  
                }}/>
              </IconButton>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Summarized Text:-
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "justify",
                      mt: 2,
                      flexDirection: "column",
                    }}
                  >
                    <p style={{ fontWeight: 700,textAlign:"center" }}>Text to be Summarized:-</p>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {response.input_para}
                    </Typography>
                    <div style={{marginTop:2}}>
                    <p style={{ fontWeight: 700 ,textAlign:"center"}}>Summarized Output:-</p>
                      <Typography
                        id="modal-modal-description"
                        sx={{ textAlign: "justify" }}
                      >
                        {response.output_para}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={() => {
                          handleClose();
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </Box>
                </Box>
              </Modal>
            </CardActions>
          </Card>
        ))}
      </Box>: <CircularProgress/>}
        </div>
      ):null}
    </div>
  );
};
export default ShowCase3;
