import { Component, OnInit, numberAttribute } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../shared/models/recipes.model';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{

  recipe: Recipe;
  clickedStarIndex: number;
  ratingText: string;
  comment: string = "";
  userHaveRated: boolean;
  currentUserId="UserForPractice";

  constructor(activedRoute: ActivatedRoute,private recipeService: RecipeService){
    activedRoute.params.subscribe( param => {
      if(param.id){
        this.recipe = this.recipeService.getRecipeById(param.id);
      }
    })
  }

  ngOnInit(){
    console.log(this.recipe)
    this.userHaveRated = this.findIfUserHaveRatedRecipe();
  }

  onSubmit(rating: number,comment: string){
    if(rating && comment){
      this.recipeService.createReviewWithCommentAndRating(this.recipe.id,rating,comment);
      this.userHaveRated = true;
    }else if(rating && !comment){
      this.recipeService.createReviewWithRating(this.recipe.id,rating);
      this.userHaveRated = true;
    }else{
      this.recipeService.createReviewWithComment(this.recipe.id,comment);
    }
    
    this.clickedStarIndex = 0;
    this.comment = "";

  }
  
  onStarClicked(star:number){
    this.clickedStarIndex = star;
   const ratingTexts = {
    1: "Bad recipe !",
    2: "Didn't like it",
    3: "It was good",
    4: "Great recipe",
    5: "Loved it !"
  };
  this.ratingText = ratingTexts[star];
  }


  findIfUserHaveRatedRecipe(){
    if(this.currentUserId && this.recipe.reviews){
      return this.recipe.reviews.some(review => {
       return review.rating && review.user_id === this.currentUserId
      })
    }
    return false;
  }

  findIfRecipeHasCommentReview(){
    if(this.recipe.reviews){
      this.recipe.reviews.forEach(review => {
        if(review.commentText){
          return true;
        }
      })
    }else{
      return false;
    }
  }


}
