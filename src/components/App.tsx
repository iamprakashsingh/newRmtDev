import { useEffect } from "react";
import { useActiveIdStore } from "../stores/activeIdStore";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

export default function App(){

  const setActiveId = useActiveIdStore(state => state.setActiveId);
  
  // here we are trying to get the job id from the url 
  // window.location is an event if we won't hook into 
  // that we won't be able to see the new id everytime 
  // we will click on different jobs so we hook into
  // these external events using useEffect hook


   useEffect(() => {
    const handleHashChange = () => {
      // url is always in the form of string and setActiveId
      // is a hook which take number so for converting it to
      // number we will add a unary operator + before the window.location
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashChange();

    //mounting
    window.addEventListener("hashchange", handleHashChange);

    // unmounting
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []); //we wanted to execute this only when the component mounted

  return <>
  <Background/>
  <Header/> 
  <Container/>
  <Footer/> 
  <Toaster position= "top-right"/>
  </>

}