import { useState,useEffect } from "react";
import UpdateItem from "./components/UpdateItem";
import axios from "axios";


// use the following link to get the data
// /doors will give you all the doors, to get a specific door use /doors/1.
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

// const API_URI_Specific = http://${import.meta.env.VITE_API_URI}/doors${id};

function App() {
  // Get the existing item from the server
  // const [item, setItem] = useState(null);
  // pass the item to UpdateItem as a prop

 const [item,setItem] = useState([]);

 useEffect(()=>{
  const fecthData = async()=>{
      try{    
          const response = await axios.get(API_URI)
          setItem(response.data)
          console.log(response.data)
      }catch(error){
          console.error(error.message)
      }
  }
  fecthData()
},[])




  return <UpdateItem item={item}/>;
}

export default App;