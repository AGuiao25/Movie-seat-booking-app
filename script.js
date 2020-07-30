const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
populateUi();

let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, movieValue) {
localStorage.setItem('selectedMovieIndex', movieIndex);
localStorage.setItem('selectedMoviePrice', movieValue);


}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
 
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

}

function populateUi() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

 if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));
  const selectedMoviePrice = JSON.parse(localStorage.getItem('selectedMoviePrice'));

  if(selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
      movieSelect.value = selectedMoviePrice;
  }

}

movieSelect.addEventListener('change', e => {
ticketPrice = +e.target.value;
setMovieData(e.target.selectedIndex, e.target.value);

updateSelectedCount();
});

container.addEventListener('click', e => {
if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
} 


});
updateSelectedCount();