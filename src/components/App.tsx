import { useEffect } from "react";
import { useActiveIdStore } from "../stores/activeIdStore";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

export default function App(){

  const setActiveId = useActiveIdStore(state => state.setActiveId);

   useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return <>
  <Background/>
  <Header/> 
  <Container/>
  <Footer/> 
  <Toaster position= "top-right" />
  </>

}