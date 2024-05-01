import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "../../../shared/models/recipes.model";
import { Observable } from "rxjs";
import { RecipeService } from "../../../services/recipe.service";


@Injectable({providedIn:"root"})
export class RecipesDataResolver implements Resolve<Recipe[]>{

    constructor(private recipeService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Recipe[]{
        const recipes = this.recipeService.getRecipes();

        if(recipes.length === 0){
            return this.recipeService.getRecipesFromDatabase();
        }else{
            return recipes;
        }
    }

}