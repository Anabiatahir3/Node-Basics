const express = require('express');
//3rd party middleware
const morgan=require('morgan');
//coonceting to localdb using mongoose library
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/blogsdb', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
    app.listen(3000);
    console.log("connection successful")
}).catch((err)=>{
console.log(err)
})
const Blog=require('./models/blog')
// express app
const app = express();
//register view engine
app.set('view engine','ejs');

// //another way of creating a document using async function
// const createDocument=async()=>{
//     try{
//     const blog = new Blog({
//       title: 'new blog',
//       snippet: 'about my new blog',
//       body: 'more about my new blog'
//     })
// const result=await blog.save();
// console.log(result);}
//     catch(err){
//         console.log(err)}
//     };
// createDocument();

//middleware and static files(any file that has to be made available for the browser to see shall be kept in the public folder)
app.use(express.static('public'));
app.use(express.urlencoded({extender:true}));
app.use(morgan('dev'));


app.get("/",(req,res)=>{
    res.redirect('/blogs')
});

app.get("/about",(req,res)=>{
    res.render('about',{title:'About'})
})
app.get("/blogs/create",(req,res)=>{
    res.render("create",{title:'create'})
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.post('/blogs', (req, res) => {
    // console.log(req.body);
    const blog = new Blog(req.body);
  
    blog.save()
      .then(result => {
        res.redirect('/blogs');
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.get('/blogs/:id', async (req, res) => {
    try{
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
      })}
      catch(err){
        console.log(err);
      };
    }
  )
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

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
app.use((req,res)=>{
    res.status(404).render('404',{title:'Error'})
})
 