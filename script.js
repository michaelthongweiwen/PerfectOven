function calculateDamageOverTime(attack, critChance, critDamage, duration = 60) {
    let damageOverTime = [];
    for (let t = 1; t <= duration; t++) {
        let averageDamagePerHit = attack * ((1 - critChance / 100) + (critChance / 100) * (critDamage / 100));
        damageOverTime.push(averageDamagePerHit * t);
    }
    return damageOverTime;
}

function updateGraph() {
    // Get input values for first set
    let attack1 = parseFloat(document.getElementById('attack1').value);
    let critChance1 = parseFloat(document.getElementById('crit-chance1').value);
    let critDamage1 = parseFloat(document.getElementById('crit-damage1').value);

    // Get input values for second set
    let attack2 = parseFloat(document.getElementById('attack2').value);
    let critChance2 = parseFloat(document.getElementById('crit-chance2').value);
    let critDamage2 = parseFloat(document.getElementById('crit-damage2').value);
    
    // Calculate damage over time for both sets
    let damageOverTime1 = calculateDamageOverTime(attack1, critChance1, critDamage1);
    let damageOverTime2 = calculateDamageOverTime(attack2, critChance2, critDamage2);

    let ctx = document.getElementById('damageChart').getContext('2d');
    
    // Destroy the previous chart instance if it exists
    if (window.damageChart instanceof Chart) {
        window.damageChart.destroy();
    }

    // Create a new chart instance with two datasets
    window.damageChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 60}, (_, i) => i + 1),
            datasets: [
                {
                    label: 'Damage Over Time (Stats 1)',
                    data: damageOverTime1,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false
                },
                {
                    label: 'Damage Over Time (Stats 2)',
                    data: damageOverTime2,
                    borderColor: 'rgba(192, 75, 75, 1)',
                    fill: false
                }
            ]
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
