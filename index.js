let btnColors = ['red', 'green', 'yellow', 'blue']
let patternGenerated = []
let userClickedPattern = []
let level = 0
let started = false

if(!localStorage.getItem('high-score')){
  localStorage.setItem('high-score', 0)
}

$('#high-score').text(`High Score: ${localStorage.getItem("high-score")}`)

$('#start').click(function(){
  if(!started){
    $('#level-title').text(`level: ${level}`)
    started = true
    newLevel()
  }
})

const newLevel = () =>{
  userClickedPattern = []
  level++
  $('#level-title').text(`level: ${level}`)
  const randomColor = btnColors[Math.floor(Math.random()*4)]
  patternGenerated= [...patternGenerated, randomColor]
  $(`#${randomColor}`).fadeIn(100).fadeOut(100).fadeIn(100)
  playAudio(randomColor)
}

$('.btn').click(function(){
  var colorClicked = $(this).attr('id')
  console.log(colorClicked)
  playAudio(colorClicked)
  animateButton(colorClicked)
  userClickedPattern.push(colorClicked)
  check(userClickedPattern.length-1)
})

function check(checkNum){
  if(patternGenerated[checkNum] === userClickedPattern[checkNum]){
    if(patternGenerated.length === userClickedPattern.length){
      setTimeout(newLevel(), 1000)
    }
  }
  else{
    playAudio('wrong')
    $('body').addClass("game-over")
    $("#level-title").text("Game Over, Press any key to restart")
    setTimeout(function(){$("body").removeClass("game-over")},200)
    startOver()
  }
}

const playAudio = (key) => new Audio(`sounds/${key}.mp3`).play()

const animateButton = (colour) => {
  $(`#${colour}`).addClass('pressed')
  setTimeout(()=>{
    $(`#${colour}`).removeClass('pressed')
  },200)
}

const startOver = () =>{
  if(localStorage.getItem('high-score')<level){
    localStorage.setItem('high-score', level);
  }
  $('#high-score').text(`High Score: ${localStorage.getItem("high-score")}`)
  level = 0
  patternGenerated = []
  started = false
}