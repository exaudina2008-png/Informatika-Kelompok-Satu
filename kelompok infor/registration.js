const studentDatabase = {
    '9936': 'Vladya Shakila',
    '9889': 'Muhammad Kemal Rifai',
    '9934': 'Syirin Adhia Salwa',
    '9836': 'Barry Muhammad Harun',
    '9876': 'Exaudina Meightamaro Tamba',
    '10042': 'Rizky Mahendra',
};

function getTodayDateKey() {
    const today = new Date();
    return `attendance_${today.toISOString().split('T')[0]}`;
}

function getTodaysAttendance() {
    const todayKey = getTodayDateKey();
    const attendance = JSON.parse(localStorage.getItem(todayKey)) || [];
    return attendance;
}

function saveAttendance(entry) {
    const todayKey = getTodayDateKey();
    const attendance = getTodaysAttendance();
    attendance.push(entry);
    localStorage.setItem(todayKey, JSON.stringify(attendance));
}

function registerStudentEntry(studentNumber) {
    const studentName = studentDatabase[studentNumber];
    
    if (!studentName) {
        alert('Student number not found. Please check your number and try again.');
        return null;
    }

    const entryTime = new Date().toLocaleTimeString();
    const entryDate = new Date().toLocaleDateString();
    
    const entry = {
        studentNumber,
        studentName,
        entryTime,
        entryDate,
        timestamp: new Date().getTime()
    };

    saveAttendance(entry);
    return entry;
}

function updateAttendanceStats() {
    const attendance = getTodaysAttendance();
    const totalEntries = document.getElementById('totalEntries');
    const recentEntriesList = document.getElementById('recentEntriesList');

    totalEntries.textContent = attendance.length;

    if (attendance.length === 0) {
        recentEntriesList.innerHTML = '<p class="no-entries">No entries yet today</p>';
        return;
    }

    const recentEntries = attendance.slice(-5).reverse();
    recentEntriesList.innerHTML = recentEntries.map(entry => `
        <div class="entry-item">
            <strong>${entry.studentName}</strong>
            <span>(${entry.studentNumber})</span>
            <div class="entry-time">${entry.entryTime}</div>
        </div>
    `).join('');
}

function clearAllAttendanceData() {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('attendance_')) {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
}

function clearOldAttendanceData() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('attendance_')) {
            const dateStr = key.replace('attendance_', '');
            const entryDate = new Date(dateStr);
            
            if (entryDate < thirtyDaysAgo) {
                localStorage.removeItem(key);
            }
        }
    }
}

function addDemoData() {
    const todayKey = getTodayDateKey();
    if (!localStorage.getItem(todayKey)) {
        const demoEntries = [
            {
                studentNumber: '12345',
                studentName: 'Alice Johnson',
                entryTime: '08:30:15',
                entryDate: new Date().toLocaleDateString(),
                timestamp: new Date().setHours(8, 30, 15)
            },
            {
                studentNumber: '23456',
                studentName: 'Bob Smith',
                entryTime: '09:15:22',
                entryDate: new Date().toLocaleDateString(),
                timestamp: new Date().setHours(9, 15, 22)
            }
        ];
        localStorage.setItem(todayKey, JSON.stringify(demoEntries));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    clearOldAttendanceData();
    addDemoData();
    updateAttendanceStats();

    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const studentNumber = document.getElementById('studentNumber').value.trim();
            
            if (!studentNumber) {
                alert('Please enter your student number.');
                return;
            }

            const entry = registerStudentEntry(studentNumber);
            
            if (entry) {
                alert(`Welcome ${entry.studentName}! Entry registered at ${entry.entryTime}`);
                form.reset();
                updateAttendanceStats();
            }
        });
    }

    const studentNumberInput = document.getElementById('studentNumber');
    if (studentNumberInput) {
        studentNumberInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
});