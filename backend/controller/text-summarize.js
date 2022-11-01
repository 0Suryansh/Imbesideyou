
const Documents=require('../models/Documents')


exports.textSummarize=async (req,res)=>{
    console.log(req.body)

    Documents.create({user_id:req.body.user_id,doc_type:req.body.doc_type,input_para:req.body.input_para,output_para:req.body.output_para},(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
}
exports.summaryGetAllSummary = async (req, res, next) => {
  try {
    const { id } = req.params;
    const respoonse = await Documents.find({
      user_id: id,
      doc_type:"Summary"
    });

    if (!respoonse) {
      const error = new Error("Record does not exist");
      return next(error);
    }

    res.json(respoonse);
  } catch (error) {
    next(error);
  }
};
exports.summaryGetAllContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const respoonse = await Documents.find({
      user_id: id,
      doc_type:"Content"
    });

    if (!respoonse) {
      const error = new Error("Record does not exist");
      return next(error);
    }

    res.json(respoonse);
  } catch (error) {
    next(error);
  }
};
exports.summaryGetAllTweets = async (req, res, next) => {
  try {
    const { id } = req.params;
    const respoonse = await Documents.find({
      user_id: id,
      doc_type:"Tweet"
    });

    if (!respoonse) {
      const error = new Error("Record does not exist");
      return next(error);
    }

    res.json(respoonse);
  } catch (error) {
    next(error);
  }
};

exports.summaryGetById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const respoonse = await Documents.findOne({
        _id: id,
      });
  
      if (!respoonse) {
        const error = new Error("Record does not exist");
        return next(error);
      }
  
      res.json(respoonse);
    } catch (error) {
      next(error);
    }
  };

exports.delete = (req, res) => {
  Documents.findByIdAndDelete(req.params.id).then((response) => {
      if (!response) {
          return res.status(404).send();
      }
      res.send(response);
  }).catch((error) => {
      res.status(500).send(error);
  })
}

