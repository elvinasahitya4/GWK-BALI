"use strict";

// Inisialisasi AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            var navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Custom Scroll Spy implementation with ES5
        document.addEventListener('DOMContentLoaded', function() {
            var navLinks = document.querySelectorAll('.nav-link');
            var sections = document.querySelectorAll('section');
            
            // Function to update active nav link
            function updateActiveNavLink() {
                var currentSection = '';
                var scrollPosition = window.scrollY + 100; // Offset for fixed navbar
                
                for (var i = 0; i < sections.length; i++) {
                    var section = sections[i];
                    var sectionTop = section.offsetTop;
                    var sectionHeight = section.clientHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        currentSection = section.getAttribute('id');
                        break;
                    }
                }
                
                for (var j = 0; j < navLinks.length; j++) {
                    var link = navLinks[j];
                    link.classList.remove('active');
                    
                    if (link.getAttribute('href') === '#' + currentSection) {
                        link.classList.add('active');
                    }
                }
            }
            
            // Update active nav link on scroll
            window.addEventListener('scroll', updateActiveNavLink);
            
            // Update active nav link on page load
            updateActiveNavLink();
            
            // Smooth scrolling for nav links
            for (var k = 0; k < navLinks.length; k++) {
                navLinks[k].addEventListener('click', function(e) {
                    // Only handle links that point to sections
                    if (this.getAttribute('href').charAt(0) === '#') {
                        e.preventDefault();
                        
                        var targetId = this.getAttribute('href');
                        var targetSection = document.querySelector(targetId);
                        
                        if (targetSection) {
                            var offsetTop = targetSection.offsetTop - 80; // Offset for fixed navbar
                            
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            }
        });


// Stats counter animation
function animateCounter(element, target, duration) {
  var start = 0;
  var increment = target / (duration / 16);
  var current = start;
  var timer = setInterval(function() {
    current += increment;
    if (current >= target) {
      clearInterval(timer);
      current = target;
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

document.querySelector('.btn-ticket').addEventListener('click', function() {
  document.querySelector('#profil').scrollIntoView({ 
    behavior: 'smooth' 
  });
});

//Modal event
document.addEventListener('DOMContentLoaded', function() {
  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var tabId = this.getAttribute('data-tab');
            tabBtns.forEach(function(b) {
        b.classList.remove('active');
      });
      tabContents.forEach(function(c) {
        c.classList.remove('active');
      });
            this.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
});

//Modal tiket dan destinasi
document.addEventListener('DOMContentLoaded', function() {
  // Fungsi untuk menghitung total harga
  function calculateTotal() {
    var ticketType = document.querySelector('input[name="ticketType"]:checked');
    var quantity = parseInt(document.getElementById('ticketQuantity').value) || 1;
    
    var price = 125000; 
    
    if (ticketType.id === 'child') {
      price = 100000;
    } else if (ticketType.id === 'student') {
      price = 90000;
    } else if (ticketType.id === 'group') {
      price = 80000;
    }
    
    var total = price * quantity;
    document.getElementById('totalPrice').value = 'Rp ' + total.toLocaleString('id-ID');
  }
  
  // Event listeners untuk perubahan tiket
  document.querySelectorAll('input[name="ticketType"]').forEach(function(radio) {
    radio.addEventListener('change', calculateTotal);
  });
  
  document.getElementById('ticketQuantity').addEventListener('input', calculateTotal);
  
  // Tombol lanjutkan pembayaran
  document.getElementById('continuePayment').addEventListener('click', function() {
    var ticketType = document.querySelector('input[name="ticketType"]:checked');
    var quantity = document.getElementById('ticketQuantity').value;
    var date = document.getElementById('visitDate').value;
    
    if (!date) {
      alert('Silakan pilih tanggal kunjungan!');
      return;
    }
    
    alert('Pesanan berhasil!\nTiket: ' + ticketType.nextElementSibling.textContent + '\nJumlah: ' + quantity + '\nTanggal: ' + date + '\nTotal: ' + document.getElementById('totalPrice').value);
    
    // Tutup modal
    var modalElement = document.getElementById('ticketModal');
    var modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  });
  
  // Set tanggal minimal ke hari ini
  var today = new Date().toISOString().split('T')[0];
  document.getElementById('visitDate').min = today;
});

// Initialize counters when in view
var countersInitialized = false;

function initCounters() {
  if (countersInitialized) return;
  
  var statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(function(stat) {
    var target = parseInt(stat.getAttribute('data-count'));
    animateCounter(stat, target, 2000);
  });
  countersInitialized = true;
}

// Check if stats section is in view
function checkStatsInView() {
  var statsSection = document.querySelector('.stats-section');
  var rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    initCounters();
  }
}

window.addEventListener('scroll', checkStatsInView);
window.addEventListener('load', checkStatsInView);

// Tab functionality
var tabButtons = document.querySelectorAll('.tab-btn');
var tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var tabId = this.getAttribute('data-tab');
        tabButtons.forEach(function(btn) {
      btn.classList.remove('active');
    });
    tabContents.forEach(function(content) {
      content.classList.remove('active');
    });
        this.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  });
});

// FAQ functionality
var faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(function(question) {
  question.addEventListener('click', function() {
    var answer = this.nextElementSibling;
    var isActive = answer.classList.contains('active');
        document.querySelectorAll('.faq-answer').forEach(function(ans) {
      ans.classList.remove('active');
    });
    
    if (!isActive) {
      answer.classList.add('active');
    }
  });
});


// Ticket price calculation
var ticketTypeRadios = document.querySelectorAll('input[name="ticketType"]');
var ticketQuantity = document.getElementById('ticketQuantity');
var totalPrice = document.getElementById('totalPrice');

var prices = {
  'adult': 125000,
  'child': 100000,
  'student': 90000,
  'group': 80000
};

function updateTotalPrice() {
  var selectedType = document.querySelector('input[name="ticketType"]:checked').id;
  var quantity = parseInt(ticketQuantity.value);
  var price = prices[selectedType] * quantity;
  totalPrice.value = 'Rp ' + price.toLocaleString();
}

ticketTypeRadios.forEach(function(radio) {
  radio.addEventListener('change', updateTotalPrice);
});

ticketQuantity.addEventListener('input', updateTotalPrice);

// Toggle FAQ items
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});

