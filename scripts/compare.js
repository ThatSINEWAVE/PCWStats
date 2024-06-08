document.addEventListener('DOMContentLoaded', () => {
    const tank1Select = document.getElementById('tank1-select');
    const tank2Select = document.getElementById('tank2-select');
    const statNamesContainer = document.getElementById('stat-names');
    const tank1StatsContainer = document.getElementById('tank1-stats');
    const tank2StatsContainer = document.getElementById('tank2-stats');

    const categories = ['FIREPOWER', 'MOBILITY', 'SURVIVABILITY', 'RECON', 'UTILITY'];

    // Full list of tanks
    const tanks = ["Punch", "Kent", "Chopper", "Titan", "Reaper", "Jager", "Blitz", "Akira", "Udarnik", "Fantome", "Raketa", "Atom", "HSTV-L", "Walkure", "Arblast", "AR_AAV", "XM808_Twister", "Brimstone", "Ray"];

    // Populate dropdowns
    tanks.forEach(name => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = option2.value = name;
        option1.textContent = option2.textContent = name;
        tank1Select.appendChild(option1);
        tank2Select.appendChild(option2);
    });

    function updateComparison() {
        const tank1 = tank1Select.value;
        const tank2 = tank2Select.value;

        if (tank1 && tank2) {
            fetch(`assets/data/${tank1}/${tank1}_stock.json`)
                .then(response => response.json())
                .then(tank1Data => {
                    fetch(`assets/data/${tank2}/${tank2}_stock.json`)
                        .then(response => response.json())
                        .then(tank2Data => {
                            displayStats(tank1Data, tank2Data);
                        });
                });
        }
    }

    function displayStats(tank1, tank2) {
        tank1StatsContainer.innerHTML = '';
        tank2StatsContainer.innerHTML = '';
        statNamesContainer.innerHTML = '';

        const higherIsBetter = [
            'TANK NAME',
            'DAMAGE',
            'SHELLS IN MAGAZINE',
            'MAGAZINE COUNT',
            'TURRET TRAVERSE SPEED',
            'GUN ELEVATION, DEGREES/SECOND',
            'GUN ELEVATION, FRONT',
            'GUN ELEVATION, SIDE',
            'GUN ELEVATION, REAR',
            'PENETRATION',
            'MODULE DAMAGE',
            'SHELL SPEED, METER/SECOND',
            'FORWARD SPEED, KM/H',
            'REVERSE SPEED, KM/H',
            'BASE ACCELERATION',
            'TRAVERSE SPEED',
            'SPRINT ENERGY VOLUME',
            'SPRINT REGEN RATE',
            'RAMMING MASS MEASURE',
            'HIT POINTS',
            'CREW HIT POINTS',
            'ENGINE HIT POINTS',
            'TRACK HIT POINTS',
            'SPOTTING ANGLE, DEGREES',
            'SPOTTING RANGE, METERS',
            'SPOTTING DURATION, SECONDS',
            'SIGNAL RANGE, METERS',
            'X-RAY RADIUS, METERS',
            'ENERGY POINTS',
            'SMOKE USE COUNT',
            'FIREPOWER Score',
            'MOBILITY Score',
            'SURVIVABILITY Score',
            'RECON Score',
            'UTILITY Score'
        ];

        const lowerIsBetter = [
            'AIMING SPEED',
            'RELOAD TIME',
            'TIME BETWEEN SHOTS',
            'TIME TO LOAD NEXT MAGAZINE',
            'RETICLE SIZE, MOVING',
            'RETICLE SIZE, ROTATING HULL',
            'RETICLE SIZE, STANDING',
            'RETICLE SIZE, AFTER SHOT',
            'RETICLE SIZE, MAX',
            'GUN DEPRESSION, FRONT',
            'GUN DEPRESSION, SIDE',
            'GUN DEPRESSION, REAR',
            'SPRINT ENERGY COST',
            'TRACK REPAIR TIME, SECONDS',
            'CREW RECOVERY TIME, SECONDS',
            'INCOMING CRIT DAMAGE, ENGINE',
            'ENGINE REPAIR TIME, SECONDS',
            'FIRE DURATION, SECONDS',
            'FIRE DAMAGE',
            'INCOMING CRIT DAMAGE, FUEL TANK',
            'FIRE DAMAGE RATE',
            'RAMMING DAMAGE RESISTANCE, FRONT',
            'RAMMING DAMAGE BONUS',
            'REPAIR KIT COOLDOWN, SECONDS',
            'LTRACKAMOUNTTOREGEN',
            'ENERGY REGENERATION',
            'SMOKE COOLDOWN, SECONDS',
            'SMOKE ENERGY COST'
        ];

        categories.forEach(category => {
            const tank1CategoryStats = tank1[category];
            const tank2CategoryStats = tank2[category];

            for (const stat in tank1CategoryStats) {
                if (tank1CategoryStats[stat] !== null && tank2CategoryStats[stat] !== null) {
                    // Create stat name
                    const statNameElement = document.createElement('div');
                    statNameElement.textContent = stat;
                    statNamesContainer.appendChild(statNameElement);

                    // Create tank1 stat element
                    const tank1StatElement = document.createElement('div');
                    tank1StatElement.textContent = tank1CategoryStats[stat] || '-';
                    tank1StatsContainer.appendChild(tank1StatElement);

                    // Create tank2 stat element
                    const tank2StatElement = document.createElement('div');
                    tank2StatElement.textContent = tank2CategoryStats[stat] || '-';
                    tank2StatsContainer.appendChild(tank2StatElement);

                    // Compare stats
                    const statValue1 = parseFloat(tank1CategoryStats[stat]);
                    const statValue2 = parseFloat(tank2CategoryStats[stat]);

                    if (higherIsBetter.includes(stat)) {
                        if (statValue1 > statValue2) {
                            tank1StatElement.style.backgroundColor = '#8FFF94';
                            tank2StatElement.style.backgroundColor = '#FF8F8F';
                        } else if (statValue1 < statValue2) {
                            tank1StatElement.style.backgroundColor = '#FF8F8F';
                            tank2StatElement.style.backgroundColor = '#8FFF94';
                        } else {
                            tank1StatElement.style.backgroundColor = '#FFFD8F';
                            tank2StatElement.style.backgroundColor = '#FFFD8F';
                        }
                    } else if (lowerIsBetter.includes(stat)) {
                        if (statValue1 < statValue2) {
                            tank1StatElement.style.backgroundColor = '#8FFF94';
                            tank2StatElement.style.backgroundColor = '#FF8F8F';
                        } else if (statValue1 > statValue2) {
                            tank1StatElement.style.backgroundColor = '#FF8F8F';
                            tank2StatElement.style.backgroundColor = '#8FFF94';
                        } else {
                            tank1StatElement.style.backgroundColor = '#FFFD8F';
                            tank2StatElement.style.backgroundColor = '#FFFD8F';
                        }
                    } else {
                        tank1StatElement.style.backgroundColor = '#FFFD8F';
                        tank2StatElement.style.backgroundColor = '#FFFD8F';
                    }

                    tank1StatElement.classList.add('stat');
                    tank2StatElement.classList.add('stat');

                    // Add event listeners for highlighting statNameElement
                    statNameElement.addEventListener('mouseover', () => {
                        statNameElement.classList.add('highlighted-stat-names');
                        tank1StatElement.classList.add('highlighted-tank-1');
                        tank2StatElement.classList.add('highlighted-tank-2');
                    });
                    statNameElement.addEventListener('mouseout', () => {
                        statNameElement.classList.remove('highlighted-stat-names');
                        tank1StatElement.classList.remove('highlighted-tank-1');
                        tank2StatElement.classList.remove('highlighted-tank-2');
                    });

                    // Add event listeners for highlighting tank1StatElement
                    tank1StatElement.addEventListener('mouseover', () => {
                        statNameElement.classList.add('highlighted-stat-names');
                        tank1StatElement.classList.add('highlighted-tank-1');
                        tank2StatElement.classList.add('highlighted-tank-2');
                    });
                    tank1StatElement.addEventListener('mouseout', () => {
                        statNameElement.classList.remove('highlighted-stat-names');
                        tank1StatElement.classList.remove('highlighted-tank-1');
                        tank2StatElement.classList.remove('highlighted-tank-2');
                    });

                    // Add event listeners for highlighting tank2StatElement
                    tank2StatElement.addEventListener('mouseover', () => {
                        statNameElement.classList.add('highlighted-stat-names');
                        tank1StatElement.classList.add('highlighted-tank-1');
                        tank2StatElement.classList.add('highlighted-tank-2');
                    });
                    tank2StatElement.addEventListener('mouseout', () => {
                        statNameElement.classList.remove('highlighted-stat-names');
                        tank1StatElement.classList.remove('highlighted-tank-1');
                        tank2StatElement.classList.remove('highlighted-tank-2');
                    });
                }
            }
        });
    }

    window.updateComparison = updateComparison;
});
