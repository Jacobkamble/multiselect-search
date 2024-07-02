import React from 'react';

interface ChipProps{
  image:string
  text:string
  handleClose:()=>void
}

const Chip :React.FC<ChipProps>= ({image,text,handleClose}) => {
  return (
    <>
    <div onClick={handleClose} style={{display:"flex",alignItems:"center",border:"1px solid black",borderRadius:"7px",margin:"0 3px"}}><img width={"20px"} src={image} alt={text}/> {text.slice(0,10)} <span style={{fontSize:"10px"}}>❌</span></div>  
    </>
  )
}

export default Chip
