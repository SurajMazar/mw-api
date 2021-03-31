import multer from 'multer';

const fileStorage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads')
  },
  filename:(req,file,cb)=>{
    cb(null,file.filename+'-'+file.originalname)
  }
})

const multerInstance = multer({storage:fileStorage}).single('image');

export default multerInstance;