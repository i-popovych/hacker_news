import {Header} from "./NewsBlock/Header.jsx";
import Footer from "./Footer.jsx";

export const WrapperLayout = ({children}) => {
  return (
    <div className="wrapper">
      <Header/>
      {children}
      <Footer/>
    </div>
  )
}