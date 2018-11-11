import React, { Component } from 'react';
import FilmDetailsComponent from './filmDetails.component';
import './../App.css';

interface FilmComponentProps {
  editFilmStepThree: Function;
  deleteFilmStepThree: Function;
}

class FilmComponent extends Component<FilmComponentProps> {
  constructor(props) {
    super(props);
    this.editFilmStepTwo = this.editFilmStepTwo.bind(this);
    this.deleteFilmStepTwo = this.deleteFilmStepTwo.bind(this);
  }
  editFilmStepTwo(obj: object) {
    this.props.editFilmStepThree(obj);
  }
  deleteFilmStepTwo(obj: object) {
    this.props.deleteFilmStepThree(obj);
  }
  render() {
    return (
      <div>
        <ul className="filmStock">
        { this.props.filmStock.map((filmList: object, index: number) =>
          <FilmDetailsComponent 
            film = {filmList}
            index = {index}
            editFilmStepTwo = {this.editFilmStepTwo}
            deleteFilmStepTwo = {this.deleteFilmStepTwo}
          />
        )}
        </ul>
      </div>
    );
  }
}

export default FilmComponent;