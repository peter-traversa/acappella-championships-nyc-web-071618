const tableBody = document.getElementById('table-body')
const winner = document.getElementById('winner')
let teamsArray = []


fetch('http://localhost:3000/a_cappella_groups')
.then(res => res.json())
.then(groups => {
  groups.forEach(group => {
    teamsArray.push(group)
  })
  displayTeamsOnPage()
})

function displayTeamsOnPage(){
  tableBody.innerHTML = ''
  teamsArray.forEach(team => {
    const newRow = document.createElement('tr')
    newRow.dataset.id = `${team.id - 1}`
    newRow.innerHTML = `<td>${team.college.name}</td> <td>${team.name}</td> <td>${team.membership}</td> <td>${team.college.division}</td> <td><img src='./assets/trophy.png' id='trophy'/></td>`
    tableBody.append(newRow)
  })
}

function addWinnerToHead(winnerId){
  winner.innerHTML = `Winner: ${teamsArray[winnerId].name}`
}

function removeWinnerFromBody(winnerId){
  document.getElementById("table-body").deleteRow(winnerId)
}

document.addEventListener('click', (event) => {
  if (event.target.id === 'trophy'){
    const winnerId = event.target.parentNode.parentNode.dataset.id
    displayTeamsOnPage()
    removeWinnerFromBody(winnerId)
    addWinnerToHead(winnerId)
  }
})
