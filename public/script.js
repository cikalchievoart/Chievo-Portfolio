// Make modal functions globally accessible
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.style.display = "none";
  document.body.style.overflow = "auto";
  const iframe = modal.querySelector("iframe");
  if (iframe) {
    const src = iframe.src;
    iframe.src = ""; // Stop video playback
    iframe.src = src; // Restore src for next open
  }
}

(function () {


  // Particle effect for home section
  const canvas = document.getElementById("particle-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = `rgba(17, 243, 211, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const particleCount = Math.floor(
        (canvas.width * canvas.height) / 10000
      );
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    initParticles();
    animate();
  }

  // Navigation active state and scroll handling
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  function updateActiveNav() {
    let currentSection = "";
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  // Smooth scroll with animation for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        setTimeout(updateActiveNav, 600);
        // Close mobile menu if open
        const mobileMenu = document.getElementById("mobile-menu");
        if (mobileMenu.classList.contains("active")) {
          toggleMobileMenu();
        }
      }
    });
  });

  // Smooth scroll for View Projects and Contact Me buttons
  const viewProjectsBtn = document.querySelector(".view-projects");
  const contactMeBtn = document.querySelector(".contact-me");

  if (viewProjectsBtn) {
    viewProjectsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = document.getElementById("projects");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        setTimeout(updateActiveNav, 600);
      }
    });
  }

  if (contactMeBtn) {
    contactMeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = document.getElementById("contact");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        setTimeout(updateActiveNav, 600);
      }
    });
  }

  // Update active nav on scroll
  window.addEventListener("scroll", updateActiveNav);

  // Initial update on page load
  updateActiveNav();

  // Mobile menu toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileClose = document.getElementById("mobile-close");
  const mobileMenu = document.getElementById("mobile-menu");

  function toggleMobileMenu() {
    if (mobileMenu.classList.contains("active")) {
      mobileMenu.classList.add("closing");
      setTimeout(() => {
        mobileMenu.classList.remove("active", "closing");
      }, 300);
      mobileToggle.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
      document.body.style.overflow = "auto";
    } else {
      mobileMenu.classList.add("active");
      mobileToggle.innerHTML = '<i class="fas fa-times text-2xl"></i>';
      document.body.style.overflow = "hidden";
    }
  }

  mobileToggle.addEventListener("click", toggleMobileMenu);
  mobileClose.addEventListener("click", toggleMobileMenu);

  // Store slider states
  const sliderStates = new Map();

  // Image Modal variables
  let currentImageIndex = 0;
  let currentImageUrls = [];
  let currentGalleryId = null;

  function openImageModal(galleryId, imageUrls, initialIndex = 0) {
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");

    if (!modal || !modalImage) return;

    currentImageUrls = imageUrls;
    currentImageIndex = initialIndex;
    currentGalleryId = galleryId;

    modalImage.src = imageUrls[currentImageIndex];
    modalImage.alt = `Project Image ${currentImageIndex + 1}`;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    updateImageModalButtons();
  }

  function closeImageModal() {
    const modal = document.getElementById("image-modal");
    if (!modal) return;

    modal.style.display = "none";
    document.body.style.overflow = "auto";

    if (currentGalleryId) {
      updateSliderButtons(currentGalleryId);
    }

    currentImageIndex = 0;
    currentImageUrls = [];
    currentGalleryId = null;
  }

  function updateImageModalButtons() {
    const prevBtn = document.getElementById("image-prev-btn");
    const nextBtn = document.getElementById("image-next-btn");

    if (prevBtn) prevBtn.disabled = currentImageIndex === 0;
    if (nextBtn)
      nextBtn.disabled =
        currentImageIndex === currentImageUrls.length - 1;
  }

  function prevImageModal() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      const modalImage = document.getElementById("modal-image");
      if (modalImage) {
        modalImage.src = currentImageUrls[currentImageIndex];
        modalImage.alt = `Project Image ${currentImageIndex + 1}`;
        updateImageModalButtons();
        updateGalleryPosition(currentGalleryId, currentImageIndex);
      }
    }
  }

  function nextImageModal() {
    if (currentImageIndex < currentImageUrls.length - 1) {
      currentImageIndex++;
      const modalImage = document.getElementById("modal-image");
      if (modalImage) {
        modalImage.src = currentImageUrls[currentImageIndex];
        modalImage.alt = `Project Image ${currentImageIndex + 1}`;
        updateImageModalButtons();
        updateGalleryPosition(currentGalleryId, currentImageIndex);
      }
    }
  }

  function updateGalleryPosition(galleryId, index) {
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;

    gallery.style.transform = `translateX(-${index * 100}%)`;
    updateSliderButtons(galleryId);
  }

  function updateSliderButtons(galleryId) {
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;

    const images = gallery.querySelectorAll("img");
    const prevBtn = gallery.parentElement.querySelector(".prev-btn");
    const nextBtn = gallery.parentElement.querySelector(".next-btn");

    const currentIndex = sliderStates.get(galleryId) || 0;

    images.forEach((img, index) => {
      img.classList.toggle("active", index === currentIndex);
    });

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === images.length - 1;
  }

  function prevImage(galleryId) {
    let currentIndex = sliderStates.get(galleryId) || 0;
    if (currentIndex > 0) {
      currentIndex--;
      sliderStates.set(galleryId, currentIndex);
      updateGalleryPosition(galleryId, currentIndex);
    }
  }

  function nextImage(galleryId) {
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;

    const images = gallery.querySelectorAll("img");
    let currentIndex = sliderStates.get(galleryId) || 0;
    if (currentIndex < images.length - 1) {
      currentIndex++;
      sliderStates.set(galleryId, currentIndex);
      updateGalleryPosition(galleryId, currentIndex);
    }
  }

  // Function to truncate text to a specified number of words
  function truncateText(text, wordLimit) {
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  }

  function initPage() {
    // Initialize description toggle for project cards
    document.querySelectorAll(".project-card").forEach((card) => {
      const fullDescription = card.querySelector(".full-description");
      const shortDescription = card.querySelector(".short-description");
      const toggleButton = card.querySelector(".toggle-description");

      if (fullDescription && shortDescription && toggleButton) {
        shortDescription.textContent = truncateText(
          fullDescription.textContent,
          20
        );

        toggleButton.addEventListener("click", () => {
          const isShort =
            toggleButton.getAttribute("data-state") === "short";
          if (isShort) {
            shortDescription.classList.add("hidden");
            fullDescription.classList.remove("hidden");
            toggleButton.setAttribute("data-state", "full");
            toggleButton.textContent = "See Less ↑";
          } else {
            shortDescription.classList.remove("hidden");
            fullDescription.classList.add("hidden");
            toggleButton.setAttribute("data-state", "short");
            toggleButton.textContent = "See All →";
          }
        });
      }

      // Slider and modal logic for project cards
      const gallery = card.querySelector(".project-gallery");
      if (!gallery) return;

      const galleryId = gallery.id;
      sliderStates.set(galleryId, 0);
      gallery.style.transform = "translateX(0%)";
      updateSliderButtons(galleryId);

      const imageUrls = JSON.parse(card.dataset.images || "[]");

      gallery.querySelectorAll("img").forEach((img, index) => {
        img.addEventListener("click", () => {
          sliderStates.set(galleryId, index);
          updateSliderButtons(galleryId);
          openImageModal(galleryId, imageUrls, index);
        });
      });

      const prevBtn = card.querySelector(".prev-btn");
      if (prevBtn) {
        prevBtn.addEventListener("click", () => prevImage(galleryId));
      }

      const nextBtn = card.querySelector(".next-btn");
      if (nextBtn) {
        nextBtn.addEventListener("click", () => nextImage(galleryId));
      }
    });

    // Slider and modal logic for gallery cards
    document.querySelectorAll(".gallery-card").forEach((card) => {
      const gallery = card.querySelector(".gallery-images");
      if (!gallery) return;

      const galleryId = gallery.id;
      sliderStates.set(galleryId, 0);
      gallery.style.transform = "translateX(0%)";
      updateSliderButtons(galleryId);

      const imageUrls = JSON.parse(card.dataset.images || "[]");

      gallery.querySelectorAll("img").forEach((img, index) => {
        img.addEventListener("click", () => {
          sliderStates.set(galleryId, index);
          updateSliderButtons(galleryId);
          openImageModal(galleryId, imageUrls, index);
        });
      });

      const prevBtn = card.querySelector(".prev-btn");
      if (prevBtn) {
        prevBtn.addEventListener("click", () => prevImage(galleryId));
      }

      const nextBtn = card.querySelector(".next-btn");
      if (nextBtn) {
        nextBtn.addEventListener("click", () => nextImage(galleryId));
      }
    });

    document.querySelectorAll(".modal").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal(modal.id);
        }
      });
    });

    const imageModal = document.getElementById("image-modal");
    if (imageModal) {
      imageModal.addEventListener("click", (e) => {
        if (e.target === imageModal) {
          closeImageModal();
        }
      });

      const modalImage = document.getElementById("modal-image");
      if (modalImage) {
        modalImage.addEventListener("click", () => {
          nextImageModal();
        });
      }
    }

    const imageModalClose = document.querySelector(".image-modal-close");
    if (imageModalClose) {
      imageModalClose.addEventListener("click", closeImageModal);
    }

    const imagePrevBtn = document.getElementById("image-prev-btn");
    if (imagePrevBtn) {
      imagePrevBtn.addEventListener("click", prevImageModal);
    }

    const imageNextBtn = document.getElementById("image-next-btn");
    if (imageNextBtn) {
      imageNextBtn.addEventListener("click", () => nextImageModal());
    }

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      const step1 = document.getElementById("form-step-1");
      const step2 = document.getElementById("form-step-2");
      const btnVerify = document.getElementById("btn-verify");
      const btnBack = document.getElementById("btn-back");
      const formMessage = document.getElementById("form-message");
      const emailDisplay = document.getElementById("verify-email-display");
      const otpInput = document.getElementById("otp-code");

      let currentEmail = "";

      contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!formMessage) return;

        formMessage.textContent = "Sending code...";
        formMessage.className = "text-center mb-4 text-primary";

        const formData = {
          action: "send-otp",
          name: this.querySelector('#name').value,
          email: this.querySelector('#email').value,
          subject: this.querySelector('#subject').value,
          message: this.querySelector('#message').value,
          website: this.querySelector('#website').value, // honeypot
        };

        currentEmail = formData.email;

        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              formMessage.textContent = "";
              step1.classList.add("hidden");
              step2.classList.remove("hidden");
              emailDisplay.textContent = currentEmail;
              otpInput.value = "";
              otpInput.focus();
            } else {
              formMessage.textContent = data.error || "Failed to send code. Please try again.";
              formMessage.className = "text-center mb-4 text-red-400";
            }
          })
          .catch((error) => {
            formMessage.textContent = "Failed to send code. Please try again.";
            formMessage.className = "text-center mb-4 text-red-400";
            console.error("Contact form error:", error);
          });
      });

      btnBack.addEventListener("click", () => {
        step2.classList.add("hidden");
        step1.classList.remove("hidden");
        formMessage.textContent = "";
      });

      btnVerify.addEventListener("click", () => {
        const otp = otpInput.value;
        if (!otp || otp.length !== 6) {
          formMessage.textContent = "Please enter a valid 6-digit code.";
          formMessage.className = "text-center mb-4 text-red-400";
          return;
        }

        formMessage.textContent = "Verifying and sending...";
        formMessage.className = "text-center mb-4 text-primary";

        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: "verify-otp", email: currentEmail, otp }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              formMessage.textContent = "Message sent successfully!";
              formMessage.className = "text-center mb-4 text-green-400";
              contactForm.reset();
              setTimeout(() => {
                step2.classList.add("hidden");
                step1.classList.remove("hidden");
                formMessage.textContent = "";
              }, 3000);
            } else {
              formMessage.textContent = data.error || "Verification failed.";
              formMessage.className = "text-center mb-4 text-red-400";
            }
          })
          .catch((error) => {
            formMessage.textContent = "Failed to verify. Please try again.";
            formMessage.className = "text-center mb-4 text-red-400";
            console.error("Verification error:", error);
          });
      });
    }

    const modalImage = document.getElementById("modal-image");
    if (modalImage) {
      modalImage.addEventListener("error", () => {
        console.error("Failed to load image:", modalImage.src);
        modalImage.src = "";
        modalImage.alt = "Image failed to load";
      });
    }
  }

  // Run immediately if DOM is ready, otherwise wait
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
  } else {
    initPage();
  }
})();
