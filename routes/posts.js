const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

// get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (err) {
    res.json({ msg: err })
  }
})

router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  })

  try {
    const savedPost = await post.save()
    res.json(savedPost)
  } catch (err) {
    res.json({ msg: err })
  }
})

// get specific post
router.get('/:postId', (req, res) => {
  Post.findById(req.params.postId).then(result => res.send(result))
})

// delete post
router.delete('/:postId', async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId })
    res.json(removedPost)
  } catch (err) {
    res.json({ msg: err })
  }
})

// update a post
router.patch('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    )
    res.json(updatedPost)
  } catch (err) {
    res.json({ msg: err })
  }
})

module.exports = router
