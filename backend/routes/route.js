const router=require('express').Router()

router.post('/document',require('../controller/text-summarize').textSummarize)
router.get('/allsummary/:id',require('../controller/text-summarize').summaryGetAllSummary)
router.get('/alltweet/:id',require('../controller/text-summarize').summaryGetAllTweets)
router.get('/allcontent/:id',require('../controller/text-summarize').summaryGetAllContent)
router.get('/document/:id',require('../controller/text-summarize').summaryGetById)
router.post('/googlelogin',require('../controller/authentication').googlelogin)
router.delete('/delete/:id',require('../controller/text-summarize').delete)
module.exports = router;