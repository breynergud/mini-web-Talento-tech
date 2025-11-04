// Función para mostrar el formulario de inscripción
function showRegistrationForm(bootcampId) {
    const form = document.getElementById(`form-${bootcampId}`);
    if (form) {
        form.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }
}

// Función para ocultar el formulario de inscripción
function hideRegistrationForm(bootcampId) {
    const form = document.getElementById(`form-${bootcampId}`);
    if (form) {
        form.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
    }
}

// Función para enviar la inscripción
function submitRegistration(event, bootcampId) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validar que se aceptaron los términos
    if (!data.terminos) {
        alert('Debes aceptar los términos y condiciones para continuar.');
        return;
    }
    
    // Simular envío de datos
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Mostrar estado de carga
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    // Simular proceso de envío
    setTimeout(() => {
        // Mostrar mensaje de éxito
        showSuccessMessage(bootcampId, data);
        
        // Resetear formulario
        form.reset();
        
        // Restaurar botón
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Cerrar formulario después de 3 segundos
        setTimeout(() => {
            hideRegistrationForm(bootcampId);
        }, 3000);
        
    }, 2000);
}

// Función para mostrar mensaje de éxito
function showSuccessMessage(bootcampId, data) {
    const bootcampNames = {
        'fullstack': 'Desarrollo Web Full Stack',
        'datascience': 'Ciencia de Datos',
        'cybersecurity': 'Ciberseguridad',
        'marketing': 'Marketing Digital'
    };
    
    const message = `
        <div class="success-message show">
            <h4><i class="fas fa-check-circle"></i> ¡Inscripción Exitosa!</h4>
            <p>Hola <strong>${data.nombre}</strong>, tu inscripción al bootcamp de <strong>${bootcampNames[bootcampId]}</strong> ha sido recibida exitosamente.</p>
            <p>Te contactaremos pronto al <strong>${data.telefono}</strong> y al correo <strong>${data.email}</strong>.</p>
            <p><small>También puedes visitar <a href="https://talentotech.gov.co" target="_blank" style="color: white; text-decoration: underline;">talentotech.gov.co</a> para más información.</small></p>
        </div>
    `;
    
    const form = document.getElementById(`form-${bootcampId}`);
    const formContent = form.querySelector('.bootcamp-form');
    formContent.insertAdjacentHTML('afterbegin', message);
}

// Función para mostrar detalles del bootcamp
function showBootcampDetail(bootcampId) {
    // Ocultar la sección de overview
    const overviewSection = document.querySelector('.bootcamps-overview');
    overviewSection.style.display = 'none';
    
    // Ocultar todos los detalles
    const allDetails = document.querySelectorAll('.bootcamp-detail');
    allDetails.forEach(detail => detail.style.display = 'none');
    
    // Mostrar el detalle específico
    const targetDetail = document.getElementById(bootcampId);
    if (targetDetail) {
        targetDetail.style.display = 'block';
        
        // Scroll suave hacia la sección de detalles
        document.querySelector('.bootcamp-details').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Función para ocultar detalles del bootcamp y volver al overview
function hideBootcampDetail() {
    // Ocultar todos los detalles
    const allDetails = document.querySelectorAll('.bootcamp-detail');
    allDetails.forEach(detail => detail.style.display = 'none');
    
    // Mostrar la sección de overview
    const overviewSection = document.querySelector('.bootcamps-overview');
    overviewSection.style.display = 'block';
    
    // Scroll suave hacia la sección de bootcamps
    overviewSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Navegación suave
function smoothScroll(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Configurar navegación suave para los enlaces del navbar
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScroll(targetId);
        });
    });
    
    // Configurar navegación suave para los botones del hero
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScroll(targetId);
        });
    });
    
    // Configurar clics en las tarjetas de bootcamp
    const bootcampCards = document.querySelectorAll('.bootcamp-card');
    bootcampCards.forEach(card => {
        card.addEventListener('click', function() {
            const bootcampId = this.getAttribute('data-bootcamp');
            showBootcampDetail(bootcampId);
        });
    });
    
    // Animaciones de entrada para las tarjetas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar animaciones iniciales
    bootcampCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animaciones para las tarjetas de contacto
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Efecto parallax sutil para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Cambiar estilo del navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'var(--white)';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // Cerrar formularios al hacer clic fuera de ellos
    document.addEventListener('click', function(event) {
        const forms = document.querySelectorAll('.registration-form');
        forms.forEach(form => {
            if (form.style.display === 'flex' && event.target === form) {
                const bootcampId = form.id.replace('form-', '');
                hideRegistrationForm(bootcampId);
            }
        });
    });
    
    // Cerrar formularios con la tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const forms = document.querySelectorAll('.registration-form');
            forms.forEach(form => {
                if (form.style.display === 'flex') {
                    const bootcampId = form.id.replace('form-', '');
                    hideRegistrationForm(bootcampId);
                }
            });
        }
    });
});