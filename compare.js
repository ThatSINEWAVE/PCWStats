document.addEventListener('DOMContentLoaded', () => {
    const tank1Select = document.getElementById('tank1-select');
    const tank2Select = document.getElementById('tank2-select');
    const statNamesContainer = document.getElementById('stat-names');
    const tank1StatsContainer = document.getElementById('tank1-stats');
    const tank2StatsContainer = document.getElementById('tank2-stats');

    const categories = ['FIREPOWER', 'MOBILITY', 'SURVIVABILITY', 'RECON', 'UTILITY'];

    // Full list of tanks
    const tanks = ["Punch", "Kent", "Chopper", "Titan", "Reaper", "Jager", "Blitz", "Akira", "Udarnik", "Fantome", "Raketa", "Atom", "HSTV-L", "Walkurie", "Arblast", "AR_AAV", "XM808_Twister", "Brimstone"];

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
            fetch(`assets/data/${tank1}.json`)
                .then(response => response.json())
                .then(tank1Data => {
                    fetch(`assets/data/${tank2}.json`)
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

                    if (statValue1 > statValue2) {
                        tank1StatElement.classList.add('higher');
                        tank2StatElement.classList.add('lower');
                    } else if (statValue1 < statValue2) {
                        tank1StatElement.classList.add('lower');
                        tank2StatElement.classList.add('higher');
                    } else {
                        tank1StatElement.classList.add('equal');
                        tank2StatElement.classList.add('equal');
                    }

                    tank1StatElement.classList.add('stat');
                    tank2StatElement.classList.add('stat');
                }
            }
        });
    }

    window.updateComparison = updateComparison;
});
