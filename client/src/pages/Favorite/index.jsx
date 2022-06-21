import React from "react";
import PageHeader from "../../components/PageHeader";
import { FavoriteList } from "../../components/FavoriteList";

 const Favorite = () => {
  return (
      <>
      < PageHeader>
            Favorite list
        </PageHeader>
        <FavoriteList/>
      </>
    
  );
};


export default Favorite;