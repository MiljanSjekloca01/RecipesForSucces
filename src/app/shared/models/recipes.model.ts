import { Review } from "./review.model";

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
    reviews?: Review[];
    ratings?: number[];
    //userId?: number | string;
    //nutrition: Maybe
    //reviews:
    //publishedOnDate
}

