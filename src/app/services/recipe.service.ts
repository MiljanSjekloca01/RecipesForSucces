import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, map, throwError } from "rxjs";
import { Recipe } from "../shared/models/recipes.model";
import { sample_recipes } from "../data";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment"

@Injectable({providedIn:"root"})
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>
    private recipes: Recipe[] = [];

    constructor(private http: HttpClient){}

    getRecipes(){
        return this.recipes.slice();
    }

    // not used yet
    createRecipe(recipe: Recipe){
        this.http.post<Recipe[]>("https://recipesforsucces-cdfa9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",recipe).subscribe( responseData => {
            console.log(responseData);
        })
    }

    getRecipesFromDatabase(): Observable<Recipe[]>{
        return this.http.get<{ [key: string]: Recipe}>(environment.FIREBASE_RECIPES_URL)
        .pipe(
            map(responseData => {
                const recipesArray: Recipe[] = [];
                for(const key in responseData){
                    if(responseData.hasOwnProperty(key))
                        recipesArray.push({...responseData[key]})
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


    getRecipesByTag(tagLink: string){
        console.log("IM IN ")
        this.getRecipesFromDatabase().subscribe(
            data => {
                console.log("IM IN DATA");
                this.recipes = data
                console.log(this.recipes);
            }
        )
        console.log(this.recipes);
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