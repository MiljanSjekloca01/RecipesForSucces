import { Comment } from "./comment.model";

export class Recipe{
    id!: string;
    title!: string;
    description!: string;
    imageUrl!: string; // dodati Upload kasnije
    prepTime!: string;
    cousine?: string;
    type?: "public" | "private";
    owner: string;
    tags!: string[];
    servings!: string;
    ingredients?: string[];
    steps?:string[]
    comments?: Comment[];
    //ranking/stars:
    //userId?: number | string;
    //ingredients:
    //nutrition: Maybe
    //reviews:
    //publishedOn
    //Servings - za kolko osoba
}

