import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, map, sample, throwError } from "rxjs";
import { Recipe } from "../shared/models/recipes.model";
import { sample_recipes } from "../data";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Review } from "../shared/models/review.model";

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

    // Resolver
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


    createReview(id: string, rating: number,commentText: string,userId: string,userName: string){
        const reviewData: Review = { user_id: userId, by: userName}
        console.log(reviewData);
        if(rating) reviewData.rating = rating;
        if(commentText) reviewData.commentText = commentText;

        if(rating || commentText){
            this.http.post<{reviewId: string}>(`https://recipesforsucces-cdfa9-default-rtdb.europe-west1.firebasedatabase.app/recipes/${id}/reviews.json`,
            reviewData).subscribe( responseData => {
                console.log(responseData);
                const recipeIndex = this.recipes.findIndex(recipe => recipe.id === id);
                if( recipeIndex !== -1){
                    reviewData.id = responseData.reviewId
                    this.recipes[recipeIndex].reviews.push(reviewData)
                    if(reviewData.rating) this.recipes[recipeIndex].ratings.push(reviewData.rating)
                    
                }
            })
        }
    }

}
