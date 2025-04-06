function showResults() {
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
}

// Mobile Navigation
const menuButton = document.getElementById('menuButton');
const closeMenu = document.getElementById('closeMenu');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuButton.addEventListener('click', () => {
    mobileNav.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

function closeNavMenu() {
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeMenu.addEventListener('click', closeNavMenu);
overlay.addEventListener('click', closeNavMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeNavMenu();
        
        // Small delay to allow the menu to close before scrolling
        setTimeout(() => {
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    });
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.add('active');
            document.querySelector('.mobile-nav-links a[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.remove('active');
            document.querySelector('.mobile-nav-links a[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Global variable to store the uploaded file
let uploadedFile = null;

// Set up the file upload area
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    
    if (!uploadArea) return;
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('active');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('active');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('active');
        
        if (e.dataTransfer.files.length) {
            uploadedFile = e.dataTransfer.files[0];
            showPreview(uploadedFile);
        }
    });
    
    // Click to upload
    uploadArea.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            if (e.target.files.length) {
                uploadedFile = e.target.files[0];
                showPreview(uploadedFile);
            }
        };
        input.click();
    });
});

function showPreview(file) {
    const reader = new FileReader();
    const uploadArea = document.getElementById('uploadArea');
    
    reader.onload = (e) => {
        uploadArea.innerHTML = `
            <img src="${e.target.result}" alt="Preview" style="max-width: 100%; max-height: 300px;">
            <p>Click to change image</p>
        `;
    };
    
    reader.readAsDataURL(file);
}

// Replace your existing showResults function with this one
function showResults() {
    const resultsSection = document.getElementById('resultsSection');
    
    if (!uploadedFile) {
        alert('Please upload an image first');
        return;
    }
    
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const defectArea = document.getElementById('defectArea').value;
    const year = document.getElementById('year').value;
    
    if (!make || !model || !defectArea || !year) {
        alert('Please fill out all vehicle details');
        return;
    }
    
    // Create form data
    const formData = new FormData();
    formData.append('image', uploadedFile);
    formData.append('make', make);
    formData.append('model', model);
    formData.append('defectArea', defectArea);
    formData.append('year', year);
    
    // Show loading state
    resultsSection.innerHTML = `
        <div class="section-title">
            <h2>Analyzing Defect...</h2>
            <p>Please wait while our AI processes your image</p>
        </div>
        <div style="text-align: center; padding: 50px;">
            <div class="loader"></div>
        </div>
    `;
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
    
    // Send to backend API
    fetch('/api/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayResults(data, make, model, defectArea, year);
    })
    .catch(error => {
        console.error('Error:', error);
        resultsSection.innerHTML = `
            <div class="section-title">
                <h2>Analysis Error</h2>
                <p>There was a problem analyzing your image. Please try again.</p>
            </div>
        `;
    });
}

function displayResults(data, make, model, defectArea, year) {
    const resultsSection = document.getElementById('resultsSection');
    const severityClass = `severity-${data.severity.toLowerCase()}`;
    
    resultsSection.innerHTML = `
        <div class="section-title">
            <h2>Defect Analysis Results</h2>
            <p>Our AI has analyzed your vehicle's condition</p>
        </div>
        
        <div class="results-container">
            <div class="result-header">
                <span class="severity-badge ${severityClass}">${data.severity} SEVERITY</span>
            </div>
            
            <div class="defect-details">
                <div class="detail-item">
                    <span class="detail-label">Vehicle:</span>
                    <span>${make} ${model} (${year})</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Defect Area:</span>
                    <span>${defectArea}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Severity Level:</span>
                    <span><strong>${data.severity}</strong> - ${data.recommendations}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Severity Scale:</span>
                    <div style="display: flex; margin-top: 0.5rem;">
                        <div style="flex: 1; text-align: center; padding: 0.5rem; background-color: #27ae60; color: white; border-radius: 5px 0 0 5px; ${data.severity === 'MINOR' ? 'border: 2px solid black; font-weight: bold;' : ''}">MINOR</div>
                        <div style="flex: 1; text-align: center; padding: 0.5rem; background-color: #f39c12; color: white; ${data.severity === 'MODERATE' ? 'border: 2px solid black; font-weight: bold;' : ''}">MODERATE</div>
                        <div style="flex: 1; text-align: center; padding: 0.5rem; background-color: #c0392b; color: white; border-radius: 0 5px 5px 0; ${data.severity === 'SEVERE' ? 'border: 2px solid black; font-weight: bold;' : ''}">SEVERE</div>
                    </div>
                </div>
            </div>
            
            <div class="repair-estimate">
                <div class="estimate-header">
                    <h3 class="estimate-title">Repair Cost Estimate</h3>
                    <span class="estimate-price">${data.priceEstimate}</span>
                </div>
            </div>
            
            <div class="repair-shops">
                <h3>Recommended Repair Shops Near You</h3>
                
                <div class="shop-cards">
                    <!-- Shop cards from original HTML -->
                    <div class="shop-card">
                        <div class="shop-img">
                            <img src="/api/placeholder/250/150" alt="Auto Service">
                        </div>
                        <div class="shop-content">
                            <h4 class="shop-name">Auto Service</h4>
                            <p class="shop-location">2.3 km away • Vadapalani</p>
                            <div class="shop-rating">★★★★★ (124 reviews)</div>
                            <p>Specializes in ${defectArea.toLowerCase()} repairs with same-day service</p>
                            <a href="#" class="btn" style="width: 100%; margin-top: 1rem;">Book Appointment</a>
                        </div>
                    </div>
                    
                    <!-- More shop cards as in your original HTML -->
                </div>
            </div>
        </div>
    `;
}