// ==========================================
// CONFIGURACIÓN
// ==========================================
// ¡IMPORTANTE! Reemplaza este número por el tuyo real
const WHATSAPP_NUMBER = "5491112345678"; 
const INITIAL_GREETING = "Qué onda? Soy Toallín, tu técnico fumón. ¿Qué cagada te mandaste con el Torch o qué querés saber?";
const INITIAL_IMAGE = "toallin-saludo.png"; // Nombre exacto de tu archivo

// Base de datos de respuestas (Verificado con tu lista de archivos)
const responsesData = {
    duration: {
        text: "Escuchame bien, pedazo de... Si fumás tranqui, 3 o 4 veces por día, esta mierda te dura UN MES. Son 7.5g, no te lo bajes en una hora, manija.",
        image: "toallin-duracion.png" 
    },
    potency: {
        text: "¿No te pega? ¡No me jodas! Tenés que darle como 10 caladas seguidas para que arranque el sistema. ¡Bancátela hasta que explote la cabeza!",
        image: "toallin-caladas.png" 
    },
    genetics: {
        text: "Es Sativa pura, papá. Equivale casi a 80g de flores compactadas en tu bolsillo. Te deja re activo para laburar o boludear. ¡Pura energía!",
        image: "toallin-80G.png"
    }
};

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Delay inicial pequeño para que parezca que carga
    setTimeout(() => {
        botReply(INITIAL_GREETING, INITIAL_IMAGE);
    }, 500);
});


// ==========================================
// FUNCIONES PRINCIPALES
// ==========================================

/**
 * Maneja los clics en las preguntas frecuentes
 */
function askTowelie(topic) {
    const data = responsesData[topic];
    if (!data) return;

    // 1. Mostrar mensaje del usuario
    let userText = document.querySelector(`button[onclick="askTowelie('${topic}')"]`).innerText;
    addUserMessage(userText);

    // 2. Simular "escribiendo" y responder
    showTypingIndicator();
    setTimeout(() => {
        hideTypingIndicator();
        botReply(data.text, data.image);
    }, 1000 + Math.random() * 500); // Delay aleatorio entre 1s y 1.5s
}


/**
 * NUEVA FUNCIÓN: Maneja el flujo final de WhatsApp
 */
function startWhatsappFlow() {
    const controlsArea = document.getElementById("controlsArea");
    
    // 1. Deshabilitar controles para evitar múltiples clics
    controlsArea.classList.add("controls-disabled");

    // 2. Mensaje del usuario
    addUserMessage("QUIERO COMPRAR YA, BOLUDO");

    // 3. Secuencia de respuesta de Toallín y redirección
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        // Respuesta final de texto
        botReply("¡Ah, por fin te decidiste! Dale click ahora sí y dejate de joder. ¡Preparate para volar!");
        
        setTimeout(() => {
            // Respuesta final con imagen (usamos la de whatsapp señalando)
            botReply(null, "toallin-whatsap.png");

            // REDIRECCIÓN FINAL DESPUÉS DE MOSTRAR LA IMAGEN
            setTimeout(() => {
               window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola Toallín, quiero pegar un Torch ya mismo.`;
            }, 2500); // Espera 2.5s para que vea la imagen y luego redirige

        }, 800); // Pequeña pausa entre el texto y la imagen final

    }, 1000);
}


// ==========================================
// FUNCIONES DE UTILIDAD (UI)
// ==========================================

function addUserMessage(text) {
    const chatArea = document.getElementById("chatArea");
    const bubble = document.createElement("div");
    bubble.classList.add("message-bubble", "user-msg");
    bubble.innerText = text;
    chatArea.appendChild(bubble);
    scrollToBottom();
}

function botReply(text, imageName = null) {
    const chatArea = document.getElementById("chatArea");
    
    // Si hay texto, crear burbuja de texto
    if (text) {
        const textBubble = document.createElement("div");
        textBubble.classList.add("message-bubble", "bot-msg");
        textBubble.innerText = text;
        chatArea.appendChild(textBubble);
    }

    // Si hay imagen, crear burbuja de imagen (puede ir sola o después del texto)
    if (imageName) {
        const imgBubble = document.createElement("div");
        imgBubble.classList.add("message-bubble", "bot-msg");
        
        const imgElement = document.createElement("img");
        imgElement.src = imageName;
        imgElement.classList.add("chat-media-img");
        
        imgBubble.appendChild(imgElement);
        chatArea.appendChild(imgBubble);
    }
    scrollToBottom();
}

function scrollToBottom() {
    const chatArea = document.getElementById("chatArea");
    chatArea.scrollTop = chatArea.scrollHeight;
}

// Indicador de "Escribiendo..." (Opcional, simple)
function showTypingIndicator() {
    const chatArea = document.getElementById("chatArea");
    const typingBubble = document.createElement("div");
    typingBubble.id = "typing-indicator";
    typingBubble.classList.add("message-bubble", "bot-msg");
    typingBubble.innerText = "Escribiendo...";
    typingBubble.style.opacity = "0.7";
    typingBubble.style.fontStyle = "italic";
    chatArea.appendChild(typingBubble);
    scrollToBottom();
}

function hideTypingIndicator() {
    const typingBubble = document.getElementById("typing-indicator");
    if (typingBubble) typingBubble.remove();
}