//test change
// import axios from "axios";

//going to do it similar to the guided project

//create an entry point to attach the github user cards to the dom
const entryPoint = document.querySelector(".cards");
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
axios
  .get(`https://api.github.com/users/krisf451`)
  .then(res => {
    /*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3 (line 34).
*/
    // console.log(res.data);
    /*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
    entryPoint.appendChild(createCard(res.data));
  })
  .catch(err => {
    console.error(err);
  });

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/
const followersArray = [
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"
];

followersArray.forEach(user => {
  axios
    .get(`https://api.github.com/users/${user}`)
    .then(res => {
      console.log(res.data.login);
      entryPoint.appendChild(createCard(res.data));
    })
    .catch(err => {
      console.error(err);
    });
});

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function createCard(userData) {
  //create elements that will be added to the dom
  const container = document.createElement("div");
  const userImage = document.createElement("img");
  const cardInfo = document.createElement("div");
  const userName = document.createElement("h3");
  const userLogin = document.createElement("p");
  const userLocation = document.createElement("p");
  const profileLink = document.createElement("p");
  const userLink = document.createElement("a");
  const userFollowers = document.createElement("p");
  const userFollowing = document.createElement("p");
  const userBio = document.createElement("p");

  //add classes
  container.classList.add("card");
  cardInfo.classList.add("card-info");
  userName.classList.add("name");
  userLogin.classList.add("username");

  //append to the proper parents
  container.appendChild(userImage);
  container.appendChild(cardInfo);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(userLogin);
  cardInfo.appendChild(userLocation);
  cardInfo.appendChild(profileLink);
  cardInfo.appendChild(userFollowers);
  cardInfo.appendChild(userFollowing);
  cardInfo.appendChild(userBio);
  profileLink.appendChild(userLink);

  //set values for the elements
  userImage.src = userData.avatar_url;
  userName.textContent = userData.name;
  userLogin.textContent = userData.login;
  userLocation.textContent = `Location: ${userData.location}`;
  userLink.textContent = `Profile ${userData.html_url}`;
  userLink.href = userData.html_url;
  userFollowers.textContent = `Followers: ${userData.followers}`;
  userFollowing.textContent = `Following: ${userData.following}`;
  userBio.textContent = `Bio: ${userData.bio}`;

  return container;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
