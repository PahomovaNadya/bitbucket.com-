import React, { Component } from 'react';
import './../App.css';

interface FilmDetailsComponentProps {
  film: Object;
  index: Number;
  editFilmStepTwo: Function;
  deleteFilmStepTwo: Function;
}

interface FilmDetailsComponentState {
  hideMessage: boolean
}
class FilmDetailsComponent extends Component<FilmDetailsComponentProps, FilmDetailsComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      hideMessage: false
    };
    this.editFilmStepOne = this.editFilmStepOne.bind(this);
    this.deleteFilmMessage = this.deleteFilmMessage.bind(this);
    this.deleteFilmStepOne = this.deleteFilmStepOne.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
  }
  editFilmStepOne() {
    this.props.editFilmStepTwo(this.props.film);
  }
  deleteFilmMessage() {
    this.setState({
      hideMessage: true
    });
  }
  cancelDelete() {
    this.setState({
      hideMessage: false
    });
  }
  deleteFilmStepOne() {
    this.setState({
      hideMessage: false
    });
    this.props.deleteFilmStepTwo(this.props.film);
  }
  render() {
    const hideMessageClass = this.state.hideMessage ? 'messaegeCls' : 'messaegeCls hide-page';
    return (
      <li key={this.props.index} >
        <div className="imgBlock">
          <input type="hidden" id="id" value={this.props.film.id} />
          { (this.props.film.poster !== "N/A") ? <img src={this.props.film.poster} alt="poster" /> : <img src='http://www.naddim.com/nadya/portfolio/images/notFound.jpg' alt="poster" /> }
        </div>
        <ol>
          <li><span className="title">{this.props.film.title}</span></li>
          <li><b>Year:</b>&nbsp;<span>{this.props.film.year}</span></li>
          <li><b>Runtime:</b>&nbsp;<span>{this.props.film.runtime}</span></li>
          <li><b>Genre:</b>&nbsp;<span>{this.props.film.genre}</span></li>
          <li><b>Director:</b>&nbsp;<span>{this.props.film.director}</span></li>
        </ol>
        <div className="buttonBlock">
          <input 
            type="button" 
            value="EDIT" 
            className="editCls"
            onClick={this.editFilmStepOne}
          />&nbsp;
          <input 
            type="button" 
            value="DELETE" 
            className="deleteCls"
            onClick={this.deleteFilmMessage}
          />
        </div> 
        <div className={hideMessageClass}>
          <h3>Are you sure you want<br />to delete the film?</h3>
          <input 
            type="button" 
            value="DELETE" 
            onClick={this.deleteFilmStepOne}
          />
          <input 
            type="button" 
            value="CANCEL" 
            onClick={this.cancelDelete}
          />
        </div>
      </li>
    );
  }
}

export default FilmDetailsComponent;
