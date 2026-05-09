import Script from "next/script";

export default function Home() {
  return (
    <>
      <header
      className="fixed w-full bg-dark/80 backdrop-blur-sm z-50 border-b border-primary/10"
    >
      <nav
        className="container mx-auto px-6 py-4 flex justify-between items-center"
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full animate-pulse-slow"></div>
          <span
            className="text-xl font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent"
            >Cikal Chievo Arment</span
          >
        </div>
        <div className="hidden md:flex space-x-8">
          <a
            href="#home"
            className="nav-link text-gray-300 hover:text-primary transition"
            >Home</a
          >
          <a
            href="#projects"
            className="nav-link text-gray-300 hover:text-primary transition"
            >Projects</a
          >
          <a
            href="#gallery"
            className="nav-link text-gray-300 hover:text-primary transition"
            >Gallery</a
          >
          <a
            href="#skills"
            className="nav-link text-gray-300 hover:text-primary transition"
            >Skills</a
          >
          <a
            href="#contact"
            className="nav-link text-gray-300 hover:text-primary transition"
            >Contact</a
          >
        </div>
        <button
          id="mobile-toggle"
          className="md:hidden text-gray-300 focus:outline-none"
        >
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </nav>
      <div id="mobile-menu" className="mobile-menu">
        <button id="mobile-close" className="text-gray-300 self-end">
          <i className="fas fa-times text-2xl"></i>
        </button>
        <a href="#home" className="nav-link">Home</a>
        <a href="#projects" className="nav-link">Projects</a>
        <a href="#gallery" className="nav-link">Gallery</a>
        <a href="#contact" className="nav-link">Contact</a>
      </div>
    </header>

    <section id="home" className="min-h-screen flex items-center pt-20">
      <canvas id="particle-canvas"></canvas>
      <div
        className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center"
      >
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Hi, I'm <span className="text-primary">Cikal Chievo Arment</span><br />
            <span className="text-lg md:text-2xl text-gray-300"
              >Unity Game Programmer</span
            >
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-lg">
            I'm a soon-to-be graduate in Multimedia Engineering Technology with
            a focus on game development using Unity and C#. I’ve built immersive
            VR experiences and hardware-integrated simulations, combining
            creative design with technical execution. I'm excited to bring
            innovative and interactive solutions to real-world applications.
          </p>
          <div className="flex space-x-4">
            <a
              href="#projects"
              className="px-8 py-3 bg-primary text-dark font-semibold rounded-full hover:bg-primary/80 transition view-projects"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary/10 transition contact-me"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center animate-float">
          <div
            className="relative w-64 h-64 md:w-80 md:h-80 bg-secondary rounded-2xl p-4 shadow-lg"
          >
            <div
              className="absolute inset-0 border-2 border-primary/30 rounded-2xl -m-2"
            ></div>
            <img
              src="images/profil.jpg"
              alt="Game developer working on a high-tech workstation with multiple monitors displaying game engines and code"
              className="w-full h-full object-cover rounded-xl opacity-90"
            />
            <div
              className="absolute w-16 h-16 bg-primary rounded-full -bottom-5 -right-5 flex items-center justify-center"
            >
              <i className="fas fa-gamepad text-2xl text-dark"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="projects" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            My <span className="text-primary">Game & Simulation</span> Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          <div
            className="project-card bg-dark rounded-xl overflow-hidden shadow-lg transition duration-500"
            data-images='[
              "images/mahakarya1.png",
              "images/mahakarya2.png",
              "images/mahakarya3.png"
            ]'
          >
            <div className="project-slider">
              <div className="project-gallery" id="gallery-mahakarya">
                <img loading="lazy"
                  src="images/mahakarya1.png"
                  alt="VR Mahakarya Screenshot 1"
                />
                <img loading="lazy"
                  src="images/mahakarya2.png"
                  alt="VR Mahakarya Screenshot 2"
                />
                <img loading="lazy"
                  src="images/mahakarya3.png"
                  alt="VR Mahakarya Screenshot 3"
                />
              </div>
              <div className="slider-nav">
                <button className="prev-btn" data-gallery="gallery-mahakarya">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="next-btn" data-gallery="gallery-mahakarya">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Game VR Mahakarya</h3>
              <div className="project-description">
                <p className="text-gray-400 mb-4 short-description"></p>
                <p className="text-gray-400 mb-4 full-description hidden">
                  Developed an immersive vocational exhibition VR game using
                  Unity and Oculus. I was responsible for implementing enemy AI
                  (for interactive storytelling), object interaction systems
                  (grabbing, triggering, inspecting), and building modular
                  environments. The game showcases iconic Indonesian landmarks
                  such as Borobudur, Ulun Danu, Mount Merapi, Prambanan, Monas,
                  Kota Tua, Jam Gadang, Toraja, and Honai, each embedded with
                  real vocational student works from SMK and polytechnic
                  institutions. This game was showcased at a national game event
                  and received widespread appreciation for its cultural depth
                  and interactive educational concept.
                </p>
                <button
                  className="toggle-description text-primary text-sm font-semibold hover:underline focus:outline-none"
                  data-state="short"
                >
                  See All →
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className="px-3 py-1 bg-secondary rounded-full text-xs text-primary"
                  >Unity</span
                >
                <span
                  className="px-3 py-1 bg-secondary rounded-full text-xs text-primary"
                  >Virtual Reality</span
                >
              </div>
              <button
                onclick="openModal('modal-mahakarya')"
                className="text-primary text-sm font-semibold hover:underline focus:outline-none"
              >
                View Documentation →
              </button>
            </div>
          </div>
          <div id="modal-mahakarya" className="modal">
            <div className="modal-content">
              <span className="modal-close" onclick="closeModal('modal-mahakarya')"
                ><i className="fas fa-times"></i
              ></span>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/jSHufoJGI6M?si=mGTpjsrRfMUCtcXQ"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <div
            className="project-card bg-dark rounded-xl overflow-hidden shadow-lg transition duration-500"
            data-images='[
              "images/riau1.png",
              "images/riau2.png",
              "images/riau3.png"
            ]'
          >
            <div className="project-slider">
              <div className="project-gallery" id="gallery-battle-of-riau">
                <img loading="lazy" src="images/riau1.png" alt="Battle of Riau Screenshot 1" />
                <img loading="lazy" src="images/riau2.png" alt="Battle of Riau Screenshot 2" />
                <img loading="lazy" src="images/riau3.png" alt="Battle of Riau Screenshot 3" />
              </div>
              <div className="slider-nav">
                <button className="prev-btn" data-gallery="gallery-battle-of-riau">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="next-btn" data-gallery="gallery-battle-of-riau">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Game VR Battle of Riau</h3>
              <div className="project-description">
                <p className="text-gray-400 mb-4 short-description"></p>
                <p className="text-gray-400 mb-4 full-description hidden">
                  Contributed as an environment and gameplay systems developer
                  for a historical VR FPS game built using Unity and Oculus. The
                  game reenacts the 1784 war between the Riau-Lingga Kingdom and
                  Dutch forces. I designed immersive 3D environments
                  representing Malay coastal territories, programmed NPCs
                  onboard enemy ships, and implemented a dynamic difficulty
                  adjustment (DDA) system based on real-time player performance
                  (score-driven scaling). This game was showcased at a national
                  game exhibition and received appreciation for its historical
                  narrative and gameplay innovation.
                </p>
                <button
                  className="toggle-description text-primary text-sm font-semibold hover:underline focus:outline-none"
                  data-state="short"
                >
                  See All →
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className="px-3 py-1 bg-secondary rounded-full text-xs text-primary"
                  >Unity</span
                >
                <span
                  className="px-3 py-1 bg-secondary rounded-full text-xs text-primary"
                  >Virtual Reality</span
                >
              </div>
              <button
                onclick="openModal('modal-battle-of-riau')"
                className="text-primary text-sm font-semibold hover:underline focus:outline-none"
              >
                View Documentation →
              </button>
            </div>
          </div>
          <div id="modal-battle-of-riau" className="modal">
            <div className="modal-content">
              <span
                className="modal-close"
                onclick="closeModal('modal-battle-of-riau')"
                ><i className="fas fa-times"></i
              ></span>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/ei0mxm1s3yg?si=6IBgRWKWWSsouQ7x"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <div
            className="project-card bg-dark rounded-xl overflow-hidden shadow-lg transition duration-500"
            data-images='[
              "images/little1.jpg",
              "images/little2.jpg",
              "images/little3.jpg"
            ]'
          >
            <div className="project-slider">
              <div className="project-gallery" id="gallery-little-witch">
                <img loading="lazy" src="images/little1.jpg" alt="Little Witch Screenshot 1" />
                <img loading="lazy" src="images/little2.jpg" alt="Little Witch Screenshot 2" />
                <img loading="lazy" src="images/little3.jpg" alt="Little Witch Screenshot 3" />
              </div>
              <div className="slider-nav">
                <button className="prev-btn" data-gallery="gallery-little-witch">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="next-btn" data-gallery="gallery-little-witch">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">
                Game Little Witch: The Wanderer
              </h3>
              <div className="project-description">
                <p className="text-gray-400 mb-4 short-description"></p>
                <p className="text-gray-400 mb-4 full-description hidden">
                  A side-scrolling adventure game inspired by Space Impact,
                  featuring 3D assets and a magical witch theme. The game
                  includes 15 levels with progressive difficulty and a character
                  selection system. I contributed as a game programmer,
                  developing key mechanics such as level-locking logic, enemy
                  movement and shooting behavior, and integrating a custom
                  Arduino-based joystick controller. The project showcases both
                  gameplay balance and hardware interaction.
                </p>
                <button
                  className="toggle-description text-primary text-sm font-semibold hover:underline focus:outline-none"
                  data-state="short"
                >
                  See All →
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className="px-3 py-1 bg-secondary rounded-full text-xs text-primary"
                  >Unity</span
                >
                <span
                  className="px-3 py-1 bg-secondary rounded-full text-xs text-primary"
                  >3D</span
                >
                <span
                  className="px-3 py-1 bg-secondary rounded-full text-xs text-primary"
                  >Arduino Controller</span
                >
              </div>
              <button
                onclick="openModal('modal-little-witch')"
                className="text-primary text-sm font-semibold hover:underline focus:outline-none"
              >
                View Documentation →
              </button>
            </div>
          </div>
          <div id="modal-little-witch" className="modal">
            <div className="modal-content">
              <span
                className="modal-close"
                onclick="closeModal('modal-little-witch')"
                ><i className="fas fa-times"></i
              ></span>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/Bu-Tcuuw-yU?si=gvdlVxFzqDCSv3oL"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <div
            className="project-card bg-dark rounded-xl overflow-hidden shadow-lg transition duration-500"
            data-images='[
              "images/sumitomo1.png",
              "images/sumitomo2.png",
              "images/sumitomo3.jpg"
            ]'
          >
            <div className="project-slider">
              <div className="project-gallery" id="gallery-bike-simulator">
                <img loading="lazy"
                  src="images/sumitomo1.png"
                  alt="Bike Simulator Screenshot 1"
                />
                <img loading="lazy"
                  src="images/sumitomo2.png"
                  alt="Bike Simulator Screenshot 2"
                />
                <img loading="lazy"
                  src="images/sumitomo3.jpg"
                  alt="Bike Simulator Screenshot 3"
                />
              </div>
              <div className="slider-nav">
                <button className="prev-btn" data-gallery="gallery-bike-simulator">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="next-btn" data-gallery="gallery-bike-simulator">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Bike Simulator PT. XYZ</h3>
              <div className="project-description">
                <p className="text-gray-400 mb-4 short-description"></p>
                <p className="text-gray-400 mb-4 full-description hidden">
                  A motorcycle driving simulator developed using Unity, designed
                  to provide a realistic riding experience from public roads to
                  the final destination at PT. XYZ. The simulation features
                  traffic systems, dynamic obstacles, and immersive road
                  environments that reflect real-life driving challenges. I
                  served as the game programmer, responsible for implementing
                  traffic NPC movement and logic, motorcycle engine sound
                  system, player scoring mechanics, and full hardware
                  integration using Arduino sensors attached to a real
                  motorcycle frame. The simulator was used for training and
                  received positive feedback for its realism and functionality.
                </p>
                <button
                  className="toggle-description text-primary text-sm font-semibold hover:underline focus:outline-none"
                  data-state="short"
                >
                  See All →
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className="px-3 py-1 bg-secondary rounded-full text-xs text-primary"
                  >Unity</span
                >
                <span
                  className="px-3 py-1 bg-secondary rounded-full text-xs text-primary"
                  >Simulation</span
                >
                <span
                  className="px-3 py-1 bg-secondary rounded-full text-xs text-primary"
                  >Arduino Controller</span
                >
              </div>
              <button
                onclick="openModal('modal-bike-simulator')"
                className="text-primary text-sm font-semibold hover:underline focus:outline-none"
              >
                View Documentation →
              </button>
            </div>
          </div>
          <div id="modal-bike-simulator" className="modal">
            <div className="modal-content">
              <span
                className="modal-close"
                onclick="closeModal('modal-bike-simulator')"
                ><i className="fas fa-times"></i
              ></span>
              <iframe
                src="https://drive.google.com/file/d/1wIdemcbPuNke-AauVveo_epg4kZE0ccP/preview"
                title="Bike Simulator PT. XYZ Video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="gallery" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Game Exhibition <span className="text-primary">Gallery</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 gap-8 justify-items-center">
          <div
            className="gallery-card bg-dark rounded-xl overflow-hidden shadow-lg transition duration-500"
            data-images='[
              "images/background1.jpg",
              "images/background2.jpg",
              "images/background3.jpg"
            ]'
          >
            <div className="gallery-slider">
              <div className="gallery-images" id="gallery-exhibition">
                <img loading="lazy"
                  src="images/background1.jpg"
                  alt="Game Exhibition Photo 1"
                />
                <img loading="lazy"
                  src="images/background2.jpg"
                  alt="Game Exhibition Photo 2"
                />
                <img loading="lazy"
                  src="images/background3.jpg"
                  alt="Game Exhibition Photo 3"
                />
              </div>
              <div className="slider-nav">
                <button className="prev-btn" data-gallery="gallery-exhibition">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="next-btn" data-gallery="gallery-exhibition">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Game Exhibition Moments</h3>
              <p className="text-gray-400 mb-4">
                Captured moments from the INTI Gamecomm & Animation EXPO 2024 at
                Jakarta International EXPO, North Jakarta, showcasing my VR and
                simulation projects with DigiArs Game Development Team
                (2024–2025), featuring interactive setups and visitor
                engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div id="image-modal" className="image-modal">
      <div className="image-modal-content">
        <span className="image-modal-close"><i className="fas fa-times"></i></span>
        <img id="modal-image" src="" alt="Project Image" />
        <div className="image-slider-nav">
          <button id="image-prev-btn" className="prev-btn">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button id="image-next-btn" className="next-btn">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>

    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="text-center p-6 bg-secondary rounded-xl">
            <div className="skill-icon text-5xl mb-4 text-primary">
              <i className="fab fa-unity"></i>
            </div>
            <h3 className="font-semibold mb-2">Unity</h3>
            <p className="text-sm text-gray-400">2+ years</p>
          </div>
          <div className="text-center p-6 bg-secondary rounded-xl">
            <div className="skill-icon text-5xl mb-4 text-primary">
              <i className="fas fa-laptop-code"></i>
            </div>
            <h3 className="font-semibold mb-2">C#</h3>
            <p className="text-sm text-gray-400">2+ years</p>
          </div>
          <div className="text-center p-6 bg-secondary rounded-xl">
            <div className="skill-icon text-5xl mb-4 text-primary">
              <i className="fas fa-cogs"></i>
            </div>
            <h3 className="font-semibold mb-2">Embedded Systems Integration</h3>
            <p className="text-sm text-gray-400">1+ years</p>
          </div>
          <div className="text-center p-6 bg-secondary rounded-xl">
            <div className="skill-icon text-5xl mb-4 text-primary">
              <i className="fas fa-users"></i>
            </div>
            <h3 className="font-semibold mb-2">Teamwork</h3>
            <p className="text-sm text-gray-400">Collaboration</p>
          </div>
          <div className="text-center p-6 bg-secondary rounded-xl">
            <div className="skill-icon text-5xl mb-4 text-primary">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3 className="font-semibold mb-2">Problem Solving</h3>
            <p className="text-sm text-gray-400">Creative</p>
          </div>
          <div className="text-center p-6 bg-secondary rounded-xl">
            <div className="skill-icon text-5xl mb-4 text-primary">
              <i className="fas fa-clock"></i>
            </div>
            <h3 className="font-semibold mb-2">Time Management</h3>
            <p className="text-sm text-gray-400">Effective</p>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="max-w-2xl mx-auto bg-dark rounded-xl p-8 shadow-lg">
          <form id="contact-form">
            
            <input type="text" name="website" id="website" style={{position: 'absolute', left: '-9999px', opacity: '0', height: '0', width: '0'}} tabindex="-1" autocomplete="off" />
            
            
            <div id="form-step-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-secondary border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-400 mb-2"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-secondary border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block mb-2 text-gray-400"
                >Subject</label
              >
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-3 bg-secondary border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Subject"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-gray-400"
                >Message</label
              >
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full px-4 py-3 bg-secondary border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Send me a message..."
                required
              ></textarea>
            </div>
            <div id="form-message" className="text-center mb-4"></div>
            <button
              type="submit"
              className="w-full bg-primary text-dark font-semibold py-3 rounded-lg hover:bg-primary/90 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark"
            >
              Send Message
            </button>
            </div>

            
            <div id="form-step-2" className="hidden">
              <div className="text-center mb-6">
                <i className="fas fa-envelope-open-text text-4xl text-primary mb-4"></i>
                <h3 className="text-xl font-bold mb-2">Verify Your Email</h3>
                <p className="text-gray-400 text-sm">We've sent a 6-digit code to <span id="verify-email-display" className="text-primary font-semibold"></span>.<br />Please enter it below to confirm your message.</p>
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  id="otp-code"
                  name="otp"
                  maxlength="6"
                  className="w-full px-4 py-3 bg-secondary border border-gray-700 rounded-lg text-center text-2xl tracking-[0.5em] font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="------"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  id="btn-back"
                  className="w-1/3 bg-transparent border border-gray-600 text-gray-300 font-semibold py-3 rounded-lg hover:bg-secondary transition focus:outline-none"
                >
                  Back
                </button>
                <button
                  type="button"
                  id="btn-verify"
                  className="w-2/3 bg-primary text-dark font-semibold py-3 rounded-lg hover:bg-primary/90 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark"
                >
                  Verify & Send
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </section>

    <footer className="py-8 bg-dark">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-primary rounded-full"></div>
            <span
              className="text-lg font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent"
              >Cikal Chievo Portfolio</span
            >
          </div>
          <div className="flex space-x-6">
            <a
              href="https://www.linkedin.com/in/cikal-chievo-arment-86956b1a2/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-primary transition skill-icon"
              aria-label="LinkedIn Profile"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a
              href="https://github.com/cikalchievoart"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-primary transition skill-icon"
              aria-label="GitHub Profile"
            >
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a
              href="https://www.instagram.com/cikalchievo.art/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-primary transition skill-icon"
              aria-label="Instagram Profile"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-gray-400 text-sm">
          © 2025 Cikal Chievo Arment. All rights reserved.
        </div>
      </div>
    </footer>
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
