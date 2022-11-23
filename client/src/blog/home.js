import React from 'react';
import './styles.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Todo from './todo'
import Blog from './blog'
import AppNavigator from './appNavigator'

const Home = ()=>{
    return (
    
       <BrowserRouter >
          <Switch>
           <Route exact path = "/" component = {AppNavigator}></Route>
           <Route exact path = '/todo' component = {Todo}></Route>
           <Route exact path = '/blogpage' component = {Blog}></Route>
           <Route component = {AppNavigator}></Route>
          </Switch>
        </BrowserRouter>
   
    )
}
export default Home
