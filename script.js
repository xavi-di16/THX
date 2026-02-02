// ==========================================
// CONFIGURACIÓN
// ==========================================
// ¡IMPORTANTE! Reemplaza este número por el tuyo real
const WHATSAPP_NUMBER = "5491112345678"; 

// ==========================================
// FUNCIONES DE COMPRA
// ==========================================

function buyProduct(flavorName) {
    // Mensaje pre-armado
    const message = `Hola! Quiero comprar el Torch 7.5G sabor ${flavorName}. ¿Tienen stock?`;
    
    // Crear el link de WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Abrir en nueva pestaña
    window.open(whatsappUrl, '_blank');
}

// ==========================================
// ANIMACIONES VISUALES
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // Animación escalonada de las tarjetas al cargar
    const cards = document.querySelectorAll('.product-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Retraso en cascada
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        // Estado inicial para animación CSS
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});