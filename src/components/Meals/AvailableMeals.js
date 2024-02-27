import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem';
import { useEffect, useState } from 'react';


const AvailableMeals=()=>{
  const[mealArr,setMealsArr]=useState([]);
  const[loading, setLoading]=useState(true);
  const[error, setError]=useState();
  useEffect(()=>{
    const fetchMeals=async()=>{
      const response= await fetch('https://food-app-database-d644d-default-rtdb.firebaseio.com/meals.json');

      if(!response.ok){
        throw new Error('Somethinng Went Wrong :(')
      }
      const responseData = await response.json();

      const loadedMeals=[];
      for(const key in responseData){
        loadedMeals.push(
          {
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,

        });
      }
      setMealsArr(loadedMeals);
      setLoading(false);
    };

    fetchMeals().catch((error)=>{
      setLoading(false);
      setError(error.message);
    });

  },[]);

  if(loading){
    return (<section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>);
  }
  if(error){
    return(<section className={classes.MealsError}>
      <p>{error}</p>
    </section>);
  }
    const mealsList= mealArr.map((meal) =>(
        <MealItem 
        id={meal.id}
        key={meal.id} 
        name={meal.name} 
        description={meal.description}
        price={meal.price}
        />
        ));
    return <section className={classes.meals}>
        <ul>
            <Card>
            {mealsList}
            </Card>
        </ul>
    </section>

}
export default AvailableMeals;