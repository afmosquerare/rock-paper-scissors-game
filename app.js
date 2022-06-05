//Guardando en variables lo necesario del DOM;
const play = document.getElementById("play");
const mainContainer = document.querySelector(".main-container");
const puntajeUser = document.getElementById("user-count");
const puntajeComputer = document.getElementById("computer-count");
const mensajeContainer = document.getElementById("mensaje-container")
const mensaje = document.getElementById("mensaje");
const header = document.querySelector(".contador");
const seleccion = document.querySelectorAll(".card");
const cardContainer = document.querySelector(".cards-container");
const seleccionUser = document.getElementById("user-select");
const versus = document.querySelector(".versus");
const seleccionComputer = document.getElementById("computer-select");
const playButton = document.getElementById("play-button");
const gameSection = document.getElementById("gameSection");
var reiniciarPuntaje = false;
particlesJS.load('particles-js', './assets/particles.json', function() {
    console.log("particles worked");
});  


//Guardando las imagenes que usará el computer.
  const computer = [
    {img:"./assets/img/piedra-computer.png",name:"piedra",},
    {img:"./assets/img/papel-computer.png", name:"papel",},
    {img:"./assets/img/tijera-computer.png", name:"tijera",}
  ]

  
  //Guardando las imagenes que usará el user.
  const user = [
    {img:"./assets/img/piedra-user.png",name:"piedra"},
    {img:"./assets/img/papel-user.png",name:"papel"},
    {img:"./assets/img/tijera-user.png",name:"tijera"},
  ]


//Presionar play para trasladar el juego.
const playStart = () =>{
  play.addEventListener("click", () => {
    header.classList.toggle("transitionedContador");
    mainContainer.classList.toggle("transitioned");
    play.classList.toggle("display-none");
    setTimeout(()=>{
    cardContainer.classList.toggle("transitionCards")
  },1500 )
});
}
let opcionUser;
//Agregar escucha evento a la selección (piedra,papel o tijeras).
const eventCard = ()=>{
  for(let i = 0; i < seleccion.length; i++){
    seleccion[i].addEventListener("click",()=>{
      opcionUser = user[i].name;
      seleccionUser.setAttribute("src",user[i].img);
      mensaje.classList.toggle("display-none");
    })
 }
}
playStart();
eventCard();

//poner a funcionar el boton play
playButton.addEventListener("click", ()=>{
  let piedraPapelOTijeras = opcionUser == "piedra" || opcionUser == "papel" || opcionUser == "tijera"
  if(piedraPapelOTijeras){
    mensajeContainer.classList.toggle("display-none");
    mensaje.textContent = "";
    versus.classList.toggle("width");
    versus.classList.toggle("transitioned-versus");
    cardContainer.classList.toggle("transitionCards")
    playButton.classList.toggle("display-none");
    //generar imagenes entre intervalos.
    let contador = 0;
    let repeticiones = 0;

    setTimeout(()=>{
      const intervalo = setInterval(main,100);
      function main(){
        if(contador != 3){
          seleccionComputer.src = computer[contador].img;
          contador++;
          console.log("Estoy en if");
        }
        else{
          console.log("Estoy en else");
          contador = 0;
          repeticiones++;
        }
        if(repeticiones == 3){
          clearInterval(intervalo);
            //numero aleatorio entre 0 y 2
            generarNumeroAleatorio = () => {
              return  Math.floor(Math.random() * 2.5)  ;
            };
            let numero = generarNumeroAleatorio();
            seleccionComputer.src = computer[numero].img;
            let win;
            //comparación de opciones 
            const comparacion = (opcionUser,opcionComputer) =>{
              if(opcionUser == "piedra"){
                if(opcionComputer == "tijera"){
                  win = "La piedra aplasta la tijera. (Gana la piedra)";
                  puntajeUser.textContent = parseInt(puntajeUser.textContent)+1
                }
                else if(opcionComputer == "papel"){
                  win = "El papel envuelve la piedra. (Gana el papel)";
                  puntajeComputer.textContent = parseInt(puntajeComputer.textContent)+1;
                }
                else{
                  win = "¡EMPATE!";
                }
              }
              else if(opcionUser == "papel"){

                if(opcionComputer == "piedra"){
                  win = "El papel envuelve la piedra. (Gana el papel)";
                  puntajeUser.textContent = parseInt(puntajeUser.textContent)+1
                  
                }
                else if(opcionComputer == "tijera"){
                  win = "La tijera corta el papel. (Gana la tijera)";
                  puntajeComputer.textContent = parseInt(puntajeComputer.textContent)+1;
                  
                }
                else{
                  win = "¡EMPATE!";
                }
              }
              else{
                if(opcionComputer == "papel"){
                  win = "La tijera corta el papel. (Gana la tijera)";
                  puntajeUser.textContent = parseInt(puntajeUser.textContent)+1;
                  
                }
                else if(opcionComputer == "piedra"){
                  win = "La piedra aplasta la tijera. (Gana la piedra)";
                  puntajeComputer.textContent = parseInt(puntajeComputer.textContent)+1;
                  
                }
                else{
                  win = "¡EMPATE!";
                }
              }
              //Verificar el puntaje.
              if(parseInt(puntajeUser.textContent) === 2){
                win = "¡FELICIDADES, GANASTE!";
                reiniciarPuntaje = true;
              }
              if (parseInt(puntajeComputer.textContent) === 2){
                win = "PERDISTE";
                reiniciarPuntaje = true;
              }
              //retorna quien y que ganó.
              return win;
            }
            playButton.textContent = "JUGAR"
            setTimeout(()=>{
              let winOrLose = comparacion(opcionUser,computer[numero].name);
              reiniciarJuego(winOrLose);
            },2000)
        }
       
      }
    },1000) 
  }
  else{
    mensaje.classList.toggle("red");
    setTimeout(()=>{
      mensaje.classList.toggle("red");
    },1000)
  }
  
})
//funcion para reiniciar el juego.
function reiniciarJuego(win){
  mensajeContainer.classList.toggle("display-none");
  versus.classList.toggle("transitioned-versus");
  versus.classList.toggle("width");
  seleccionComputer.src= "";
  seleccionUser.src = "";
  mensaje.textContent = win;
  setTimeout(()=>{
    if(reiniciarPuntaje){
      puntajeUser.textContent = "0";
      puntajeComputer.textContent = "0";
      reiniciarPuntaje = false;
      playButton.textContent = "VOLVER A JUGAR"
    }
    mensaje.textContent = "Escoge una opción";
    opcionUser = "";

    cardContainer.classList.toggle("transitionCards");
    playButton.classList.toggle("display-none");
  },2400)

}