// FAQ form submission
document.getElementById('faqForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var notification = document.getElementById('faqNotification');
    
    setTimeout(function() {
        e.target.reset();
        notification.textContent = 'Terima kasih! Pertanyaan Anda sudah kami terima dan akan dijawab secepatnya.';
        notification.className = 'notification success';
        notification.style.display = 'block';
        
        setTimeout(function() {
            notification.style.display = 'none';
        }, 5000);
    }, 1000);
});

// testimonial form submission
document.getElementById('testimonialForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var notification = document.getElementById('testimonialNotification');
    
    setTimeout(function() {
        e.target.reset();
        notification.textContent = 'Testimoni Anda berhasil dikirim! Kami sangat menghargai masukan dari pengunjung.';
        notification.className = 'notification success';
        notification.style.display = 'block';
        
        setTimeout(function() {
            notification.style.display = 'none';
        }, 5000);
    }, 1000);
});

// contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var notification = document.getElementById('contactNotification');
    
    setTimeout(function() {
        e.target.reset();
        notification.textContent = 'Pesan Anda sudah kami terima! Tim kami akan menghubungi Anda segera.';
        notification.className = 'notification success';
        notification.style.display = 'block';
        
        setTimeout(function() {
            notification.style.display = 'none';
        }, 5000);
    }, 1000);
});

        // Membuat FOOTER
        function createFloatingElements() {
            var container = document.getElementById('floatingElements');
            var elementsCount = 12;
            
            for (var i = 0; i < elementsCount; i++) {
                var element = document.createElement('div');
                element.className = 'floating-element';
                
                var leftPos = Math.random() * 100;
                var animationDelay = Math.random() * 15;
                var size = 10 + Math.random() * 20;
                
                element.style.left = leftPos + '%';
                element.style.width = size + 'px';
                element.style.height = size + 'px';
                element.style.animationDelay = animationDelay + 's';
                
                container.appendChild(element);
            }
        }
        
        function validateEmail(email) {
            var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // Fungsi untuk menampilkan pesan
        function showMessage(message, isError) {
            var messageElement = document.getElementById('newsletterMessage');
            messageElement.textContent = message;
            messageElement.style.display = 'block';
            messageElement.style.backgroundColor = isError ? 'rgba(255, 0, 0, 0.1)' : 'rgba(211, 84, 0, 0.2)';
            messageElement.style.color = isError ? '#ff6b6b' : '#D35400';
            messageElement.style.border = isError ? '1px solid #ff6b6b' : '1px solid #D35400';
            
            // Sembunyikan pesan setelah 5 detik
            setTimeout(function() {
                messageElement.style.display = 'none';
            }, 5000);
        }
        
        // Event handler untuk form newsletter
        document.getElementById('newsletterForm').addEventListener('submit', function(e) {
            e.preventDefault();
            var emailInput = document.getElementById('emailInput');
            var email = emailInput.value.trim();
            
            if (!email) {
                showMessage('Harap masukkan alamat email Anda.', true);
                return;
            }
            
            if (!validateEmail(email)) {
                showMessage('Format email tidak valid. Harap periksa kembali.', true);
                return;
            }
                        showMessage('Terima kasih! Email ' + email + ' telah berhasil terdaftar untuk newsletter kami.', false);
                        emailInput.value = '';
        });
        
        window.onload = function() {
            createFloatingElements();
        };