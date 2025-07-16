// spatial-canvas-threejs.js
// Three.js scene: grid, primitives, and orbit controls

(function() {
    // Scene, camera, renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 800 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(800, 400);
    renderer.setClearColor(0xadd8e6); // Light blue background
  
    document.getElementById('canvas-container-4').appendChild(renderer.domElement);
  
    // Add grid helper
    // const grid = new THREE.GridHelper(16, 32, 0xcccccc, 0xcccccc);
    // scene.add(grid);
  
    // Add ambient and directional light
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);
  
    // Add 3D primitives
    // Twisted Box
    const boxGeometry = new THREE.BoxGeometry(2, 4, 2, 50, 1, 50); // Height is now 4
    const twistAmount = Math.PI / 3; // 60 degrees twist
    const positionAttr = boxGeometry.attributes.position;
    for (let i = 0; i < positionAttr.count; i++) {
      const y = positionAttr.getY(i);
      const t = (y + 2) / 4; // Normalize y to [0,1] for 4 unit height
      const angle = twistAmount * (t - 0.5); // Center twist at y=0
      const x = positionAttr.getX(i);
      const z = positionAttr.getZ(i);
      const newX = x * Math.cos(angle) - z * Math.sin(angle);
      const newZ = x * Math.sin(angle) + z * Math.cos(angle);
      positionAttr.setX(i, newX);
      positionAttr.setZ(i, newZ);
    }
    boxGeometry.computeVertexNormals();
    const box = new THREE.Mesh(
      boxGeometry,
      new THREE.MeshPhongMaterial({ color: 0x888888 }) // Grey color
    );
    box.position.set(-5, 2, 0); // Raise to sit on ground
    scene.add(box);
    // Sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0xffa500 })
    );
    sphere.position.set(0, 1.2, 0);
    scene.add(sphere);
    // Cylinder
    const cylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 2, 32),
      new THREE.MeshPhongMaterial({ color: 0x4caf50 })
    );
    cylinder.position.set(5, 1, 0);
    scene.add(cylinder);
    // Cone
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(1, 2, 32),
      new THREE.MeshPhongMaterial({ color: 0xe91e63 })
    );
    cone.position.set(2.5, 1, -4);
    scene.add(cone);
  
    // Camera position
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
  
    // OrbitControls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = false;
    controls.minDistance = 4;
    controls.maxDistance = 40;
    controls.target.set(0, 1, 0);
  
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  })(); 