
// Define a function to handle hamburger menu functionality
export function initHamburgerMenu() {
  const hamburgerBtn = document.querySelector('.header__hamburger');
  const nav = document.querySelector('.header__small-nav');

  // Add click event listener to toggle navigation visibility
  hamburgerBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
  });
}

// Function to fetch data from the API and display it on a chart
export function displayCovidData(elementId) {
    fetch('https://api.covidtracking.com/v1/us/daily.json')
      .then(response => response.json())
      .then(data => {
        // Get data for the last 14 days
        const lastTwoWeeksData = data.slice(0, 14);

        // Split the data into last week and the week before
        const lastWeekData = lastTwoWeeksData.slice(0, 7);
        const weekBeforeLastData = lastTwoWeeksData.slice(7, 14);

        // Extract positive cases for each week
        const lastWeekCases = lastWeekData.map(day => day.positive);
        const weekBeforeLastCases = weekBeforeLastData.map(day => day.positive);

        // Reverse data to start from the oldest to the newest
        lastWeekCases.reverse();
        weekBeforeLastCases.reverse();
        
        // Display the Data on a Graph
        const ctx = document.getElementById(elementId).getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['7 - 14', '6 - 13', '5 - 12', '4 - 11', '3 - 10', '2 - 9', '1 - 8'],
            datasets: [
              {
                label: 'Cases Last Week',
                data: lastWeekCases,
                borderColor: 'rrgb(85, 77, 222)',
                backgroundColor: 'rgb(85, 77, 222)',
                borderWidth: 1
              },
              {
                label: 'Cases Week Before Last',
                data: weekBeforeLastCases,
                borderColor: 'rgb(244, 78, 119)',
                backgroundColor: 'rgb(244, 78, 119)',
                borderWidth: 1
              }
            ]
          },
        });
      })
      .catch(error => console.error('Error fetching data:', error));
}
