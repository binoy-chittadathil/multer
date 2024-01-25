const express=require('express');
const multer=require('multer');
const path=require('path');
const app=express();

// Multer storage configuration
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
});
// Multer middleware setup
const upload=multer({storage:storage})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
});
app.post('/submit',upload.single('document'),(req,res)=>{
    const file=req.file;
    if(!file){
        res.status(400).send('no file uploaded')
    }else{
        res.status(200).send('file uploaded')
    }
})

app.listen(3000,()=>console.log('server started'))