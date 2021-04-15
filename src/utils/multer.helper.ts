import multer from 'multer';


const storageSettings = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./public/uploads')
  },
  filename:(req,file,cb)=>{
    cb(null, Date.now() +'-'+file.originalname)
  }
});

interface fieldName{
  name:string
}

export const getMulterInstance = (destinationDirectory:String,fieldName:Array<fieldName>) =>{
  const storageSettings = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'./public/uploads' + destinationDirectory)
    },
    filename:(req,file,cb)=>{
      cb(null, Date.now() +'-'+ file.originalname)
    }
  });
  const upload = multer({storage:storageSettings}).fields(fieldName);
  return upload;
}


export const upload = multer({storage:storageSettings})