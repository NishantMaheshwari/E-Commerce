// import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useReducer } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { UsernameContext } from "@/context/UsernameContext";
import { SearchContext,SortContext } from "@/context/ModifyProductsContext";
import { themeReducer } from "@/reducers/themeReducer";
import { usernameReducer } from "@/reducers/usernameReducer";
import { searchReducer,sortReducer } from "@/reducers/modifyProductsReducer";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {

  const router = useRouter();

  const [theme,themeDispatch] = useReducer(themeReducer,{darkMode:false});
  const [username, usernameDispatch] = useReducer(
    usernameReducer,
    typeof window !== 'undefined' ? localStorage.getItem('userName') || null : null
  );
  const [searchQuery,searchDispatch] = useReducer(searchReducer,'');
  const [sortQuery,sortDispatch] = useReducer(sortReducer,'none');

  const isHomePage = router.pathname === '/';

  // console.log(username);

  return (
  <div>
    <Toaster/>
    <ThemeContext.Provider value={{theme,themeDispatch}}>
      <UsernameContext.Provider value={{username,usernameDispatch}}>
        {isHomePage ? (
          <SearchContext.Provider value={{searchQuery,searchDispatch}}>
            <SortContext.Provider value={{sortQuery,sortDispatch}}>
              <Navbar/>
              <Component {...pageProps} />
            </SortContext.Provider>
          </SearchContext.Provider>
          ) : (
            
            <Component {...pageProps} />
          )
        }
      </UsernameContext.Provider>
    </ThemeContext.Provider>
  </div>  
  );
}
