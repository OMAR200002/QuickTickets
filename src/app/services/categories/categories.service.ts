import { Injectable } from '@angular/core';
import {collection, Firestore, getDocs, query} from "@angular/fire/firestore";
import {Category} from "../../models/category";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categories: Category[] = [];
  public subject:Subject<Category[]>=new Subject<Category[]>();
  constructor(private db: Firestore) { }

  getAllCategories(){
    this.readAllCategories();
    return this.categories;
  }
  async readAllCategories() {
    const q = query(collection(this.db, "genres"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const cat = doc.data();
      this.categories.push(new Category(doc.id,cat["name"]));
    });
    this.subject.next(this.categories)
  }
}
