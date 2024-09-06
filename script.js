function calculateDamageOverTime(attack, critChance, critDamage, duration = 60) {
    let damageOverTime = [];
    for (let t = 1; t <= duration; t++) {
        let averageDamagePerHit = attack * ((1 - critChance / 100) + (critChance / 100) * (critDamage / 100));
        damageOverTime.push(averageDamagePerHit * t);
    }
    return damageOverTime;
}

function updateGraph() {
    let attack = parseFloat(document.getElementById('attack').value);
    let critChance = parseFloat(document.getElementById('crit-chance').value);
    let critDamage = parseFloat(document.getElementById('crit-damage').value);
    
    let damageOverTime = calculateDamageOverTime(attack, critChance, critDamage);

    let ctx = document.getElementById('damageChart').getContext('2d');
    
    // Destroy the previous chart instance if it exists and is a Chart instance
    if (window.damageChart instanceof Chart) {
        window.damageChart.destroy();
    }

    // Create a new chart instance
    window.damageChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 60}, (_, i) => i + 1),
            datasets: [{
                label: 'Damage Over Time',
                data: damageOverTime,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (Seconds)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Cumulative Damage'
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', updateGraph);
