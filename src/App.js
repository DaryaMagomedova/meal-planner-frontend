import logo from './logo.svg';
import './App.css';
import { MyMeals } from './MyMeals';
import { useEffect, useState } from 'react';
import { getAllMeals,addMeal, editMeal } from './FetchMeals';
import { deleteModel } from 'mongoose';
import { deleteMeal } from '../../backend/MealController';


function App() {
  const [myMeal,setMeal] = useState([])
  const [title,setTitle]= useState("")
  const[editing,setEditing] = useState(false);
  const[mealId,setMealId]= useState("")
  useEffect(() =>{
    getAllMeals(setMeal)
  },[])
  const updatingInInput = (_id,title) =>{
    setEditing(true)
    setTitle(title)
    setMealId(_id)
  }
  return (
     <div>
      <h1> Meal Plan</h1>
      <input
      type ="text"
      placeholder = "Add a meal"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />
      <button onClick ={editing ? () => editMeal(mealId,title,setMeal,setTitle,setEditing):() => addMeal(title,setTitle,setMeal)}>
        {editing ? "Edit" : "Add"}

      </button>
      {myMeal.map((meal)=> <MyMeals text ={meal.title} key = {meal._id} updatingInInput ={() => updatingInInput(meal._id,meal.title)} deleteMeal = {() => deleteMeal(meal._id,setMeal)}/>
    )}
     </div>
  );
}
export default App;
