const express=require('express');
const Blog=require('../models/blog')
const router=express.Router
const blogController=require('../controllers/blogController')

router.get("/create",blogController.blog_create_get)
router.get('/',blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);
  //deleting blogs by id
//   app.delete('/blogs/:id',async(req,res)=>{
//     try{
//         const id=req.params.id;
//         const deleteBlog= await Blog.findById(id);
//         if(!req.params.id){
//             return res.status(400).send();
//         }
//     res.send(deleteBlog)
//     res.json({redirect:'/blogs'})
//     }catch(e){
// res.status(500).send(e)} })

router.delete('/:id', blogController.blog_delete);

  module.exports=router;