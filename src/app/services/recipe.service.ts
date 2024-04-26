import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../shared/models/recipes.model";
import { sample_recipes } from "../data";


@Injectable({providedIn:"root"})
export class RecipeService {
    private recipesChanged = new Subject<Recipe[]>

    private recipes: Recipe[] = sample_recipes;


    getRecipes(){
        return this.recipes.slice();
    }


    getRecipesByTag(tagLink: string){
        return this.recipes.filter( recipe => {
            return recipe.tags.some( tag => tag.toLowerCase().includes(tagLink.toLowerCase()))
    })}

    getRecipesBySearch(search: string){
        return this.recipes.filter( recipe => {
            return recipe.title.toLowerCase().includes( search.toLowerCase())
            || recipe.tags.some( tag => tag.toLowerCase().includes(search.toLowerCase()))
        })
    }
}