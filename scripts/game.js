/* ========================================
   Brandle - Game Logic
   ======================================== */

// Game Configuration
const GAME_CONFIG = {
    totalLogos: 10,
    attemptsPerLogo: 6,
    revealLevels: [10, 25, 45, 65, 85, 100],
    maxStarsPerLogo: 6
};

// Travel Logo Database
const TRAVEL_LOGOS = [
    {
        id: 1,
        brand: "Airbnb",
        acceptedAnswers: ["airbnb", "air bnb", "air b n b"],
        image: "https://www.logo.wine/a/logo/Airbnb/Airbnb-Logo.wine.svg",
        category: "accommodation"
    },
    {
        id: 2,
        brand: "Emirates",
        acceptedAnswers: ["emirates", "emirates airlines", "fly emirates", "emirates airline"],
        image: "https://www.logo.wine/a/logo/Emirates_(airline)/Emirates_(airline)-Logo.wine.svg",
        category: "airline"
    },
    {
        id: 3,
        brand: "Booking.com",
        acceptedAnswers: ["booking", "booking.com", "bookingcom", "booking com"],
        image: "https://www.logo.wine/a/logo/Booking.com/Booking.com-Logo.wine.svg",
        category: "booking"
    },
    {
        id: 4,
        brand: "Delta",
        acceptedAnswers: ["delta", "delta airlines", "delta air lines", "delta airline"],
        image: "https://www.logo.wine/a/logo/Delta_Air_Lines/Delta_Air_Lines-Logo.wine.svg",
        category: "airline"
    },
    {
        id: 5,
        brand: "Marriott",
        acceptedAnswers: ["marriott", "marriott hotels", "marriott international", "marriott bonvoy"],
        image: "https://www.logo.wine/a/logo/Marriott_International/Marriott_International-Logo.wine.svg",
        category: "hotel"
    },
    {
        id: 6,
        brand: "TripAdvisor",
        acceptedAnswers: ["tripadvisor", "trip advisor", "trip", "ta"],
        image: "https://www.logo.wine/a/logo/TripAdvisor/TripAdvisor-Logo.wine.svg",
        category: "booking"
    },
    {
        id: 7,
        brand: "Southwest",
        acceptedAnswers: ["southwest", "southwest airlines", "southwest airline", "swa"],
        image: "https://www.logo.wine/a/logo/Southwest_Airlines/Southwest_Airlines-Logo.wine.svg",
        category: "airline"
    },
    {
        id: 8,
        brand: "Hilton",
        acceptedAnswers: ["hilton", "hilton hotels", "hilton worldwide", "hilton honors"],
        image: "https://www.logo.wine/a/logo/Hilton_Hotels_%26_Resorts/Hilton_Hotels_%26_Resorts-Logo.wine.svg",
        category: "hotel"
    },
    {
        id: 9,
        brand: "Expedia",
        acceptedAnswers: ["expedia", "expedia.com", "expedia group"],
        image: "https://www.logo.wine/a/logo/Expedia_Group/Expedia_Group-Logo.wine.svg",
        category: "booking"
    },
    {
        id: 10,
        brand: "United",
        acceptedAnswers: ["united", "united airlines", "united airline", "ual"],
        image: "https://www.logo.wine/a/logo/United_Airlines/United_Airlines-Logo.wine.svg",
        category: "airline"
    },
    {
        id: 11,
        brand: "Royal Caribbean",
        acceptedAnswers: ["royal caribbean", "royalcaribbean", "rccl", "royal caribbean cruises", "royal carribean"],
        image: "https://www.logo.wine/a/logo/Royal_Caribbean_International/Royal_Caribbean_International-Logo.wine.svg",
        category: "cruise"
    },
    {
        id: 12,
        brand: "Uber",
        acceptedAnswers: ["uber", "uber ride", "uber rides"],
        image: "https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg",
        category: "transport"
    },
    {
        id: 13,
        brand: "Kayak",
        acceptedAnswers: ["kayak", "kayak.com", "kayak travel"],
        image: "https://www.logo.wine/a/logo/Kayak.com/Kayak.com-Logo.wine.svg",
        category: "booking"
    },
    {
        id: 14,
        brand: "Hyatt",
        acceptedAnswers: ["hyatt", "hyatt hotels", "hyatt regency", "park hyatt"],
        image: "https://www.logo.wine/a/logo/Hyatt/Hyatt-Logo.wine.svg",
        category: "hotel"
    },
    {
        id: 15,
        brand: "JetBlue",
        acceptedAnswers: ["jetblue", "jet blue", "jetblue airways", "jet blue airways"],
        image: "https://www.logo.wine/a/logo/JetBlue/JetBlue-Logo.wine.svg",
        category: "airline"
    },
    {
        id: 16,
        brand: "Vrbo",
        acceptedAnswers: ["vrbo", "v r b o", "vacation rentals by owner", "homeaway"],
        image: "https://www.logo.wine/a/logo/Vrbo/Vrbo-Logo.wine.svg",
        category: "accommodation"
    },
    {
        id: 17,
        brand: "Lonely Planet",
        acceptedAnswers: ["lonely planet", "lonelyplanet", "lp"],
        image: "https://www.logo.wine/a/logo/Lonely_Planet/Lonely_Planet-Logo.wine.svg",
        category: "media"
    },
    {
        id: 18,
        brand: "Carnival",
        acceptedAnswers: ["carnival", "carnival cruise", "carnival cruises", "carnival cruise line", "carnival cruise lines"],
        image: "https://www.logo.wine/a/logo/Carnival_Cruise_Line/Carnival_Cruise_Line-Logo.wine.svg",
        category: "cruise"
    },
    {
        id: 19,
        brand: "Skyscanner",
        acceptedAnswers: ["skyscanner", "sky scanner"],
        image: "https://www.logo.wine/a/logo/Skyscanner/Skyscanner-Logo.wine.svg",
        category: "booking"
    },
    {
        id: 20,
        brand: "I Love NY",
        acceptedAnswers: ["i love ny", "i love new york", "i heart ny", "new york tourism", "visit new york", "nyc tourism"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/I_Love_New_York.svg/512px-I_Love_New_York.svg.png",
        category: "dmo"
    },
    {
        id: 21,
        brand: "Matador Network",
        acceptedAnswers: ["matador", "matador network", "matadornetwork"],
        image: "https://seekvectorlogo.com/wp-content/uploads/2022/02/matador-network-vector-logo-2022.png",
        category: "media"
    }
];

// Validated logos (populated after preloading)
let validatedLogos = [];

// Preload and validate all logo images
async function preloadLogos() {
    const results = await Promise.allSettled(
        TRAVEL_LOGOS.map(logo => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(logo);
                img.onerror = () => {
                    console.warn(`Logo failed to load: ${logo.brand} - ${logo.image}`);
                    reject(logo);
                };
                img.src = logo.image;
            });
        })
    );

    validatedLogos = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);

    console.log(`Loaded ${validatedLogos.length}/${TRAVEL_LOGOS.length} logos successfully`);

    // Update totalLogos config if we have fewer valid logos
    if (validatedLogos.length < GAME_CONFIG.totalLogos) {
        GAME_CONFIG.totalLogos = Math.min(validatedLogos.length, 10);
    }

    return validatedLogos;
}



