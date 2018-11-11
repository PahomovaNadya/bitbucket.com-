import React, { Component } from 'react';
import Guid from 'guid';

import './modalPopup.component.css';

interface ModalPopupComponentProps {
  hide: String;
  closePopUp: Function;
  selectElement: Object;
  saveEditOrNewFilm: Function;
  arrayAllTitle: Array;
}
interface ModalPopupComponentState {
  selectElement: Object;
  title: String;
  year: String;
  runtime: String;
  genre: String;
  director: String;
  flagTitle: Boolean;
  flagYear: Boolean;
  flagRuntime: Boolean;
  flagGenre: Boolean;
  flagDirector: Boolean;
}
let titleWindow = "";
class ModalPopupComponent extends Component<ModalPopupComponentProps, ModalPopupComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      selectElement: this.props.selectElement,
      title: this.props.selectElement["title"],
      year: this.props.selectElement["year"],
      runtime: this.props.selectElement["runtime"],
      genre: this.props.selectElement["genre"],
      director: this.props.selectElement["director"],
      flagTitle: false,
      flagYear: false,
      flagRuntime: false,
      flagGenre: false,
      flagDirector: false
    };

    this.closeWindow = this.closeWindow.bind(this);
    this.saveFilm = this.saveFilm.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.editFilm = this.editFilm.bind(this);
    this.addNewFilmThree = this.addNewFilmThree.bind(this);
    this.validEmpty = this.validEmpty.bind(this);
    this.validTitle = this.validTitle.bind(this);
    this.validYear = this.validYear.bind(this);
    this.validRuntime = this.validRuntime.bind(this);
    this.validGenre = this.validGenre.bind(this);
    this.validDirector = this.validDirector.bind(this);
  }
  
  closeWindow() {
    this.props.closePopUp(true);
  }
  addNewFilmThree(){
    titleWindow = "Add New Film";
    this.setState({
      title: "",
      year: "",
      runtime: "",
      genre: "",
      director: ""
    });
  }
  saveFilm() {
    let flgTitle = true;
    let flgYear = true;
    let flgRuntime = true;
    let flgGenre = true;
    let flgDirector = true;

    let filmNewSelect;
    if(this.validEmpty(this.txtInputTitle.value) && this.validEmpty(this.txtInputYear.value) && this.validEmpty(this.txtInputRuntime.value) && this.validEmpty(this.txtInputGenre.value) && this.validEmpty(this.txtInputDirector.value)) {
      if(titleWindow === "Add New Film"){ 
        filmNewSelect = {
          id: Guid.raw(),
          poster: "http://www.naddim.com/nadya/portfolio/images/notFound.jpg",
          title: this.txtInputTitle.value,
          year: this.txtInputYear.value,
          runtime: this.txtInputRuntime.value,
          genre: this.txtInputGenre.value,
          director: this.txtInputDirector.value
        }
        this.props.saveEditOrNewFilm(filmNewSelect, "add");
      } else if(titleWindow === "Edit Film"){
        filmNewSelect = {
          id: this.props.selectElement["id"],
          poster: this.props.selectElement["poster"],
          title: this.txtInputTitle.value,
          year: this.txtInputYear.value,
          runtime: this.txtInputRuntime.value,
          genre: this.txtInputGenre.value,
          director: this.txtInputDirector.value
        }
        this.props.saveEditOrNewFilm(filmNewSelect, "edit");
      }
    } else {
      if(this.validEmpty(this.txtInputTitle.value)) {
        flgTitle = false;
      } 
      if(this.validEmpty(this.txtInputYear.value)) {
        flgYear = false;
      } 
      if(this.validEmpty(this.txtInputRuntime.value)) {
        flgRuntime = false;
      } 
      if(this.validEmpty(this.txtInputGenre.value)) { 
        flgGenre = false;
      } 
      if(this.validEmpty(this.txtInputDirector.value)) {
        flgDirector = false;
      }
      this.setState({
        flagTitle: flgTitle,
        flagYear: flgYear,
        flagRuntime: flgRuntime,
        flagGenre: flgGenre,
        flagDirector: flgDirector
      });
    }
  }
  changeInput(){
    this.setState({
      title: this.txtInputTitle.value,
      year: this.txtInputYear.value,
      runtime: this.txtInputRuntime.value,
      genre: this.txtInputGenre.value,
      director: this.txtInputDirector.value
    });
  }
  editFilm(selectElement: object) {
    titleWindow = "Edit Film";
    this.setState({
      selectElement: selectElement,
      title: selectElement["title"],
      year: selectElement["year"],
      runtime: selectElement["runtime"],
      genre: selectElement["genre"],
      director: selectElement["director"]
    });
  }
  validEmpty(val: string) {
    let checkFlag = true;
    if(val.trim().length === 0) {
      checkFlag = false;
    }
    return checkFlag;
  }
  validTitle(event: any) {
    let arrLit = "abcdefghijklmnopqrstuvwxyz ";
    let flgTitle = false;
    if(this.validEmpty(event.target.value)){
      for(var i=0; i<=event.target.value.length; i++) {
        let litSml =event.target.value.charAt(i).toLowerCase();
        if(arrLit.indexOf(litSml) === -1) {
          flgTitle = true;
        }
      }
    } else {
      flgTitle = true;
    }
    if(this.props.selectElement["title"] !== event.target.value) {
      for(var j=0; j<this.props.arrayAllTitle.length; j++){
        if(this.props.arrayAllTitle[j].trim()===event.target.value.trim()) {
          flgTitle = true;
          this.txtInputTitle = this.props.selectElement["title"];
        }
      }
    }
    this.setState({
      flagTitle: flgTitle
    });
  }
  validYear(event: any) {
    let flgYear = false;
    if(this.validEmpty(event.target.value)){
      if(event.target.value.length !== 4 || isNaN(event.target.value)) {
        flgYear = true;
      }
    } else {
      flgYear = true;
    } 
    this.setState({
      flagYear: flgYear
    });
  }
  validRuntime(event: any) {
    let flgRuntime = false;
    if(!this.validEmpty(event.target.value)){
      flgRuntime = true;
    } 
    this.setState({
      flagRuntime: flgRuntime
    });
  }
  validGenre(event: any) {
    let flgGenre = false;
    if(!this.validEmpty(event.target.value)){
      flgGenre = true;
    } 
    this.setState({
      flagGenre: flgGenre
    });
  }
  validDirector(event: any) {
    let flgDirector = false;
    if(!this.validEmpty(event.target.value)){
      flgDirector = true;
    } 
    this.setState({
      flagDirector: flgDirector
    });
  }
  render() {
    const hideFlagTitleClass = this.state.flagTitle ? 'errorCl' : 'errorCl hide-page';
    const hideFlagYearClass = this.state.flagYear ? 'errorCl' : 'errorCl hide-page';
    const hideFlagRuntimeClass = this.state.flagRuntime ? 'errorCl' : 'errorCl hide-page';
    const hideFlagGenreClass = this.state.flagGenre ? 'errorCl' : 'errorCl hide-page';
    const hideFlagDirectorClass = this.state.flagDirector ? 'errorCl' : 'errorCl hide-page';

    return (
      <div className={'overlay valigned-middle ' + this.props.hide}>
        <div className="popup valigned-middle">
          <div className="titleWindow">{titleWindow}</div><br />
          <div>
            <span>Title:</span>&nbsp;
            <input type="text" 
              value={this.state.title} 
              onChange={this.changeInput} 
              onBlur={this.validTitle}
              ref={(input) => this.txtInputTitle = input} 
            />
            <span className={hideFlagTitleClass}>The field must not be empty and only english letters.<br />Or such a title exists.</span>
          </div><br />
          <div>
            <span>Year:</span>&nbsp;
            <input 
              type="text" 
              value={this.state.year} 
              onChange={this.changeInput} 
              onBlur={this.validYear}
              ref={(input) => this.txtInputYear = input} 
            />
            <span className={hideFlagYearClass}>The field must not be empty</span>
          </div><br />
          <div>
            <span>Runtime:</span>&nbsp;
            <input 
              type="text" 
              value={this.state.runtime} 
              onChange={this.changeInput} 
              onBlur={this.validRuntime}
              ref={(input) => this.txtInputRuntime = input} 
            />
            <span className={hideFlagRuntimeClass}>The field must not be empty</span>
          </div><br />
          <div>
            <span>Genre:</span>&nbsp;
            <input 
              type="text" 
              value={this.state.genre} 
              onChange={this.changeInput}
              onBlur={this.validGenre} 
              ref={(input) => this.txtInputGenre = input} 
            />
            <span className={hideFlagGenreClass}>The field must not be empty</span>
          </div><br />
          <div>
            <span>Director</span>&nbsp;
            <input 
              type="text" 
              value={this.state.director} 
              onChange={this.changeInput} 
              onBlur={this.validDirector}
              ref={(input) => this.txtInputDirector = input} 
            />
            <span className={hideFlagDirectorClass}>The field must not be empty</span>
          </div><br />
          <button className="OKclass" onClick={this.saveFilm}>OK</button>
          <button className="Cancelclass" onClick={this.closeWindow}>Cancel</button>
        </div>
      </div>
    );
  }
}
export default ModalPopupComponent;