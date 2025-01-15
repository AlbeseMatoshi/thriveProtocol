import {useContext, useEffect} from "react";
import {SearchContext} from "@/hooks/SearchContext.tsx";

export default function DashboardPage(){

    const {setIsVisible} = useContext(SearchContext);

    useEffect(() => {
        setIsVisible(false);
        return () => setIsVisible(true);
    }, []);


  return(
      <>
        <div className={'flex'}>
          <img src="/public/thriveprotocol_logo.jpeg" width={200} alt=""/>
        </div>
      </>
  )
}