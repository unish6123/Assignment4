const express = require('express');
const app = express();
const port =2000;
const cors = require('cors');
const breeds = require('./constants/breeds.js');
app.use('/img', express.static('public/img'));

app.use(cors());

const randInt = (n) => Math.floor(n * Math.random());
const getRandomItemFromArray = (arr) => arr[randInt(arr.length)];

function getRandomImage(){
  const breedKeys = Object.keys(breeds);
  const randomBreed = getRandomItemFromArray(breedKeys)
  const images = breeds[randomBreed];
  const randomImage = getRandomItemFromArray(images)
  return randomImage;
}

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/breeds', (req, res) =>{
    let randomImageUrl =  getRandomImage()
    res.json({imageUrl:`http://localhost:2000/img/${randomImageUrl}`});
})

app.get('/image/:breed', (req, res) => {
    const breed = req.params.breed.toLowerCase();
    if (breeds[breed]) {
        const randomImage = getRandomItemFromArray(breeds[breed]);
        res.json({ imageUrl:`http://localhost:2000/img/${randomImage}` });  
    } else {
        res.status(404).json({ error: "Breed not found" });
    }
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});