(function() {
    // Scene, camera, renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 800 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(800, 400);
    renderer.setClearColor(0xf0f0f0); // Light gray background
  
    document.getElementById('canvas-container-3').appendChild(renderer.domElement);
  
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
  
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);
  
    // Create 10 boxes at random positions and store them in an array
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 100 }); // Red color
    const boxes = [];
    for (let i = 0; i < 10; i++) {
      const box = new THREE.Mesh(geometry, material);
      box.position.x = Math.random() * 8 - 4; // -4 to 4
      box.position.y = Math.random() * 3 + 0.5; // 0.5 to 3.5
      box.position.z = Math.random() * 8 - 4; // -4 to 4
      scene.add(box);
      boxes.push(box);
    }
  
    // Position the camera
    camera.position.set(3, 3, 5);
    camera.lookAt(0, 0.5, 0);
  
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      // Rotate each box
      for (const box of boxes) {
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    }
    animate();
  })(); 