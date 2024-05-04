import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, map, sample, throwError } from "rxjs";
import { Recipe } from "../shared/models/recipes.model";
import { sample_recipes } from "../data";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

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


    getRecipesFromDatabase(): Observable<Recipe[]> {
        return this.http.get<{ [id: string]: Recipe }>(environment.FIREBASE_RECIPES_URL)
        .pipe(
            map(responseData => {
            const recipesArray: Recipe[] = [];
            for (const id in responseData) {
                if (responseData.hasOwnProperty(id)) {
                const recipe: Recipe = { ...responseData[id], id: id };
                recipe.ratings = [];
                if (recipe.reviews) {
                    recipe.reviews = Object.entries(recipe.reviews).map(([reviewsId,review]) => {
                        if(review.rating) recipe.ratings.push(review.rating);
                        
                        return {...review,id: reviewsId}
                    })
                }else{ recipe.reviews = []; }
            
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
   
    // Recipes component part
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


    // Recipes Details Part - Review

    createReviewWithCommentAndRating(id: string,rating: number,commentText:string){
        this.http.post<{reviewId: string}>(`https://recipesforsucces-cdfa9-default-rtdb.europe-west1.firebasedatabase.app/recipes/${id}/reviews.json`,
        { user_id: "Murat", commentText: commentText, rating: rating}).subscribe( responseData => { 
            const recipeIndex = this.recipes.findIndex(recipe => recipe.id === id);
            if (recipeIndex !== -1) {
                this.recipes[recipeIndex].reviews.push({user_id: "Murat",commentText:commentText,rating: rating,id: responseData.reviewId});
            }
        })
    }

    createReviewWithRating(id:string,rating: number){
        this.http.post<{reviewId: string}>(`https://recipesforsucces-cdfa9-default-rtdb.europe-west1.firebasedatabase.app/recipes/${id}/reviews.json`,
        { user_id: "Murat", rating: rating}).subscribe( responseData => { 
            const recipeIndex = this.recipes.findIndex(recipe => recipe.id === id);
            if (recipeIndex !== -1) {
                this.recipes[recipeIndex].reviews.push({user_id: "Murat",rating: rating,id: responseData.reviewId});
            }
        })
    }

    createReviewWithComment(id:string,commentText: string){
        this.http.post<{reviewId: string}>(`https://recipesforsucces-cdfa9-default-rtdb.europe-west1.firebasedatabase.app/recipes/${id}/reviews.json`,
        { user_id: "Murat", commentText: commentText}).subscribe( responseData => { 
            const recipeIndex = this.recipes.findIndex(recipe => recipe.id === id);
            if (recipeIndex !== -1) {
                this.recipes[recipeIndex].reviews.push({user_id: "Murat",commentText: commentText,id: responseData.reviewId});
            }
        })
    }

}
