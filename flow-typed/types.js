// @flow
declare var module: {
  hot: {
    accept(path: string, callback: () => void): void,
  },
};

export type Show = {
  title: string,
  description: string,
  year: number,
  poster: string,
  trailer: string,
  imdbID: string,
};