// Game State
let gameState = {
    currentLogoIndex: 0,
    currentAttempt: 1,
    currentLogos: [],
    guesses: [],
    results: [],
    totalStars: 0,
    isComplete: false
};

// DOM Elements
const elements = {
    // Screens
    welcomeScreen: document.getElementById('welcomeScreen'),
    gameScreen: document.getElementById('gameScreen'),
    logoResultScreen: document.getElementById('logoResultScreen'),
    resultsScreen: document.getElementById('resultsScreen'),

    // Header
    progressContainer: document.getElementById('progressContainer'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),

    // Flight Progress
    flightProgress: document.getElementById('flightProgress'),
    airplane: document.getElementById('airplane'),
    flightPathCompleted: document.getElementById('flightPathCompleted'),
    flightProgressText: document.getElementById('flightProgressText'),

    // Game
    starsDisplay: document.getElementById('starsDisplay'),
    logoContainer: document.getElementById('logoContainer'),
    logoWrapper: document.getElementById('logoWrapper'),
    logoImage: document.getElementById('logoImage'),
    revealLevel: document.getElementById('revealLevel'),
    guessInput: document.getElementById('guessInput'),
    submitBtn: document.getElementById('submitBtn'),
    guessFeedback: document.getElementById('guessFeedback'),
    guessesList: document.getElementById('guessesList'),
    skipBtn: document.getElementById('skipBtn'),

    // Logo Result
    logoResultStatus: document.getElementById('logoResultStatus'),
    resultLogoImage: document.getElementById('resultLogoImage'),
    resultBrand: document.getElementById('resultBrand'),
    resultStars: document.getElementById('resultStars'),
    resultMessage: document.getElementById('resultMessage'),
    nextLogoBtn: document.getElementById('nextLogoBtn'),

    // Results
    resultsTitle: document.getElementById('resultsTitle'),
    resultsCorrect: document.getElementById('resultsCorrect'),
    totalStars: document.getElementById('totalStars'),
    resultsGrid: document.getElementById('resultsGrid'),
    shareBtn: document.getElementById('shareBtn'),
    playAgainBtn: document.getElementById('playAgainBtn'),
    shareToast: document.getElementById('shareToast'),

    // Buttons
    startBtn: document.getElementById('startBtn')
};

