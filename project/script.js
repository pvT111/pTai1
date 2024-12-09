// Optimized and Combined Code - Không hình ảnh
class TourManager {
    constructor() {
        this.tours = [];
    }

    getAllTours() { 
        return this.tours; 
    }

    modifyTour(id, updatedTour) {
        const tour = this.tours.find(t => t.id === id);
        if (tour) Object.assign(tour, updatedTour);
        else this.addTour(updatedTour);
        return tour || updatedTour;
    }

    addTour(tour) {
        const newTour = { ...tour, id: this.tours.length + 1 };
        this.tours.push(newTour);
        return newTour;
    }

    deleteTour(id) {
        this.tours = this.tours.filter(tour => tour.id !== id);
    }

    getTourById(id) {
        return this.tours.find(tour => tour.id === id);
    }
}

class UI {
    constructor(tourManager) {
        this.tourManager = tourManager;
        this.elements = this.cacheElements();
        this.setupEventListeners();
        this.displayTours();
    }

    cacheElements() {
        return {
            modal: document.getElementById('tourModal'),
            tourForm: document.getElementById('tourForm'),
            addTourBtn: document.getElementById('addTourBtn'),
            closeBtn: document.getElementsByClassName('close')[0],
            tourTableBody: document.getElementById('tourTableBody')
        };
    }

    setupEventListeners() {
        const { addTourBtn, closeBtn, tourForm, modal } = this.elements;

        addTourBtn.onclick = () => this.showModal();
        closeBtn.onclick = () => this.hideModal();
        tourForm.onsubmit = (e) => this.handleFormSubmit(e);
        window.onclick = (e) => { if (e.target === modal) this.hideModal(); };
    }

    displayTours() {
        const { tourTableBody } = this.elements;
        const tours = this.tourManager.getAllTours();
        
        tourTableBody.innerHTML = tours.map(tour => `
            <tr>
                <td>${tour.id}</td>
                <td>${tour.tourName}</td>
                <td>${tour.destination}</td>
                <td>${tour.duration} days</td>
                <td>$${tour.price}</td>
                <td class="tour-image-cell">
                    <img src="${tour.imageUrl || 'https://via.placeholder.com/150'}" alt="${tour.tourName}" class="tour-thumbnail">
                </td>
                <td class="description-cell">${tour.description}</td>
                <td class="action-buttons">
                    <button class="btn-edit" onclick="window.editTour(${tour.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-delete" onclick="window.deleteTour(${tour.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');
        
    }

    showModal(tour = null) {
        const { modal, tourForm } = this.elements;

        modal.style.display = 'block';
        tourForm.reset();

        if (tour) {
            document.getElementById('tourName').value = tour.tourName;
            document.getElementById('destination').value = tour.destination;
            document.getElementById('duration').value = tour.duration;
            document.getElementById('price').value = tour.price;
            document.getElementById('description').value = tour.description;
            tourForm.dataset.tourId = tour.id;
        } else {
            delete tourForm.dataset.tourId;
        }
    }

    hideModal() {
        const { modal } = this.elements;
        modal.style.display = 'none';
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const tourData = {
            tourName: document.getElementById('tourName').value,
            destination: document.getElementById('destination').value,
            duration: parseInt(document.getElementById('duration').value),
            price: parseFloat(document.getElementById('price').value),
            description: document.getElementById('description').value,
        };

        const tourId = parseInt(this.elements.tourForm.dataset.tourId);

        if (tourId) {
            this.tourManager.modifyTour(tourId, tourData);
        } else {
            this.tourManager.addTour(tourData);
        }

        this.displayTours();
        this.hideModal();
    }
}

const tourManager = new TourManager();
const ui = new UI(tourManager);

// Global Functions
window.editTour = (id) => {
    const tour = tourManager.getTourById(id);
    if (tour) ui.showModal(tour);
};

window.deleteTour = (id) => {
    if (confirm('Are you sure you want to delete this tour?')) {
        tourManager.deleteTour(id);
        ui.displayTours();
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const homeNav = document.getElementById('homeNav');
    const logoutNav = document.getElementById('logoutNav');
    
    if (homeNav) {
        homeNav.addEventListener('click', () => alert('Navigating to Home'));
    }

    if (logoutNav) {
        logoutNav.addEventListener('click', () => alert('Logging out...'));
    }
});