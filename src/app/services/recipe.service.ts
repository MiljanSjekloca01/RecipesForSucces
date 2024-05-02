import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, map, sample, throwError } from "rxjs";
import { Recipe } from "../shared/models/recipes.model";
import { sample_recipes } from "../data";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Comment } from "../shared/models/comment.model";

@Injectable({providedIn:"root"})
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>
    private recipes: Recipe[] = [];

    constructor(private http: HttpClient){}

    getRecipes(){
        return this.recipes.slice();
    }

    //For testing data
    storeRecipes(){
        sample_recipes.forEach(recipe => 
            this.http.post<{name : string}>("https://recipesforsucces-cdfa9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",recipe).subscribe())
    }
/*
    getRecipesFromDatabase(): Observable<Recipe[]>{
        return this.http.get<{ [key: string]: Recipe}>(environment.FIREBASE_RECIPES_URL)
        .pipe(
            map(responseData => {
                const recipesArray: Recipe[] = [];
                for(const key in responseData){
                    if(responseData.hasOwnProperty(key))
                        recipesArray.push({...responseData[key],id: key})
                }
                this.recipes = recipesArray; 
                return recipesArray
            }),
            catchError(errorRes => {
                console.log("Desilo se");
                return throwError( () => {
                    return new Error("Couldnt get recipes from database");
                });
            })
        )
    }
*/

getRecipesFromDatabase(): Observable<Recipe[]> {
    return this.http.get<{ [id: string]: Recipe }>(environment.FIREBASE_RECIPES_URL)
      .pipe(
        map(responseData => {
          const recipesArray: Recipe[] = [];
          for (const id in responseData) {
            if (responseData.hasOwnProperty(id)) {
              const recipe: Recipe = { ...responseData[id], id: id };
              if (recipe.comments) {
                recipe.comments = Object.entries(recipe.comments).map(([commentKey, comment]) => ({ ...comment, id: commentKey }));
              }
              recipesArray.push(recipe);
            }
          }
          this.recipes = recipesArray;
          return recipesArray;
        }),
        catchError(errorRes => {
          return throwError(() => {
            return new Error("Couldnt get recipes from database");
          });
        })
      );
  }

    createComment(id: string,rating: number,commentText:string){
        this.http.post<{commentId: string}>(`https://recipesforsucces-cdfa9-default-rtdb.europe-west1.firebasedatabase.app/recipes/${id}/comments.json`,
        { user: "Murat", text: commentText, rating: rating}).subscribe( responseData => { 
            const recipeIndex = this.recipes.findIndex(recipe => recipe.id === id);
            if (recipeIndex !== -1) {
                this.recipes[recipeIndex].comments.push({user: "Murat",text:commentText,rating: rating,id: responseData.commentId});
            }
        })
    }


    getRecipesByTag(tagLink: string){
        this.getRecipesFromDatabase().subscribe(
            data => {
                this.recipes = data
            }
        )
        return this.recipes.filter( recipe => {
            return recipe.tags.some( tag => tag.toLowerCase().includes(tagLink.toLowerCase()))
    })}

    getRecipesBySearch(search: string){
        this.getRecipesFromDatabase().subscribe( data => this.recipes = data )
        if(!search || search == ""){
            return this.recipes;
        }else{
            return this.recipes.filter( recipe => {
                return recipe.title.toLowerCase().includes( search.toLowerCase())
                || recipe.tags.some( tag => tag.toLowerCase().includes(search.toLowerCase()))
            })
        }
    }

    getRecipeById(id: string){
        return this.recipes.find( recipe => recipe.id === id)
    }
}
