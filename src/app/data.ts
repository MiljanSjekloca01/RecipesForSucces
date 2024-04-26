import { Recipe } from "./shared/models/recipes.model";
import { Tag } from "./shared/models/tag.model";

export const sample_recipes:Recipe[] = [
    {
        id: "1",
        title: "Chicken Limone",
        description: "Chicken limone is a luscious way to prepare chicken cutlets. The lemon pan sauce, with shallots for a sweet onion note, and just a touch of cream, really boosts the flavors of the browned bits that remain in the pan. It’s well-balanced, with great lemon flavor but no sour notes. Like chicken piccata without the salty capers, it’s a great quick dish for a weeknight dinner with friends.",
        imageUrl: "https://tastingwithtina.com/wp-content/uploads/2022/04/DSC_0023.jpg",
        prepTime: "15-20",
        cousine: "Italian",
        type: "public",
        owner: "Amanda Christie",
        tags:["Chicken","Lunch"]
    },
    {
        id: "2",
        title: "Fish Puttanesca",
        description: "This fish puttanesca, served over spaghetti, comes together quickly. Normally, puttanesca sauce, simple but robust, doesn’t include a protein, but it’s easy to add some cod filets, and the addition barely influences the cooking time. Any mild white fish will be just fine in this dish.",
        imageUrl: "https://realfood.tesco.com/media/images/1400x919FishPuttanesca-25ce853f-2c4e-4f20-a4ed-fd0b9d5f060c-0-1400x919.jpg",
        prepTime: "25-30",
        cousine: "Italian",
        type: "public",
        owner: "Brenda Soprano",
        tags:["Fish","Lunch"]
    },
    {
        id: "3",
        title: "Caesar Salad",
        description: "This crispy tater Caesar salad is for you if you love fries in a salad. Crispy smashed tater tot croutons, a doctored-up bottled Caesar dressing, and crispy chicken cutlets join Romaine lettuce and Parmesan in this meal in a bowl.",
        imageUrl: "https://www.allrecipes.com/thmb/JKpVfifdHfsOouZinXj032VolJc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8628372_Crispy-Tater-Caesar-Salad_Dotdash-Meredith-Food-Studios_4x3-660c08772b3d405abaa397597a5d8c17.jpg",
        prepTime: "45-60",
        type: "public",
        owner: "Julius Caesar",
        tags:["Salad","Lunch"]
    },
    {
        id: "4",
        title: "Hummus Soup",
        description: "I prefer hummus served warm, with a swirl of olive oil, crispy chickpeas, and fresh veggies for dipping. This recipe is a wonderful amalgam of all of those tasty things, kicked up a notch: sautéed onions and garlic and softened carrots in broth provide the base, while chickpeas carry the bright and velvety finishing flavors of tahini and lemon, respectively. ",
        imageUrl: "https://www.simplyrecipes.com/thmb/bzEL7LgMLR6cpDHX1CbryR5cLcY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Hummus-Soup-LEAD-3-15d4c9410f2b41c58944c1cf64f07b38.jpg",
        prepTime: "40-50",
        cousine: "German",
        type: "public",
        owner: "Jesse James West",
        tags:["Soup","Dinner"]
    },
    {
        id: "5",
        title: "Greek Potato Salad",
        description: "This Greek potato salad is a refreshing change from classic mayo potato salad. It has lighter and brighter flavors, goes well with most entrees, and we particularly enjoy it during the summer for BBQs or any backyard gathering.",
        imageUrl: "https://www.allrecipes.com/thmb/EtBfa2bqlHu7DayI7qVxnL7Yft4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8391270_Greek-Potato-Salad_Pat-Bernitt_4x3-74ca5d44e4cf427a87f0563cf41bd6ca.jpg",
        prepTime: "25-35",
        cousine: "Greek",
        type: "public",
        owner: "Giannis Papagiannis",
        tags:["Salad","Dinner"]
    },
    {
        id: "6",
        title: "Omelette Hashbrown Casserole",
        description: "A diner breakfast upgrade that’s perfect for a filling meal any time of day.Those cubes of ham, shreds of cheese, and bits of bell pepper are a calling card for satisfaction. You know you have a fine meal in store, preferably with toast, hashbrowns, and a big cup of coffee at the ready.",
        imageUrl: "https://www.simplyrecipes.com/thmb/6OMPlSoywc0dfQVw2GW6qrLshfw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Denver-Omelette-Casserole-LEAD-833bd80c6f124d069a74fd0789f6fc83.jpg",
        prepTime: "60-70",
        cousine: "American",
        type: "public",
        owner: "George Janko",
        tags:["Breakfast"]
    },

    {
        id: "7",
        title: "Frozen Fruit Smoothie",
        description: "his frozen fruit smoothie is fast, simple, nutritious, and tasty with extra protein from the Greek yogurt. It’s a great on-the-go breakfast or afternoon snack. I always include a banana, but choose your favorite frozen fruits such as strawberries, cherries, pineapple, raspberries, and blueberries.",
        imageUrl: "https://www.allrecipes.com/thmb/xV_76a1HgmtwhfvvPgUB2l6Rr34=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8624320_Frozen-Fruit-Smoothie_Pat-Bernitt_4x3-1af73c32ccab4bfebb9ccd2410df6391.jpg",
        prepTime: "10",
        type: "public",
        owner: "Patrick Beverly",
        tags:["Drink"]
    },

    {
        id: "8",
        title: "Pumpkin Mousse",
        description: "his frozen fruit smoothie is fast, simple, nutritious, and tasty with extra protein from the Greek yogurt. It’s a great on-the-go breakfast or afternoon snack. I always include a banana, but choose your favorite frozen fruits such as strawberries, cherries, pineapple, raspberries, and blueberries.",
        imageUrl: "https://www.simplyrecipes.com/thmb/_FYO_3oiizJXONdWwo1cyhfOfJ8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Pumpkin-Mousse-LEAD-4-bd1ba06687954b509cdcbad55e4e4d3f.jpg",
        prepTime: "10",
        type: "public",
        owner: "Anne Bush",
        tags:["Dessert"]
    },

]


export const sample_tags:Tag[] = [
    { name: 'All', count: 8 },
    { name: 'Chicken', count: 1 },
    { name: 'Fish', count: 1 },
    { name: 'Lunch', count: 3 },
    { name: 'Dessert', count: 1 },
    { name: 'Drinks', count: 1 },
    { name: 'Salad', count: 2 },
    { name: 'Soup', count: 1 },
    { name: 'Dinner', count: 2 },
  ]