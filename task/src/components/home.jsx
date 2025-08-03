import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const HomePage = () => {
  const mountRef = useRef(null);
  const planetRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const subjects = [
    {
      name: "MATHEMATICS",
      icon: "📐",
      description: "Numbers, equations, and logical reasoning",
      color: 0x3498DB,
      courses: 42,
      students: "15.3K",
      difficulty: "Intermediate",
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=512&h=512&fit=crop"
    },
    {
      name: "PHYSICS",
      icon: "⚛️", 
      description: "Forces, energy, and the laws of nature",
      color: 0xE74C3C,
      courses: 28,
      students: "9.7K",
      difficulty: "Advanced",
      imageUrl: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=512&h=512&fit=crop"
    },
    {
      name: "CHEMISTRY",
      icon: "🧪",
      description: "Elements, compounds, and reactions",
      color: 0x2ECC71,
      courses: 35,
      students: "12.1K",
      difficulty: "Intermediate",
      imageUrl: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=512&h=512&fit=crop"
    },
    {
      name: "BIOLOGY",
      icon: "🧬",
      description: "Life, organisms, and natural processes",
      color: 0x27AE60,
      courses: 31,
      students: "11.8K",
      difficulty: "Beginner",
      imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=512&h=512&fit=crop"
    },
    {
      name: "COMPUTER SCIENCE",
      icon: "💻",
      description: "Programming, algorithms, and digital systems",
      color: 0x9B59B6,
      courses: 67,
      students: "22.4K",
      difficulty: "Advanced",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=512&h=512&fit=crop"
    }
  ];

  const nextPlanet = () => {
    if (!isTransitioning) {
      setCurrentIndex((prev) => (prev + 1) % subjects.length);
    }
  };

  const prevPlanet = () => {
    if (!isTransitioning) {
      setCurrentIndex((prev) => (prev - 1 + subjects.length) % subjects.length);
    }
  };

  const updatePlanet = () => {
    if (!planetRef.current) return;
    
    setIsTransitioning(true);
    const currentSubject = subjects[currentIndex];
    
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(currentSubject.imageUrl, (texture) => {
      planetRef.current.material.map = texture;
      planetRef.current.material.needsUpdate = true;
      setIsTransitioning(false);
    });
  };

  const getResponsivePlanetSize = (width, height) => {
    const minDimension = Math.min(width, height);
    return Math.max(1.5, minDimension / 400);
  };

  const getResponsiveCameraDistance = (width, height) => {
    const aspectRatio = width / height;
    const baseDistance = 12;
    return aspectRatio < 1 ? baseDistance * 1.2 : baseDistance;
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    rendererRef.current = renderer;
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000011);
    container.appendChild(renderer.domElement);

    const cameraDistance = getResponsiveCameraDistance(width, height);
    camera.position.set(0, 0, cameraDistance);

    // Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsVertices = [];
    const starsColors = [];
    
    for (let i = 0; i < 8000; i++) {
      const radius = 500 + Math.random() * 1500;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      starsVertices.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      
      const brightness = 0.5 + Math.random() * 0.5;
      starsColors.push(brightness, brightness, brightness * 0.9 + 0.1);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    starsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starsColors, 3));
    
    const starsMaterial = new THREE.PointsMaterial({ 
      vertexColors: true,
      size: 2,
      sizeAttenuation: true
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    const rimLight = new THREE.DirectionalLight(0x4488ff, 0.3);
    rimLight.position.set(-5, 0, -5);
    scene.add(rimLight);

    // Planet
    const planetSize = getResponsivePlanetSize(width, height);
    const geometry = new THREE.SphereGeometry(planetSize, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    
    textureLoader.load(subjects[currentIndex].imageUrl, (texture) => {
      const material = new THREE.MeshPhongMaterial({ 
        map: texture,
        shininess: 30,
        specular: 0x111111
      });
      const planet = new THREE.Mesh(geometry, material);
      planet.position.set(0, 0, 0);
      scene.add(planet);
      planetRef.current = planet;
    });

    // Animation
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      if (planetRef.current) {
        planetRef.current.rotation.y += 0.003;
        planetRef.current.rotation.x += 0.001;
      }
      
      stars.rotation.y += 0.0001;
      stars.rotation.x += 0.00005;

      renderer.render(scene, camera);
    };
    animate();

    // Click handler
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (event) => {
      event.preventDefault();
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      if (planetRef.current) {
        const intersects = raycaster.intersectObject(planetRef.current);
        if (intersects.length > 0) {
          setSelectedPlanet(subjects[currentIndex]);
          setShowModal(true);
        }
      }
    };

    // Resize handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      const newDistance = getResponsiveCameraDistance(newWidth, newHeight);
      camera.position.z = newDistance;
      
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      if (planetRef.current) {
        const newPlanetSize = getResponsivePlanetSize(newWidth, newHeight);
        planetRef.current.scale.setScalar(newPlanetSize / planetSize);
      }
    };

    renderer.domElement.addEventListener('click', onClick);
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('click', onClick);
      }
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    updatePlanet();
  }, [currentIndex]);

  const currentSubject = subjects[currentIndex];

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Navigation Controls */}
      <button
        onClick={prevPlanet}
        disabled={isTransitioning}
        className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm border border-white/20 text-white p-3 lg:p-4 rounded-full hover:bg-black/70 transition-all duration-300 disabled:opacity-50"
      >
        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextPlanet}
        disabled={isTransitioning}
        className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm border border-white/20 text-white p-3 lg:p-4 rounded-full hover:bg-black/70 transition-all duration-300 disabled:opacity-50"
      >
        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Subject Info */}
      <div className="absolute top-6 lg:top-8 left-1/2 transform -translate-x-1/2 text-center z-20 px-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-3xl lg:text-4xl">{currentSubject.icon}</span>
          <h1 className="text-2xl lg:text-4xl font-bold text-white">{currentSubject.name}</h1>
        </div>
        <p className="text-sm sm:text-base text-gray-400 max-w-md">{currentSubject.description}</p>
      </div>

      {/* Stats */}
      <div className="absolute bottom-16 sm:bottom-12 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-4 lg:gap-8 z-20 px-4">
        <div className="bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center min-w-0">
          <div className="text-xl lg:text-2xl font-bold text-white">{currentSubject.courses}</div>
          <div className="text-sm text-gray-400">Courses</div>
        </div>
        <div className="bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center min-w-0">
          <div className="text-xl lg:text-2xl font-bold text-white">{currentSubject.students}</div>
          <div className="text-sm text-gray-400">Students</div>
        </div>
        <div className="bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center min-w-0">
          <div className="text-lg font-bold text-white">{currentSubject.difficulty}</div>
          <div className="text-sm text-gray-400">Level</div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 lg:bottom-8 right-6 lg:right-8 z-20 flex gap-2">
        {subjects.map((_, index) => (
          <button
            key={index}
            onClick={() => !isTransitioning && setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>


      {/* Three.js container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Enhanced Modal */}
      {showModal && selectedPlanet && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 border border-slate-700" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl sm:text-4xl">{selectedPlanet.icon}</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{selectedPlanet.name}</h2>
                <p className="text-sm sm:text-base text-gray-400">{selectedPlanet.difficulty}</p>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-gray-300 mb-6">{selectedPlanet.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800 rounded-lg p-4 text-center">
                <div className="text-lg sm:text-xl font-bold text-white">{selectedPlanet.courses}</div>
                <div className="text-xs sm:text-sm text-gray-400">Courses</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 text-center">
                <div className="text-lg sm:text-xl font-bold text-white">{selectedPlanet.students}</div>
                <div className="text-xs sm:text-sm text-gray-400">Students</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                onClick={() => setShowModal(false)}
              >
                Explore Subject
              </button>
              <button 
                className="px-6 py-3 border border-slate-600 text-gray-300 rounded-lg hover:border-slate-500 transition-colors text-sm sm:text-base"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;