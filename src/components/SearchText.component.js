import React, { Component } from 'react';
import './../App.css';

interface SearchTextProps {
  getSearchText: Function;
  AddNewFilmStepTwo: Function;
}

interface SearchTextState {
  txtSearch: string;
}

class SearchText extends Component<SearchTextProps, SearchTextState> {
  constructor() {
    super();
    this.state = {
      txtSearch: ''
    }
    this.changeInputText = this.changeInputText.bind(this);
    this.sendSearchText = this.sendSearchText.bind(this);
    this.AddNewFilmStepFirst = this.AddNewFilmStepFirst.bind(this);
  } 
  changeInputText() {
    this.setState({
      txtSearch: this.txtInputSearch.value
    });
  }
  sendSearchText() {
    this.props.getSearchText(this.txtInputSearch.value);
  }
  AddNewFilmStepFirst() {
    this.props.AddNewFilmStepTwo();
  }
  render() {
    return (
      <div className="searchBlock">
        <span>Enter the movie you are interested in: </span>&nbsp;
        <input 
          type="text" 
          autoComplete="off"
          value={this.state.txtSearch}
          placeholder="Text search" 
          ref={(input) => this.txtInputSearch = input}
          onChange={this.changeInputText}
        />&nbsp;
        <input 
          type="button" 
          value="search" 
          className="searchElem"
          onClick={this.sendSearchText}
        />&nbsp;
        <input 
          type="button" 
          className="addFilm"
          value="add new movie" 
          onClick={this.AddNewFilmStepFirst}
        />
      </div>
    );
  }
}

export default SearchText;