// Select DOM elements
const studentForm = document.getElementById('student-form');
const studentList = document.getElementById('student-list');
const studentIdInput = document.getElementById('student-id');
const studentNameInput = document.getElementById('student-name');
const studentGenderInput = document.getElementById('gender');
const studentNsInput = document.getElementById('student-ns');
const studentQqInput = document.getElementById('student-qq');
const addStudentBtn = document.getElementById('add-student');
const updateStudentBtn = document.getElementById('update-student');

let selectedStudentId = null;

// Load students from LocalStorage
function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    studentList.innerHTML = ''; // Clear the table before loading
    students.forEach(student => addStudentToTable(student));
}

// Save students to LocalStorage
function saveStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
}

// Add student to table
function addStudentToTable(student) {
    const row = document.createElement('tr');
    row.setAttribute('data-id', student.id);
    
    row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.gender}</td>
        <td>${student.dob}</td>
        <td>${student.hometown}</td>
        <td>
            <button onclick="editStudent('${student.id}')">Sửa</button>
            <button onclick="deleteStudent('${student.id}')">Xóa</button>
        </td>
    `;
    studentList.appendChild(row);
}

// Add new student
studentForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const studentId = studentIdInput.value.trim();
    const studentName = studentNameInput.value.trim();
    const studentGender = studentGenderInput.value;
    const studentNs = studentNsInput.value;
    const studentQq = studentQqInput.value.trim();

    if (selectedStudentId) {
        // Cập nhật sinh viên nếu có ID đã chọn
        updateStudentInTable(selectedStudentId, studentId, studentName, studentGender, studentNs, studentQq);
    } else {
        // Thêm sinh viên mới
        const newStudent = {
            id: studentId,
            name: studentName,
            gender: studentGender,
            dob: studentNs,
            hometown: studentQq
        };
        
        // Lưu sinh viên mới vào LocalStorage và thêm vào bảng
        saveNewStudent(newStudent);
        addStudentToTable(newStudent);
    }
    
    resetForm();
});

// Save new student to LocalStorage
function saveNewStudent(student) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    saveStudents(students);
}

// Edit student
function editStudent(studentId) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students.find(stu => stu.id === studentId);
    
    studentIdInput.value = student.id;
    studentNameInput.value = student.name;
    studentGenderInput.value = student.gender;
    studentNsInput.value = student.dob;
    studentQqInput.value = student.hometown;

    selectedStudentId = studentId;
    addStudentBtn.style.display = 'none';
    updateStudentBtn.style.display = 'inline';
}

// Update student
function updateStudentInTable(studentId, id, name, gender, dob, hometown) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentIndex = students.findIndex(stu => stu.id === studentId);
    
    // Cập nhật thông tin sinh viên
    students[studentIndex] = { id, name, gender, dob, hometown };
    saveStudents(students);

    // Cập nhật lại bảng với dữ liệu mới
    studentList.innerHTML = '';
    loadStudents();

    resetForm();
}

// Delete student
function deleteStudent(studentId) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.filter(stu => stu.id !== studentId);
    saveStudents(students);

    // Xóa hàng khỏi bảng
    studentList.innerHTML = '';
    loadStudents();
}

// Reset form
function resetForm() {
    studentIdInput.value = '';
    studentNameInput.value = '';
    studentGenderInput.selectedIndex = 0; // Reset to the first option
    studentNsInput.value = '';
    studentQqInput.value = '';
    selectedStudentId = null;
    addStudentBtn.style.display = 'inline';
    updateStudentBtn.style.display = 'none';
}

// Initial load
window.onload = loadStudents;
