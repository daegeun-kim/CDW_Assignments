// Wait for the page to load before running JavaScript
document.addEventListener('DOMContentLoaded', function() {  // Listen for when HTML is fully loaded
    
    // Find HTML elements using their IDs
    const button = document.getElementById('demoButton');      // Get the button element by its ID
    const messageArea = document.getElementById('messageDisplay');  // Get the message area element by its ID

    // Create an SVG overlay for lines
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100vw';
    svg.style.height = '100vh';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '500';
    document.body.appendChild(svg);

    // Track the last button created
    let lastButton = button;

    // Function to show time message
    function showTimeMessage() {
        const currentTime = new Date().toLocaleTimeString();   // Get current time as a string
        const message = 'Hello! You clicked the button at ' + currentTime;  // Create message with time
        messageArea.textContent = message;                     // Put the message in the HTML element
    }
    
    // Add click event listener to the original button
    button.addEventListener('click', function() {              // Listen for clicks on the button
        // Show time message
        showTimeMessage();
        
        // Change button text temporarily
        button.textContent = 'Thanks for clicking!';           // Change what the button says
        
        // Create a new button at random location
        createRandomButton();
    });
    
    // Function to create a button at random location
    function createRandomButton() {
        const newButton = document.createElement('button');     // Create a new button element
        newButton.textContent = 'Random Button!';              // Set button text
        newButton.style.position = 'absolute';                 // Position absolutely for random placement
        const left = Math.random() * (window.innerWidth - 150);
        const top = Math.random() * (window.innerHeight - 50);
        newButton.style.left = left + 'px';  // Random X position
        newButton.style.top = top + 'px';   // Random Y position
        newButton.style.zIndex = '1000';                       // Ensure button appears on top
        
        // Add click event to the new button (shows time message and creates another random button)
        newButton.addEventListener('click', function() {
            showTimeMessage();                                  // Show the same time message
            createRandomButton();                               // Create another random button
            this.textContent = 'Clicked!';                      // Change button text
        });
        
        document.body.appendChild(newButton);                  // Add the button to the page

        // Draw a line from the last button to the new button
        drawLineBetweenButtons(lastButton, newButton);
        // Update lastButton reference
        lastButton = newButton;
    }

    // Function to draw a line between two buttons
    function drawLineBetweenButtons(btn1, btn2) {
        // Get bounding rectangles
        const rect1 = btn1.getBoundingClientRect();
        const rect2 = btn2.getBoundingClientRect();
        // Calculate center points
        const x1 = rect1.left + rect1.width / 2;
        const y1 = rect1.top + rect1.height / 2;
        const x2 = rect2.left + rect2.width / 2;
        const y2 = rect2.top + rect2.height / 2;
        // Create SVG line
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        // Generate a very random color
        const randomColor = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
        line.setAttribute('stroke', randomColor);
        line.setAttribute('stroke-width', '3');
        line.setAttribute('opacity', '0.7');
        svg.appendChild(line);
    }
});