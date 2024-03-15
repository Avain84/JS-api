// balldontlie
// mail:sports113499@gmail.com
// axios
const token = "e6c812f1-0afb-4613-8466-d053af099a47";
const config = {
  headers: { Authorization: `${token}` },
};

// DOM
const teamSelect = document.querySelector("#teamselect");
const playerName = document.querySelector(".player-name");
const searchPlayer = document.querySelector(".search");
const playerSelect = document.querySelector(".player-select");
const players = document.querySelector(".players");
const team = document.querySelector(".team");
const player = document.querySelector(".player");
const section = document.querySelectorAll("section");
const title = document.querySelector(".h2text");
const playerTitle = document.querySelector(".player_name");
const fullName = document.querySelector(".full_name");
const abbreviation = document.querySelector(".abbreviation");
const city = document.querySelector(".city");
const division = document.querySelector(".division");
const conference = document.querySelector(".conference");
const playerTeam = document.querySelector(".player_team");
const playerNumber = document.querySelector(".player_number");
const playerHeight = document.querySelector(".player_height");
const playerWeight = document.querySelector(".player_weight");
const playerPosition = document.querySelector(".player_position");
const playerCollege = document.querySelector(".player_college");

let teamsData = [];
let playersData = [];

// function
function getData(data, list) {
  let dataList = [];
  data.forEach((item) => {
    switch (list) {
      case "team":
        if (item.id <= 35) {
          dataList.push(item);
        }
        break;
      case "player":
        dataList.push(item);
    }
  });
  return dataList;
}
function getTeamName(data, list) {
  let options = '<option value="">請選擇</option>';
  data.forEach((item) => {
    if (list === "team") {
      options += `<option value="${item.id}">${item.name}</option>`;
    } else if (list === "player") {
      options += `<option value="${item.id}">${item.first_name} ${item.last_name}</option>`;
    }
  });
  if (list === "team") {
    teamSelect.innerHTML = options;
  } else if (list === "player") {
    playerSelect.innerHTML = options;
  }
}

function hiddenSection(area) {
  section.forEach((item) => {
    item.classList.add("hidden");
  });
  area.classList.remove("hidden");
}

axios
  .get("https://api.balldontlie.io/v1/teams", config)
  .then((response) => {
    teamsData = response.data.data;
    const teamArr = getData(teamsData, "team");
    getTeamName(teamArr, "team");
  })
  .catch((error) => {});

teamSelect.addEventListener("change", (e) => {
  hiddenSection(team);
  const teamData = teamsData[e.target.value - 1];

  title.textContent = teamData.name;
  fullName.textContent = teamData.full_name;
  abbreviation.textContent = teamData.abbreviation;
  city.textContent = teamData.city;
  division.textContent = teamData.division;
  conference.textContent = teamData.conference;
});

searchPlayer.addEventListener("click", (e) => {
  e.preventDefault();
  axios
    .get(
      `https://api.balldontlie.io/v1/players?search=${playerName.value}`,
      config
    )
    .then((response) => {
      playersData = response.data.data;
      const playersArr = getData(playersData, "player");
      getTeamName(playersArr, "player");
      players.classList.remove("hidden");
    })
    .catch((error) => {});
});

playerSelect.addEventListener("change", (e) => {
  hiddenSection(player);

  const playerData = playersData.filter((item) => item.id == e.target.value);

  playerTitle.textContent =
    playerData[0].first_name + " " + playerData[0].last_name;
  playerTeam.textContent = playerData[0].team.name;
  playerNumber.textContent = playerData[0].jersey_number;
  playerHeight.textContent = playerData[0].height;
  playerWeight.textContent = playerData[0].weight;
  playerPosition.textContent = playerData[0].position;
  playerCollege.textContent = playerData[0].college;
});
