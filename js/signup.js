/**
 * Signup Page Logic
 * Handles plan selection and form validation
 */

document.addEventListener('DOMContentLoaded', function() {
    initSignupPage();
});

function initSignupPage() {
    // Get plan from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan') || 'free';
    
    // Update UI based on plan
    updatePlanUI(plan);
    
    // Setup form validation
    setupFormValidation(plan);
}

function updatePlanUI(plan) {
    const planBadge = document.getElementById('planBadge');
    const planBenefits = document.getElementById('planBenefits');
    const planTypeInput = document.getElementById('planType');
    const submitButton = document.querySelector('.submit-button');
    
    if (plan === 'pro') {
        planBadge.textContent = 'Plano Pro - 14 Dias Grátis';
        planBadge.classList.add('pro');
        planTypeInput.value = 'pro';
        submitButton.textContent = 'Iniciar Teste Pro Grátis';
        
        planBenefits.innerHTML = `
            <li>Usuários ilimitados</li>
            <li>Integração avançada do Discord</li>
            <li>Suporte prioritário</li>
            <li>Analytics avançado</li>
            <li>Gerenciamento personalizado de cargos</li>
            <li>Marca personalizada</li>
            <li>14 dias grátis, depois R$ 29/mês</li>
        `;
    } else {
        planBadge.textContent = 'Plano Grátis';
        planTypeInput.value = 'free';
        submitButton.textContent = 'Criar Conta Gratuitamente';
        
        planBenefits.innerHTML = `
            <li>Até 100 usuários</li>
            <li>Integração básica do Discord</li>
            <li>Suporte padrão</li>
            <li>Analytics básico</li>
            <li>Documentação da comunidade</li>
        `;
    }
}

function setupFormValidation(plan) {
    const form = document.getElementById('signupForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            alert('As senhas não coincidem. Por favor, verifique e tente novamente.');
            return;
        }
        
        // Validate terms acceptance
        if (!terms) {
            alert('Você precisa concordar com os Termos de Serviço e Política de Privacidade.');
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Form submitted with data:', data);
        
            // Track signup conversion
            if (window.Analytics) {
                window.Analytics.trackSignup(plan);
            }
            
            // Show success message
            alert(`Conta ${plan === 'pro' ? 'Pro' : 'Gratuita'} criada com sucesso! Bem-vindo ao DiscordAuth!`);
        
        // Here you would typically send the data to your backend
        // Example:
        // fetch('/api/signup', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     window.location.href = 'dashboard.html';
        // })
        // .catch(error => console.error('Error:', error));
    });
}

