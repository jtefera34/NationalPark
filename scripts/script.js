document.addEventListener('DOMContentLoaded', () => {
  const images = [
      'images\Eisenhower-StoryImage_2.jpg',
      'images\Garfield-StoryImage.jpg',
      'images\Wildcat-StoryImage.jpg',
      'images\WBond-StoryImage.jpg',
      'images\Jackson-StoryImg.jpg',
      // Add more random images if needed
  ];

  let currentIndex = 0;
  const heroSection = document.getElementById('hero-section');

  const setBackground = (index) => {
      heroSection.style.backgroundImage = `url(${images[index]})`;
  };

  // Function to change the background image at regular intervals
  const changeBackgroundImage = () => {
      currentIndex = (currentIndex + 1) % images.length;
      setBackground(currentIndex);
  };

  // Set initial background
  setBackground(currentIndex);

  // Change background image every 5 seconds (5000 milliseconds)
  setInterval(changeBackgroundImage, 5000);
});
