import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ObjectiveList from './objectiveList/objectiveList'
import reportWebVitals from './reportWebVitals';
import { createRoot } from "react-dom/client";
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import {
  Route,
} from "react-router-dom";

import NewObjective from './newObjectives/newObjectives';
import EditObjective from './editObjective/editObjective';
import DeleteObjective from './deleteObjective/deleteObjective';
import DetailObjective from './detailObjective/detailObjective';
import ObjectiveStadistics from './objectiveStadistics/objectiveStadistics';



createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<ObjectiveList/>}></Route>
      <Route path="/new-objective" element={<NewObjective/>}></Route>
      <Route path="/edit-objective/:id" element={<EditObjective/>}></Route>
      <Route path="/delete-objective/:id" element={<DeleteObjective/>}></Route>
      <Route path="/show-objective/:id" element={<DetailObjective/>}></Route>
      <Route path="/show-estadistics" element={<ObjectiveStadistics/>}></Route>

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
