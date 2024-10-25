import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  console.log("Hello World!");
  return (
    <div className="text-center mt-5">
      <h1>Hello World!</h1>
    </div>
  );
};



