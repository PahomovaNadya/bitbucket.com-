import React, { Component } from 'react';
import Guid from 'guid';
import Header from './components/Header';
import SearchText from './components/SearchText.component';
import FilmComponent from './components/film.component';
import ModalPopupComponent from './components/modalPopup.component';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      hidePopUpPage: false,
      items: [],
      filmArray: [],
      selectElement: {},
      arrayAllTitle:[],
      hideStock: false,
      titleWindow: ""
    };
    this.initData();
    this.handleSearchText = this.handleSearchText.bind(this);
    this.creatingArrayFilms = this.creatingArrayFilms.bind(this);
    this.AddNewFilmStepTwo = this.AddNewFilmStepTwo.bind(this);
    this.hidePopUp = this.hidePopUp.bind(this);
    this.saveNewEditFilm = this.saveNewEditFilm.bind(this);
    this.editFilmStepThree = this.editFilmStepThree.bind(this);
    this.deleteFilmStepThree = this.deleteFilmStepThree.bind(this);
    this.validationData = this.validationData.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
  }
  initData() {
    this.handleSearchText("beethoven");
  }
  handleSearchText(searchTextx: string){
    fetch("http://www.omdbapi.com/?s="+searchTextx+"&apikey=e6a355bf")
      .then(res => res.json())
      .then(
        (result) => {
          if(result.Search) {
            this.setState({
              isLoaded: true,
              items: result.Search
            });
            this.creatingArrayFilms();
          } else {
            this.setState({
              hideStock: true
            });  
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  creatingArrayFilms() {
    let filmArrayTemporary = [];
    let arrayAllTitleTemp =[];
    if(this.state.items !== "")  {
      this.state.items.forEach((item: string, index: number) => {
        fetch("http://www.omdbapi.com/?i="+item.imdbID+"&apikey=e6a355bf")
        .then(res => res.json())
        .then(
          (result) => {
            let filmArrayAuxiliry = {
              id: Guid.raw(),
              poster: result.Poster,
              title: this.validationData(result.Title),
              year: result.Year,
              runtime: result.Runtime,
              genre: result.Genre,
              director: result.Director
            }
            filmArrayTemporary.push(filmArrayAuxiliry);
            arrayAllTitleTemp.push( this.validationData(result.Title));
            if(filmArrayTemporary.length === this.state.items.length){
              this.setState({
                filmArray: filmArrayTemporary,
                arrayAllTitle: arrayAllTitleTemp
              });
            }
          },
          (error) => {
            console.log(error);
          }
        )
      });
    }
  }
  AddNewFilmStepTwo() {
    this.setState({
      hidePopUpPage: true
    });
    this.refs.child.addNewFilmThree();
  }
  hidePopUp(hidePopUp) {
    if (hidePopUp) {
      this.setState({
        hidePopUpPage: false
      });
    }
  }
  saveNewEditFilm(obj: object, txt: string) {
    let filmArrayTemporary;
    filmArrayTemporary = this.state.filmArray;
    if(txt === "add") {
      if(filmArrayTemporary.length === 0) {
        filmArrayTemporary.push(obj);
      } else  if(filmArrayTemporary.length > 0) {  
        filmArrayTemporary.push(obj);
      } 
    } else if(txt === "edit") {  
      filmArrayTemporary.map((film: object, index: number) => {
        if(film.id === obj.id) {
          filmArrayTemporary.splice(index, index, obj);
          return;
        }
      });
    }
    this.setState({
      filmArray: filmArrayTemporary,
      hidePopUpPage: false
    });
  }
  editFilmStepThree(obj: object) {
    this.setState({
      selectElement: obj,
      hidePopUpPage: true
    });
    this.refs.child.editFilm(obj);
  }
  deleteFilmStepThree(obj: object) {
    let filmArrayTemporary = this.state.filmArray;
    filmArrayTemporary.map((film: object, index: number) => {
      if(film.id === obj.id) {
        filmArrayTemporary.splice(index, index);
        this.setState({
          filmArray: filmArrayTemporary
        });
        return;
      }
    });
  }
  validationData(elem: string) {
    let arrLit = "abcdefghijklmnopqrstuvwxyz ";
    let elemNew = "";
    for(var i=0; i<=elem.length; i++) {
      let litSml = elem.charAt(i).toLowerCase();
      if(arrLit.indexOf(litSml) !== -1) {
        elemNew += elem.charAt(i);
      }
    }
    return elemNew;
  }
  closeWindow() {
    this.setState({
      hideStock: false
    }); 
  }
  render() {
    const hidePopUpPageClass = this.state.hidePopUpPage ? '' : 'hide-page';
    const hideStockClass = this.state.hideStock ? 'emptyStock' : 'emptyStock hide-page';
    return (
      <div className="App">
        <Header /><br />
        <SearchText 
          getSearchText={this.handleSearchText} 
          AddNewFilmStepTwo={this.AddNewFilmStepTwo} 
        />
        <FilmComponent 
          filmStock = {this.state.filmArray}
          editFilmStepThree = {this.editFilmStepThree}
          deleteFilmStepThree = {this.deleteFilmStepThree}
        />
        <ModalPopupComponent
          hide={hidePopUpPageClass}
          closePopUp={this.hidePopUp}
          selectElement = {this.state.selectElement}
          saveEditOrNewFilm={this.saveNewEditFilm}
          arrayAllTitle={this.state.arrayAllTitle}
          ref="child"
        />
        <div className={hideStockClass}>
            <button className="Xclass" onClick={this.closeWindow}>X</button>
            <span>Your search did not match anything.</span>
        </div>
      </div>
    );
  }
}

export default App;