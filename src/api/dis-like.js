import express from 'express';
import query from '../utils/dbqueries'

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const isLiked = await query.isUserLiked(req.query.participant, req.query.liked_participant)
      if (isLiked) {
        res.status(200).json({
          success: true,
          message: "dislike"
        });
      } else {
        res.status(200).json({
          success: true,
          message: "like"
        })
      }
    } catch (ex) {
      console.log("an error occured: ", ex.message);
    }
  });

module.exports = router;
