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
  maxCommentsPerUser = 4;

  constructor(activedRoute: ActivatedRoute,private recipeService: RecipeService){
    activedRoute.params.subscribe( param => {
      if(param.id){
        this.recipe = this.recipeService.getRecipeById(param.id);
      }
    })
  }

  ngOnInit(){
    this.userHaveRated = this.findIfUserHaveRatedRecipe();
  }

  onSubmit(rating: number,comment: string){
    if(comment){
      if (this.countUserComments() >= this.maxCommentsPerUser) {
        alert(`You have reached the maximum limit of ${this.maxCommentsPerUser} comments.`);
        return;
      }
    }

    if(rating && comment){
      this.recipeService.createReview(this.recipe.id,rating,comment);
      this.userHaveRated = true;
    }else if(rating && !comment){
      this.recipeService.createReview(this.recipe.id,rating,null);
      this.userHaveRated = true;
    }else{
      this.recipeService.createReview(this.recipe.id,null,comment);
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

  countUserComments(): number {
    if (this.currentUserId && this.recipe.reviews) {
      return this.recipe.reviews.filter(review => review.user_id === this.currentUserId && review.commentText).length;
    }
    return 0;
  }


}
