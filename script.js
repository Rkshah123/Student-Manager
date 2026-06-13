let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;

const nameInput = document.getElementById("name");
const mobileInput = document.getElementById("mobile");
const addressInput = document.getElementById("address");
const addBtn = document.getElementById("addBtn");

function saveToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
}

function updateCount() {
    document.getElementById("studentCount").textContent = students.length;
}

function renderStudents() {

    const studentList = document.getElementById("studentList");

    studentList.innerHTML = "";

    students.forEach((student, index) => {

        studentList.innerHTML += `
            <div class="student-card">
                <p><strong>Name:</strong> ${student.name}</p>
                <p><strong>Mobile:</strong> ${student.mobile}</p>
                <p><strong>Address:</strong> ${student.address}</p>

                <div class="actions">
                    <button class="edit-btn" onclick="editStudent(${index})">
                        Edit
                    </button>

                    <button class="delete-btn" onclick="deleteStudent(${index})">
                        Delete
                    </button>
                </div>
            </div>
        `;
    });

    updateCount();
}

addBtn.addEventListener("click", () => {

    const name = nameInput.value.trim();
    const mobile = mobileInput.value.trim();
    const address = addressInput.value.trim();

    if (!name || !mobile || !address) {
        alert("Please fill all fields");
        return;
    }

    const studentData = {
        name,
        mobile,
        address
    };

    if (editIndex === -1) {
        students.push(studentData);
    } else {
        students[editIndex] = studentData;
        editIndex = -1;
        addBtn.textContent = "Add Student";
    }

    saveToLocalStorage();
    renderStudents();

    nameInput.value = "";
    mobileInput.value = "";
    addressInput.value = "";
});

function editStudent(index) {

    nameInput.value = students[index].name;
    mobileInput.value = students[index].mobile;
    addressInput.value = students[index].address;

    editIndex = index;

    addBtn.textContent = "Update Student";
}

function deleteStudent(index) {

    if (confirm("Delete this student?")) {

        students.splice(index, 1);

        saveToLocalStorage();
        renderStudents();
    }
}

renderStudents();