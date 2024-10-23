const studentForm = document.getElementById('student-form');
const studentList = document.getElementById('student-list');
const studentIdInput = document.getElementById('student-id');
const studentNameInput = document.getElementById('student-name');
const studentGenderInput = document.getElementById('gender');
const studentNsInput = document.getElementById('student-ns'); 
const studentQqInput = document.getElementById('student-qq'); 
const addStudentBtn = document.getElementById('add-student');
const updateStudentBtn = document.getElementById('update-student');

let selectedStudentId = null; // Biến lưu trữ ID của sinh viên 

// Hàm tải sinh viên từ LocalStorage
function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    studentList.innerHTML = ''; 
    students.forEach(student => addStudentToTable(student)); // Thêm sinh viên vào bảng
}

// Hàm lưu danh sách sinh viên vào LocalStorage
function saveStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
}

// Hàm thêm sinh viên vào bảng
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
    studentList.appendChild(row); // Thêm hàng vào danh sách
}

// Xử lý sự kiện khi form được gửi
studentForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const studentId = studentIdInput.value.trim();
    const studentName = studentNameInput.value.trim();
    const studentGender = studentGenderInput.value;
    const studentNs = studentNsInput.value; 
    const studentQq = studentQqInput.value.trim(); 

    if (selectedStudentId) {
        updateStudentInTable(selectedStudentId, studentId, studentName, studentGender, studentNs, studentQq);
    } else {
        const newStudent = {
            id: studentId,
            name: studentName,
            gender: studentGender,
            dob: studentNs,
            hometown: studentQq
        };
        
        // Lưu sinh viên mới 
        saveNewStudent(newStudent);
        addStudentToTable(newStudent);
    }
    
    resetForm();
});

function saveNewStudent(student) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student); 
    saveStudents(students); 
}

// Hàm sửa thông tin sinh viên
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

// Hàm cập nhật thông tin sinh viên trong bảng
function updateStudentInTable(studentId, id, name, gender, dob, hometown) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentIndex = students.findIndex(stu => stu.id === studentId); 
    

    students[studentIndex] = { id, name, gender, dob, hometown };
    saveStudents(students); 


    studentList.innerHTML = '';
    loadStudents(); 

    resetForm(); 
}

// Hàm xóa sinh viên
function deleteStudent(studentId) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.filter(stu => stu.id !== studentId); 
    saveStudents(students); 

    // Xóa hàng khỏi bảng
    studentList.innerHTML = '';
    loadStudents(); 
}


function resetForm() {
    studentIdInput.value = '';
    studentNameInput.value = '';
    studentGenderInput.selectedIndex = 0; 
    studentNsInput.value = '';
    studentQqInput.value = '';
    selectedStudentId = null; 
    addStudentBtn.style.display = 'inline'; 
    updateStudentBtn.style.display = 'none'; 
}

// Tải danh sách sinh viên khi trang được tải
window.onload = loadStudents;
