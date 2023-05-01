import { Injectable } from '@angular/core';
import {collection, doc, Firestore, getDoc, getDocs, query} from "@angular/fire/firestore";
import {Movie} from "../../models/movie";
import {Category} from "../../models/category";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private movies: Movie[] = [];
  public subject = new Subject<Movie>();
  public Moviessubject = new Subject<Movie[]>();
  private movie !: Movie
  private popularMovies: Movie[] = [];
  constructor(private db: Firestore) { }

  getMoviesByCategory(categoryName: string){
    this.readMoviesByCategory(categoryName);
    return this.movies;
  }

  async readMoviesByCategory(categoryName: string) {
    this.movies=[];
    const q = query(collection(this.db, categoryName + "_movies"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

      // doc.data() is never undefined for query doc snapshots
      const movie = doc.data();
      this.movies.push(new Movie(movie["id"],movie["title"],movie["poster_path"],movie["originLanguage"],movie["overview"],movie["voteAverage"],categoryName))
    });
    this.Moviessubject.next(this.movies)
  }

  getPopularMovies(){
    this.readPopularMovies();
    return this.popularMovies;
  }
  getMovieById(movieCategorie: string, id: string){
    this.readMovieById(movieCategorie, id);
    return this.movie;
  }

async readMovieById(movieCategorie: string, id: string) {
  const docRef = doc(this.db, movieCategorie + '_movies', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const movie=docSnap.data();
   this.movie=new Movie(movie["id"],movie["title"],movie["poster_path"],movie["original_language"],movie["overview"],movie["vote_average"],movieCategorie);

   this.subject.next(this.movie)
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No suchDocument!");
  }
}
  async readPopularMovies() {
    this.popularMovies=[]
    const q = query(collection(this.db,  "Popular_movies"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const movie = doc.data();
      this.popularMovies.push(new Movie(movie["id"],movie["title"],movie["poster_path"],movie["originLanguage"],movie["overview"],movie["voteAverage"],"Popular"))
    });
  }
}
