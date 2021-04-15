import slug from 'slug';

//sluggenerator function
export const slugGenerator = async (prismaH:any,slug:string,i:number=1)=>{
  try{
    const genre = await prismaH.findUnique({
      where:{
        slug:slug
      }
    })

    if(genre){
      const slugSections = slug.split('-');
      const newSlug:any = await slugGenerator(prismaH,slugSections[0]+'-'+i,i+1);
      return newSlug;
    }
    return slug;
  }catch{
    return slug;
  }
}


export const cleanSlug = (slugString:string) =>{
  return slug(slugString,'_');
}


export const getfilename = (filename:any)=>{
  if(filename){
    const cleanName = slug(filename,'-');
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : Date.now() + cleanName+'.'+ filename.substr(i);
  }
  return;
}