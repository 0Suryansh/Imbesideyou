import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import {useNavigate} from 'react-router-dom'

const Products = () => {
  let navigate=useNavigate()
  return (
    <Box sx={{display:"flex",justifyContent:"center",flexWrap:"wrap"}}>
          <Card sx={{ maxWidth: 345,margin:6 }} onClick={()=>navigate('/text-summarize')}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://miro.medium.com/max/612/1*VQmaXe3vWq-fL_t7aDmtfg.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Text Summarization
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Summarize any text with a click of a button. This summarizer can condense articles, papers, or documents down to the key points instantly.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={()=>navigate('/text-summarize')}>
              Explore
              </Button>
            </CardActions>
          </Card>

          <Card sx={{ maxWidth: 345,margin:6  }} onClick={()=>navigate('/tweet-generation')}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_IRjBl6QgVzxEtT9KtRfBB8hKOOP8AjlPUItgP3gO2_AN2LlIMFSEZXa075jpH1FANIA&usqp=CAU"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Tweet Generation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Generate any tweet for twitter with a click of a button. This Tweet generation can generate tweets on various different topics.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={()=>navigate('/tweet-generation')}>
              Explore
              </Button>
            </CardActions>
          </Card>

          <Card sx={{ maxWidth: 345,margin:6  }} onClick={()=>navigate('/article-generation')}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://martech.org/wp-content/uploads/2015/11/content-marketing-idea-lightbulb-ss-1920.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Content Generation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Generate any content for your Blog with a click of a button. This Content generation can generate post on various different topics.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={()=>navigate('/article-generation')}>
              Explore
              </Button>
            </CardActions>
          </Card>

    </Box>
  );
};
export default Products;
