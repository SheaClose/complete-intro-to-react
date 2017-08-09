// @flow

import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Spinner from './Spinner';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: { rating: '' },
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:3000/${this.props.show.imdbID}`)
      .then((res: { data: { rating: string } }) => {
        this.setState({ apiData: res.data });
      });
  }

  props: {
    show: Show,
  };
  render() {
    const { title, description, year, poster, trailer } = this.props.show;
    let ratingData;
    if (this.state.apiData.rating) {
      ratingData = <h3>{this.state.apiData.rating}</h3>;
    } else {
      ratingData = <Spinner />;
    }
    return (
      <div className="details">
        <Header />
        <section>
          <h1>{title}</h1>
          <h2>{year}</h2>
          <span>{ratingData}</span>
          <img src={`/public/img/posters/${poster}`} alt={`Poster for ${title}`} />
          <p>{description}</p>
        </section>
        <div className="">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0&amp;showinfo`}
            frameBorder="0"
            allowFullScreen
            title={`Trailer for ${title}`}
          />
        </div>
      </div>
    );
  }
}