// ========================================
// Utility Functions
// ========================================

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function normalizeAnswer(answer) {
    return answer.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');
}

function isCorrectGuess(guess, acceptedAnswers) {
    const normalizedGuess = normalizeAnswer(guess);
    return acceptedAnswers.some(answer => normalizeAnswer(answer) === normalizedGuess);
}

function calculateStars(attemptNumber) {
    return Math.max(0, GAME_CONFIG.maxStarsPerLogo - attemptNumber + 1);
}

function showScreen(screenToShow) {
    [elements.welcomeScreen, elements.gameScreen, elements.logoResultScreen, elements.resultsScreen]
        .forEach(screen => screen.classList.add('hidden'));
    screenToShow.classList.remove('hidden');
}

// ========================================
// Game Functions
// ========================================

function initGame() {
    // Reset state
    gameState = {
        currentLogoIndex: 0,
        currentAttempt: 1,
        currentLogos: shuffleArray(validatedLogos).slice(0, GAME_CONFIG.totalLogos),
        guesses: [],
        results: [],
        totalStars: 0,
        isComplete: false
    };

    // Update UI
    updateProgress();
    loadCurrentLogo();
    showScreen(elements.gameScreen);
    elements.guessInput.focus();
}

function loadCurrentLogo() {
    const logo = gameState.currentLogos[gameState.currentLogoIndex];

    // Reset state for this logo
    gameState.currentAttempt = 1;
    gameState.guesses = [];

    // Update UI
    elements.logoImage.src = logo.image;
    elements.logoImage.dataset.level = 1;
    elements.revealLevel.textContent = `Level 1/${GAME_CONFIG.attemptsPerLogo}`;
    elements.guessInput.value = '';
    elements.guessInput.classList.remove('correct', 'wrong');
    elements.guessFeedback.classList.add('hidden');
    elements.guessesList.innerHTML = '';

    // Reset stars display
    updateStarsDisplay(GAME_CONFIG.maxStarsPerLogo);

    // Handle image load error
    elements.logoImage.onerror = () => {
        console.warn(`Failed to load logo: ${logo.image}`);
        // Create placeholder
        elements.logoWrapper.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #1a2744, #243352);
                border-radius: 12px;
                font-size: 4rem;
            ">✈️</div>
        `;
    };
}

function updateStarsDisplay(starsRemaining) {
    const stars = elements.starsDisplay.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < starsRemaining) {
            star.textContent = '⭐';
            star.classList.add('earned');
        } else {
            star.textContent = '☆';
            star.classList.remove('earned');
        }
    });
}

function updateProgress() {
    const progress = (gameState.currentLogoIndex / GAME_CONFIG.totalLogos) * 100;
    elements.progressFill.style.width = `${progress}%`;
    elements.progressText.textContent = `${gameState.currentLogoIndex}/${GAME_CONFIG.totalLogos}`;

    // Update flight progress
    updateFlightProgress();
}

function updateFlightProgress() {
    const currentLogo = gameState.currentLogoIndex;
    const totalLogos = GAME_CONFIG.totalLogos;

    // Calculate airplane position (0% to 100%)
    // Position at start of current logo
    const airplanePosition = (currentLogo / totalLogos) * 100;

    // Move airplane
    if (elements.airplane) {
        elements.airplane.style.left = `${airplanePosition}%`;
    }

    // Update flight path completed
    if (elements.flightPathCompleted) {
        elements.flightPathCompleted.style.width = `${airplanePosition}%`;
    }

    // Update clouds
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach((cloud, index) => {
        const stopNumber = index + 1;
        cloud.classList.remove('visited', 'current');

        if (stopNumber < currentLogo + 1) {
            cloud.classList.add('visited');
        } else if (stopNumber === currentLogo + 1) {
            cloud.classList.add('current');
        }
    });

    // Update label
    if (elements.flightProgressText) {
        if (currentLogo === 0) {
            elements.flightProgressText.textContent = `Logo 1 of ${totalLogos}`;
        } else {
            elements.flightProgressText.textContent = `Logo ${currentLogo + 1} of ${totalLogos}`;
        }
    }
}

function submitGuess() {
    const guess = elements.guessInput.value.trim();
    if (!guess) return;

    const logo = gameState.currentLogos[gameState.currentLogoIndex];
    const isCorrect = isCorrectGuess(guess, logo.acceptedAnswers);

    if (isCorrect) {
        handleCorrectGuess();
    } else {
        handleWrongGuess(guess);
    }
}

function handleCorrectGuess() {
    const stars = calculateStars(gameState.currentAttempt);
    gameState.totalStars += stars;

    // Save result
    gameState.results.push({
        logoId: gameState.currentLogos[gameState.currentLogoIndex].id,
        brand: gameState.currentLogos[gameState.currentLogoIndex].brand,
        correct: true,
        attempts: gameState.currentAttempt,
        stars: stars
    });

    // Visual feedback
    elements.guessInput.classList.add('correct');
    elements.guessFeedback.textContent = '✓ Correct!';
    elements.guessFeedback.className = 'guess-feedback correct';

    // Show result screen after delay
    setTimeout(() => showLogoResult(true, stars), 600);
}

function handleWrongGuess(guess) {
    gameState.guesses.push(guess);
    gameState.currentAttempt++;

    // Visual feedback
    elements.guessInput.classList.add('wrong');
    elements.guessFeedback.textContent = 'Try again!';
    elements.guessFeedback.className = 'guess-feedback wrong';

    // Add to guesses list
    const chip = document.createElement('span');
    chip.className = 'guess-chip';
    chip.textContent = guess;
    elements.guessesList.appendChild(chip);

    // Clear input
    setTimeout(() => {
        elements.guessInput.value = '';
        elements.guessInput.classList.remove('wrong');
    }, 400);

    // Check if out of attempts
    if (gameState.currentAttempt > GAME_CONFIG.attemptsPerLogo) {
        // Failed this logo
        gameState.results.push({
            logoId: gameState.currentLogos[gameState.currentLogoIndex].id,
            brand: gameState.currentLogos[gameState.currentLogoIndex].brand,
            correct: false,
            attempts: GAME_CONFIG.attemptsPerLogo,
            stars: 0
        });
        setTimeout(() => showLogoResult(false, 0), 600);
    } else {
        // Reveal more
        revealMore();
    }
}

function revealMore() {
    elements.logoImage.dataset.level = gameState.currentAttempt;
    elements.revealLevel.textContent = `Level ${gameState.currentAttempt}/${GAME_CONFIG.attemptsPerLogo}`;
    updateStarsDisplay(calculateStars(gameState.currentAttempt));
}

function skipLogo() {
    // Save as incorrect
    gameState.results.push({
        logoId: gameState.currentLogos[gameState.currentLogoIndex].id,
        brand: gameState.currentLogos[gameState.currentLogoIndex].brand,
        correct: false,
        attempts: gameState.currentAttempt,
        stars: 0
    });
    showLogoResult(false, 0);
}

function showLogoResult(correct, stars) {
    const logo = gameState.currentLogos[gameState.currentLogoIndex];

    // Update result screen
    elements.logoResultStatus.textContent = correct ? '✓' : '✗';
    elements.logoResultStatus.className = `logo-result__status ${correct ? 'correct' : 'wrong'}`;
    elements.resultLogoImage.src = logo.image;
    elements.resultBrand.textContent = logo.brand;

    // Stars display
    let starsHtml = '';
    for (let i = 0; i < GAME_CONFIG.maxStarsPerLogo; i++) {
        starsHtml += `<span class="star ${i < stars ? '' : 'empty'}">${i < stars ? '⭐' : '☆'}</span>`;
    }
    elements.resultStars.innerHTML = starsHtml;

    // Message
    if (correct) {
        const messages = [
            'Great eye! ✈️',
            'You know your travel! 🌍',
            'Impressive! 🎯',
            'Well traveled! 🧳',
            'Jet setter! ✨'
        ];
        elements.resultMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
    } else {
        elements.resultMessage.textContent = "This one was tricky!";
    }

    // Update button text for last logo
    const isLastLogo = gameState.currentLogoIndex >= GAME_CONFIG.totalLogos - 1;
    elements.nextLogoBtn.textContent = isLastLogo ? 'See Results →' : 'Next Logo →';

    showScreen(elements.logoResultScreen);
}

function nextLogo() {
    gameState.currentLogoIndex++;
    updateProgress();

    if (gameState.currentLogoIndex >= GAME_CONFIG.totalLogos) {
        showFinalResults();
    } else {
        loadCurrentLogo();
        showScreen(elements.gameScreen);
        elements.guessInput.focus();
    }
}

function showFinalResults() {
    gameState.isComplete = true;
    const correctCount = gameState.results.filter(r => r.correct).length;
    const isPerfect = correctCount === GAME_CONFIG.totalLogos;

    // Update UI
    if (isPerfect) {
        elements.resultsTitle.textContent = '🎉 Perfect Score!';
    } else if (correctCount >= 8) {
        elements.resultsTitle.textContent = 'Amazing!';
    } else if (correctCount >= 5) {
        elements.resultsTitle.textContent = 'Great Job!';
    } else {
        elements.resultsTitle.textContent = 'Nice Try!';
    }

    elements.resultsCorrect.textContent = correctCount;
    elements.totalStars.textContent = gameState.totalStars;

    // Build results grid
    let gridHtml = '';
    gameState.results.forEach((result, index) => {
        gridHtml += `
            <div class="results__grid-item ${result.correct ? 'correct' : 'wrong'}">
                ${result.correct ? result.stars : '✗'}
            </div>
        `;
    });
    elements.resultsGrid.innerHTML = gridHtml;

    // Update progress to 100%
    elements.progressFill.style.width = '100%';
    elements.progressText.textContent = `${GAME_CONFIG.totalLogos}/${GAME_CONFIG.totalLogos}`;

    showScreen(elements.resultsScreen);

    // Confetti for perfect score!
    if (isPerfect && typeof confetti !== 'undefined') {
        triggerConfetti();
    }
}

function triggerConfetti() {
    // First burst
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0ea5e9', '#10b981', '#f59e0b', '#ffffff']
    });

    // Second burst after delay
    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#0ea5e9', '#10b981', '#f59e0b']
        });
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#0ea5e9', '#10b981', '#f59e0b']
        });
    }, 250);

    // Third burst
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#0ea5e9', '#10b981', '#f59e0b', '#ffffff']
        });
    }, 500);
}

function shareResults() {
    const correctCount = gameState.results.filter(r => r.correct).length;

    let shareText = `✈️ Brandle Travel Edition ✈️\n\n`;

    // Create emoji grid
    gameState.results.forEach((result, index) => {
        if (result.correct) {
            shareText += '🟩';
        } else {
            shareText += '🟥';
        }
        if ((index + 1) % 5 === 0) shareText += '\n';
    });

    shareText += `\nScore: ${correctCount}/10 | ${gameState.totalStars} ⭐\n\n`;
    shareText += `Play → brandle.app`;

    navigator.clipboard.writeText(shareText).then(() => {
        elements.shareToast.classList.remove('hidden');
        setTimeout(() => {
            elements.shareToast.classList.add('hidden');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Could not copy to clipboard. Here are your results:\n\n' + shareText);
    });
}

function playAgain() {
    initGame();
}

// ========================================
// Event Listeners
// ========================================

// NOTE: startBtn listener added after wrapping initGame below

elements.submitBtn.addEventListener('click', submitGuess);

elements.guessInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        submitGuess();
    }
});

elements.skipBtn.addEventListener('click', skipLogo);

elements.nextLogoBtn.addEventListener('click', nextLogo);

elements.shareBtn.addEventListener('click', shareResults);

elements.playAgainBtn.addEventListener('click', playAgain);

// ========================================
// Initialize
// ========================================

// Hide progress on welcome screen
elements.progressContainer.style.visibility = 'hidden';
if (elements.flightProgress) {
    elements.flightProgress.style.display = 'none';
}

// Wrap initGame to show flight progress
const originalInitGame = initGame;
initGame = function () {
    // Show progress elements
    elements.progressContainer.style.visibility = 'visible';
    if (elements.flightProgress) {
        elements.flightProgress.style.display = 'block';
    }
    // Reset flight progress visuals
    if (elements.airplane) {
        elements.airplane.style.left = '0%';
    }
    if (elements.flightPathCompleted) {
        elements.flightPathCompleted.style.width = '0%';
    }
    // Reset clouds
    document.querySelectorAll('.cloud').forEach(cloud => {
        cloud.classList.remove('visited', 'current');
    });
    // Run original init
    originalInitGame();
    // Update flight progress after game state is set
    updateFlightProgress();
};

// NOW add the start button listener (after wrapping)
elements.startBtn.addEventListener('click', initGame);

// Preload logos on page load
preloadLogos().then(() => {
    console.log('Logo preloading complete. Ready to play!');
});
