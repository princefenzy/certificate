const form = document.getElementById("certificateForm");
const message = document.getElementById("message");
const printButton = document.getElementById("printButton");

const SCHOOL_NAME = "TechEdu";
document.getElementById("schoolname").textContent = SCHOOL_NAME;
const students = {
    "STU001": {
        name: "Prince Fenzy",
        course: "Full Stack Development",
        date: "16-10-2026"
    },

    "STU002": {
        name: "itachi uchiha",
        course: "Web Development",
        date: "16-10-2026"
    }
};

const fullNameInput = document.getElementById("fullName");
const studentIdInput = document.getElementById("studentId");
const courseInput = document.getElementById("course");
const dateInput = document.getElementById("awardDate");
printButton.disabled = true;

let verifiedStudentId = null;

function formatDate(value) {
    if (!value) {
        return "Date Awarded";
    }

    return new Date(value + "T00:00:00").toLocaleDateString(
        "en-GB",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
}

function resetCertificate() {
    verifiedStudentId = null;
    printButton.disabled = true;

    fullNameInput.value = "";
    courseInput.value = "";
    dateInput.value = "";

    document.getElementById("certName").textContent =
        "Student Name";

    document.getElementById("certId").textContent =
        "STUDENT ID";

    document.getElementById("certCourse").textContent =
        "Course / Class";

    document.getElementById("certDate").textContent =
        "Date Awarded";
}

function showError(text) {
    message.textContent = text;
    message.style.color = "red";
    resetCertificate();
}form.addEventListener("submit", function (event) {
    event.preventDefault();

    const enteredId = studentIdInput.value.trim().toUpperCase();
        resetCertificate();

    const student = students[enteredId];

    if (!student) {
        message.textContent =
            "Invalid Student ID. Certificate not generated.";

        message.style.color = "red";
        return;
    }    fullNameInput.value = student.name;
    courseInput.value = student.course;
    const enteredDate = dateInput.value;
    document.getElementById("certName").textContent =
        student.name;

    document.getElementById("certId").textContent =
        enteredId;

    document.getElementById("certCourse").textContent =
        student.course;

    document.getElementById("certDate").textContent =
        formatDate(enteredDate);
    verifiedStudentId = enteredId;

    printButton.disabled = false;

    message.textContent =
        "Student verified successfully. You can now print your certificate.";

    message.style.color = "green";

    document.getElementById("certificate").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});printButton.addEventListener("click", function () {
    const currentId = studentIdInput.value.trim().toUpperCase();

    if (
        !verifiedStudentId ||
        currentId !== verifiedStudentId ||
        !students[currentId]
    ) {
        showError("Please verify a valid Student ID first.");
        return;
    }    const student = students[currentId];

    document.getElementById("certName").textContent =
        student.name;

    document.getElementById("certId").textContent =
        currentId;

    document.getElementById("certCourse").textContent =
        student.course;

    document.getElementById("certDate").textContent =
        formatDate(dateInput.value);

    window.print();
});
studentIdInput.addEventListener("input", function () {
    resetCertificate();
    message.textContent = "";
});