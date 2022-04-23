import  express  from "express"; 
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
const app= express();
const PORT=4007;
dotenv.config();
app.use(express.json());
const MONGO_URL=process.env.MONGO_URL;
async function createConnection(){
    const client=new MongoClient(MONGO_URL);
  await  client.connect();
    console.log("mongo is connected🥰🥰")
    return client;
} 
const client= await createConnection();
 const food=[
  {
    "id": "100",
    "profile": "https://www.watscooking.com/images/dish/large/bigbiryani.jpg",
    "food": "briyani",
    "price": "$100"
  },
  {
    "id": "101",
    "profile": "https://www.cookwithmanali.com/wp-content/uploads/2020/05/Masala-Dosa-500x500.jpg",
    "incredents": "",
    "food": "dosa",
    "price": "$20"
  },
  {
    "id": "102",
    "profile": "https://www.indianhealthyrecipes.com/wp-content/uploads/2014/09/ven-pongal-recipe.jpg",
    "food": "pongal",
    "price": "$30"
  },
  {
    "id": "103",
    "profile": "https://t3.ftcdn.net/jpg/03/62/02/26/360_F_362022640_fZ6UM0JycJlFDdBiR1pYlNddKfdGvYwR.jpg",
    "food": "idly",
    "price": "$20"
  },
  {
    "id": "104",
    "profile": "https://c.ndtvimg.com/2021-05/tj7sdqj8_parotta_625x300_14_May_21.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675",
    "food": "parotta",
    "price": "$10"
  },
  {
    "id": "105",
    "profile": "https://static.toiimg.com/thumb/61203720.cms?width=1200&height=900",
    "food": "chappathi",
    "price": "$15"
  },
  {
    "id": "106",
    "profile": "https://foodiewish.com/wp-content/uploads/2020/05/Medu-Vada-Recipe-1.jpg",
    "food": "vada",
    "price": "$10"
  },
  {
    "id": "107",
    "profile": "https://www.kannammacooks.com/wp-content/uploads/masala-fish-fry-recipe-ayala-meen-Mackerel-fry-8.jpg",
    "food": "fish",
    "price": "$200"
  },
  {
    "id": "108",
    "profile": "https://www.spiceindiaonline.com/wp-content/uploads/2021/05/Tandoori-Chicken-20.jpg",
    "food": "grill-chicken",
    "price": "$350"
  },
  {
    "id": "109",
    "profile": "https://cdn1.foodviva.com/static-content/food-images/chinese-recipes/gobi-manchurian-recipe/gobi-manchurian-recipe.jpg",
    "food": "Gobi-manjurian",
    "price": "$100"
  },
  {
    "id": "110",
    "profile": "https://earthoven.com/wp-content/uploads/2017/06/ChickenTandoori-1300x867.jpg",
    "food": "tandoori",
    "price": "$250"
  },
  {
    "id": "111",
    "profile": "https://www.kitchensanctuary.com/wp-content/uploads/2020/04/Chicken-Fried-Rice-square-FS-.jpg",
    "food": "fried-rice",
    "price": "$250"
  },
  {
    "id": "112",
    "profile": "https://i.ytimg.com/vi/AbkjJ-3iH7Q/maxresdefault.jpg",
    "food": "atho",
    "price": "$250"
  },
  {
    "id": "113",
    "profile": "https://www.archanaskitchen.com/images/archanaskitchen/0-Affiliate-Articles/South_indian_lunch_Cabbage_Poricha_Kootu_Vazhaipoo_Poriyal_Podimas_Kathrikai_Poodu_Pirratal_Tomato_Garlic_rasam_Green_moong_dal_payasam_Rice-5_1.jpg",
    "food": "rice",
    "price": "$250"
  },
  {
    "id": "114",
    "profile": "https://img.etimg.com/thumb/msid-64571537,width-1200,height-900,imgsize-357951,overlay-etpanache/photo.jpg",
    "food": "crab",
    "price": "$250"
  },
  {
    "id": "115",
    "profile": "https://static.toiimg.com/thumb/75452887.cms?imgsize=1880138&width=800&height=800",
    "food": "prawn",
    "price": "$250"
  }
  
]

app.get("/",function(request,response){
    response.send("hey this is lingesh from ennore")
})
app.get("/food",async function(request,response){
    const food = await client.db("b30wd").collection("briyani").find({}).toArray();
    response.send(food)
})
app.get("/food/:id",async function(request,response){
  console.log(request.params)
  const{id}=request.params
  const food = await client.db("b30wd").collection("briyani").findOne({id:id})
  response.send(food)
})
app.put("/food/:id",async function(request,response){
  console.log(request.params)
  const{id}=request.params
  const updatedata=request.body;
  const food = await client.db("b30wd").collection("briyani").updateOne({id:id},{$set:updatedata})
  response.send(food)
})
app.delete("/food/:id",async function(request,response){
  console.log(request.params)
  const{id}=request.params
  const food = await client.db("b30wd").collection("briyani").deleteOne({id:id})
  response.send(food)
})
app.post("/food",async function(request,response){
    const data=request.body;
    const food=  await client.db("b30wd").collection("briyani").insertMany(data);
    response.send(food)
})

app.listen(PORT,()=>console.log(`serveris started ${PORT}`));