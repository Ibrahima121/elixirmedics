// =========================
// LOGIN & SIGNUP MODALS
// =========================

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");

const closeButtons = document.querySelectorAll(".close");

// Open Login
loginBtn.addEventListener("click", () => {
    loginModal.style.display = "block";
});

// Open Signup
signupBtn.addEventListener("click", () => {
    signupModal.style.display = "block";
});

// Close Buttons
closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        loginModal.style.display = "none";
        signupModal.style.display = "none";
        adminModal.style.display = "none";
        adminPanel.style.display = "none";
    });
});

// Close Outside Modal
window.addEventListener("click", (e) => {

    if (e.target === loginModal) {
        loginModal.style.display = "none";
    }

    if (e.target === signupModal) {
        signupModal.style.display = "none";
    }

    if (e.target === adminModal) {
        adminModal.style.display = "none";
    }

    if (e.target === adminPanel) {
        adminPanel.style.display = "none";
    }

});


// =========================
// RESOURCE TABS
// =========================

const tabs = document.querySelectorAll(".tab");
const resourceContent = document.querySelector(".resource-content");
const executiveGrid = document.querySelector(".executive-grid");

const adminBtn = document.getElementById("adminBtn");
const adminModal = document.getElementById("adminModal");
const adminPanel = document.getElementById("adminPanel");
const adminAccountForm = document.getElementById("adminAccountForm");
const adminModalTitle = document.getElementById("adminModalTitle");
const adminModalSubtitle = document.getElementById("adminModalSubtitle");
const adminEmailInput = document.getElementById("adminEmail");
const adminPasswordInput = document.getElementById("adminPassword");
const adminConfirmPasswordInput = document.getElementById("adminConfirmPassword");
const adminAccountSubmit = document.getElementById("adminAccountSubmit");
const adminToggleMode = document.getElementById("adminToggleMode");
const adminPanelTabs = document.querySelectorAll(".admin-tab");
const adminPanels = document.querySelectorAll(".admin-panel");
const adminLogoutBtn = document.getElementById("adminLogoutBtn");
const executiveCountEl = document.getElementById("executiveCount");
const resourceCountEl = document.getElementById("resourceCount");

const addExecutiveForm = document.getElementById("addExecutiveForm");
const uploadResourceForm = document.getElementById("uploadResourceForm");
const updatePhotoForm = document.getElementById("updatePhotoForm");
const manageExecutiveForm = document.getElementById("manageExecutiveForm");
const execImageFileInput = document.getElementById("execImageFile");
const resourceFileInput = document.getElementById("resourceFile");
const newExecutivePhotoFileInput = document.getElementById("newExecutivePhotoFile");
const manageExecutiveSelect = document.getElementById("manageExecutiveSelect");
const manageExecName = document.getElementById("manageExecName");
const manageExecRole = document.getElementById("manageExecRole");
const manageExecDescription = document.getElementById("manageExecDescription");
const manageExecPhotoFile = document.getElementById("manageExecPhotoFile");
const manageExecPhotoUrl = document.getElementById("manageExecPhotoUrl");
const deleteExecutiveBtn = document.getElementById("deleteExecutiveBtn");
const memberList = document.getElementById("memberList");
const feedbackList = document.getElementById("feedbackList");
const announcementForm = document.getElementById("announcementForm");
const announcementAdminList = document.getElementById("announcementAdminList");
const committeeForm = document.getElementById("committeeForm");
const committeeAdminList = document.getElementById("committeeAdminList");
const constitutionText = document.getElementById("constitutionText");
const saveConstitutionBtn = document.getElementById("saveConstitutionBtn");
const constitutionPreview = document.getElementById("constitutionPreview");
const signupForm = document.getElementById("signupForm");
const memberNameInput = document.getElementById("memberName");
const memberMatricInput = document.getElementById("memberMatric");
const memberEmailInput = document.getElementById("memberEmail");
const memberPhoneInput = document.getElementById("memberPhone");
const memberPasswordInput = document.getElementById("memberPassword");
const memberConfirmPasswordInput = document.getElementById("memberConfirmPassword");
const contactForm = document.getElementById("contactForm");
const contactNameInput = document.getElementById("contactName");
const contactEmailInput = document.getElementById("contactEmail");
const contactSubjectInput = document.getElementById("contactSubject");
const contactMessageInput = document.getElementById("contactMessage");

const storedExecutivesKey = "elixirExecutives";
const storedMembersKey = "elixirMembers";
const storedFeedbackKey = "elixirFeedback";
const storedAnnouncementsKey = "elixirAnnouncements";
const storedCommitteesKey = "elixirCommittees";
const storedConstitutionKey = "elixirConstitution";
const storedResourcesKey = "elixirResources";
const storedAdminKey = "elixirAdmin";

let isAdmin = false;
let activeSubject = "Anatomy";

const resourceData = {
    Anatomy: ["Lecture Notes", "Past Questions", "Recommended Textbooks"],
    Physiology: ["Lecture Notes", "Past Questions", "Recommended Textbooks"],
    Biochemistry: ["Lecture Notes", "Past Questions", "Recommended Textbooks"],
    Pharmacology: ["Lecture Notes", "Past Questions", "Recommended Textbooks"],
};

function getStoredAdmin() {
    try {
        return JSON.parse(localStorage.getItem(storedAdminKey)) || null;
    } catch {
        return null;
    }
}

function setStoredAdmin(account) {
    localStorage.setItem(storedAdminKey, JSON.stringify(account));
}

function adminExists() {
    return Boolean(getStoredAdmin());
}

function validAdmin(email, password) {
    const account = getStoredAdmin();
    return account && account.email === email && account.password === btoa(password);
}

function getStoredResources() {
    try {
        return JSON.parse(localStorage.getItem(storedResourcesKey)) || {};
    } catch {
        return {};
    }
}

function saveStoredResources(resources) {
    localStorage.setItem(storedResourcesKey, JSON.stringify(resources));
}

function getStoredExecutives() {
    try {
        return JSON.parse(localStorage.getItem(storedExecutivesKey)) || [];
    } catch {
        return [];
    }
}

function saveStoredExecutives(executives) {
    localStorage.setItem(storedExecutivesKey, JSON.stringify(executives));
}

function loadStoredResources() {
    const stored = getStoredResources();

    Object.keys(stored).forEach(subject => {
        if (!resourceData[subject]) {
            resourceData[subject] = [];
        }

        resourceData[subject] = resourceData[subject].concat(stored[subject]);
    });
}

function loadStoredExecutives() {
    let stored = getStoredExecutives();
    let changed = false;

    stored = stored.map(exec => {
        if (!exec.id) {
            exec.id = generateId();
            changed = true;
        }
        return exec;
    });

    if (changed) {
        saveStoredExecutives(stored);
    }

    stored.forEach(exec => createExecutiveCard(exec));
}

function generateId() {
    return `exec-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getExecutiveById(id) {
    return getStoredExecutives().find(exec => exec.id === id);
}

function deleteExecutiveFromStorage(id) {
    const stored = getStoredExecutives().filter(exec => exec.id !== id);
    saveStoredExecutives(stored);
}

function removeExecutiveCard(id) {
    const card = executiveGrid.querySelector(`.executive-card[data-id="${id}"]`);
    if (card) {
        card.remove();
    }
}

function updateResourceContent(subject) {
    activeSubject = subject;
    const items = resourceData[subject] || [];
    const listItems = items.map(item => {
        if (typeof item === "string") {
            return `<li>${item}</li>`;
        }

        if (item.type === "pdf") {
            return `<li><a href="${item.url}" download="${item.label}" target="_blank">${item.label}</a></li>`;
        }

        if (item.type === "link") {
            return `<li><a href="${item.url}" target="_blank">${item.label}</a></li>`;
        }

        return `<li>${item.label || "Resource"}</li>`;
    }).join("");

    resourceContent.innerHTML = `
        <h3>${subject} Resources</h3>
        <ul>${listItems}</ul>
    `;
}

function refreshExecutiveSelects() {
    const photoSelect = document.getElementById("executivePhotoSelect");
    const manageSelect = document.getElementById("manageExecutiveSelect");

    const cards = executiveGrid.querySelectorAll(".executive-card");

    if (photoSelect) {
        photoSelect.innerHTML = "";
    }

    if (manageSelect) {
        manageSelect.innerHTML = "";
    }

    cards.forEach(card => {
        const id = card.dataset.id;
        const roleText = card.querySelector("h3").innerText;

        if (photoSelect) {
            const option = document.createElement("option");
            option.value = id;
            option.innerText = roleText;
            photoSelect.appendChild(option);
        }

        if (manageSelect) {
            const option = document.createElement("option");
            option.value = id;
            option.innerText = roleText;
            manageSelect.appendChild(option);
        }
    });

    if (manageSelect && manageSelect.options.length > 0) {
        manageSelect.selectedIndex = 0;
        populateManageExecutiveForm(manageSelect.value);
    }
}

function updateSummary() {
    executiveCountEl.innerText = executiveGrid.querySelectorAll(".executive-card").length;
    const pdfCount = Object.values(resourceData).reduce((total, items) => {
        return total + items.filter(item => typeof item === "object" && item.type === "pdf").length;
    }, 0);
    resourceCountEl.innerText = pdfCount;
}

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

function createExecutiveCard({ id, name, role, imageUrl, description }) {
    const card = document.createElement("div");
    card.className = "executive-card";
    card.dataset.id = id || generateId();
    card.innerHTML = `
        <img src="${imageUrl || "images/user.png"}" alt="${role} profile placeholder">
        <h3>${role}</h3>
        <p>${name}</p>
        <p>${description || "Information Added By Admin"}</p>
    `;
    executiveGrid.appendChild(card);
    refreshExecutiveSelects();
    updateSummary();
}

function addExecutiveToStorage(executive) {
    const stored = getStoredExecutives();
    stored.push(executive);
    saveStoredExecutives(stored);
}

function updateExecutiveInStorage(id, newData) {
    const stored = getStoredExecutives();
    const updated = stored.map(exec => exec.id === id ? { ...exec, ...newData } : exec);
    saveStoredExecutives(updated);
}

function addResourceToStorage(subject, item) {
    const stored = getStoredResources();
    stored[subject] = stored[subject] || [];
    stored[subject].push(item);
    saveStoredResources(stored);
}

function getStoredMembers() {
    try {
        return JSON.parse(localStorage.getItem(storedMembersKey)) || [];
    } catch {
        return [];
    }
}

function saveStoredMembers(members) {
    localStorage.setItem(storedMembersKey, JSON.stringify(members));
}

function getStoredFeedback() {
    try {
        return JSON.parse(localStorage.getItem(storedFeedbackKey)) || [];
    } catch {
        return [];
    }
}

function saveStoredFeedback(feedback) {
    localStorage.setItem(storedFeedbackKey, JSON.stringify(feedback));
}

function getStoredAnnouncements() {
    try {
        return JSON.parse(localStorage.getItem(storedAnnouncementsKey)) || [];
    } catch {
        return [];
    }
}

function saveStoredAnnouncements(announcements) {
    localStorage.setItem(storedAnnouncementsKey, JSON.stringify(announcements));
}

function getStoredCommittees() {
    try {
        return JSON.parse(localStorage.getItem(storedCommitteesKey)) || [];
    } catch {
        return [];
    }
}

function saveStoredCommittees(committees) {
    localStorage.setItem(storedCommitteesKey, JSON.stringify(committees));
}

function getStoredConstitution() {
    return localStorage.getItem(storedConstitutionKey) || "";
}

function saveStoredConstitution(text) {
    localStorage.setItem(storedConstitutionKey, text);
}

function renderMemberList() {
    const members = getStoredMembers();
    if (!memberList) return;
    if (!members.length) {
        memberList.innerHTML = `<p class="empty-state">No members have registered yet.</p>`;
        return;
    }
    memberList.innerHTML = members.map(member => `
        <div class="admin-item">
            <div>
                <strong>${member.name}</strong>
                <p>${member.email} · ${member.phone} · ${member.matric}</p>
            </div>
            <button class="secondary-btn delete-member-btn" data-id="${member.id}">Remove</button>
        </div>
    `).join("");

    memberList.querySelectorAll(".delete-member-btn").forEach(button => {
        button.addEventListener("click", () => {
            const id = button.dataset.id;
            deleteMember(id);
        });
    });
}

function deleteMember(id) {
    const members = getStoredMembers().filter(member => member.id !== id);
    saveStoredMembers(members);
    renderMemberList();
}

function renderFeedbackList() {
    const feedback = getStoredFeedback();
    if (!feedbackList) return;
    if (!feedback.length) {
        feedbackList.innerHTML = `<p class="empty-state">No feedback submitted yet.</p>`;
        return;
    }
    feedbackList.innerHTML = feedback.map(entry => `
        <div class="admin-item">
            <div>
                <strong>${entry.name}</strong>
                <p>${entry.email} · ${entry.subject}</p>
                <p>${entry.message}</p>
            </div>
        </div>
    `).join("");
}

function renderAnnouncementList() {
    const announcements = getStoredAnnouncements();
    if (!announcementAdminList) return;
    if (!announcements.length) {
        announcementAdminList.innerHTML = `<p class="empty-state">No announcements yet.</p>`;
        return;
    }
    announcementAdminList.innerHTML = announcements.map(item => `
        <div class="admin-item">
            <h4>${item.title}</h4>
            <p>${item.body}</p>
            <small>${item.date}</small>
        </div>
    `).join("");
}

function renderCommitteeList() {
    const committees = getStoredCommittees();
    if (!committeeAdminList) return;
    if (!committees.length) {
        committeeAdminList.innerHTML = `<p class="empty-state">No committees configured yet.</p>`;
        return;
    }
    committeeAdminList.innerHTML = committees.map(item => `
        <div class="admin-item">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
        </div>
    `).join("");
}

function renderConstitutionPreview() {
    const constitution = getStoredConstitution();
    if (!constitutionPreview) return;
    if (!constitution.trim()) {
        constitutionPreview.innerHTML = `<p class="empty-state">No constitution has been saved yet.</p>`;
        return;
    }
    constitutionPreview.innerHTML = `<div class="admin-item"><pre>${constitution}</pre></div>`;
}

function refreshAllAdminLists() {
    renderMemberList();
    renderFeedbackList();
    renderAnnouncementList();
    renderCommitteeList();
    renderConstitutionPreview();
}

let adminMode = "login";

function setAdminMode(mode) {
    adminMode = mode;
    if (mode === "create") {
        adminModalTitle.innerText = "Create Admin Account";
        adminModalSubtitle.innerText = "Set an email and password to secure your dashboard.";
        adminConfirmPasswordInput.style.display = "block";
        adminAccountSubmit.innerText = "Create Account";
        adminToggleMode.innerText = "Already have an admin account? Log in";
    } else {
        adminModalTitle.innerText = "Admin Login";
        adminModalSubtitle.innerText = "Enter your admin credentials to manage executives and resources.";
        adminConfirmPasswordInput.style.display = "none";
        adminAccountSubmit.innerText = "Log In";
        adminToggleMode.innerText = "Create a new admin account";
    }
}

function renderAdminAccountForm() {
    if (adminExists()) {
        setAdminMode("login");
    } else {
        setAdminMode("create");
    }
}

adminToggleMode.addEventListener("click", () => {
    setAdminMode(adminMode === "login" ? "create" : "login");
});

adminBtn.addEventListener("click", () => {
    if (isAdmin) {
        adminPanel.style.display = "block";
        refreshExecutiveSelects();
        updateSummary();
        return;
    }
    renderAdminAccountForm();
    adminModal.style.display = "block";
});

adminAccountForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = adminEmailInput.value.trim();
    const password = adminPasswordInput.value.trim();
    const confirmPassword = adminConfirmPasswordInput.value.trim();

    if (!email || !password) {
        alert("Email and password are required.");
        return;
    }

    if (adminMode === "create") {
        if (!confirmPassword) {
            alert("Please confirm your password.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        setStoredAdmin({ email, password: btoa(password) });
        isAdmin = true;
        adminModal.style.display = "none";
        adminPanel.style.display = "block";
        adminBtn.textContent = "Admin Panel";
        adminAccountForm.reset();
        updateSummary();
        alert("Admin account created successfully.");
        return;
    }

    if (!validAdmin(email, password)) {
        alert("Invalid admin credentials.");
        return;
    }

    isAdmin = true;
    adminModal.style.display = "none";
    adminPanel.style.display = "block";
    adminBtn.textContent = "Admin Panel";
    adminAccountForm.reset();
    updateSummary();
    alert("Admin access granted.");
});

adminLogoutBtn.addEventListener("click", () => {
    isAdmin = false;
    adminPanel.style.display = "none";
    adminBtn.textContent = "Admin";
    alert("Admin logged out.");
});

const sidebarLinks = document.querySelectorAll(".sidebar-link");

function setActiveAdminPanel(panelId) {
    adminPanelTabs.forEach(btn => btn.classList.toggle("active", btn.dataset.panel === panelId));
    sidebarLinks.forEach(btn => btn.classList.toggle("active", btn.dataset.panel === panelId));
    adminPanels.forEach(panel => panel.classList.toggle("active", panel.id === panelId));
}

adminPanelTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        setActiveAdminPanel(tab.dataset.panel);
    });
});

sidebarLinks.forEach(link => {
    link.addEventListener("click", () => {
        setActiveAdminPanel(link.dataset.panel);
    });
});

addExecutiveForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("execName").value.trim();
    const role = document.getElementById("execRole").value.trim();
    const imageUrl = document.getElementById("execImage").value.trim();
    const description = document.getElementById("execDescription").value.trim();
    const imageFile = execImageFileInput.files[0];

    if (!name || !role) {
        alert("Enter executive name and role.");
        return;
    }

    let photoSource = imageUrl;
    if (imageFile) {
        photoSource = await readFileAsDataURL(imageFile);
    }

    const executive = { id: generateId(), name, role, imageUrl: photoSource, description };
    createExecutiveCard(executive);
    addExecutiveToStorage(executive);
    addExecutiveForm.reset();
    refreshExecutiveSelects();
    alert("Executive added successfully.");
});

function populateManageExecutiveForm(id) {
    const executive = getExecutiveById(id);
    if (!executive) return;
    manageExecName.value = executive.name || "";
    manageExecRole.value = executive.role || "";
    manageExecDescription.value = executive.description || "";
    manageExecPhotoUrl.value = executive.imageUrl || "";
}

if (manageExecutiveSelect) {
    manageExecutiveSelect.addEventListener("change", () => {
        populateManageExecutiveForm(manageExecutiveSelect.value);
    });
}

manageExecutiveForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const executiveId = manageExecutiveSelect.value;
    if (!executiveId) {
        alert("Select an executive to manage.");
        return;
    }

    const name = manageExecName.value.trim();
    const role = manageExecRole.value.trim();
    const description = manageExecDescription.value.trim();
    const photoUrl = manageExecPhotoUrl.value.trim();
    const photoFile = manageExecPhotoFile.files[0];

    if (!name || !role) {
        alert("Name and role are required.");
        return;
    }

    let newPhoto = photoUrl;
    if (photoFile) {
        newPhoto = await readFileAsDataURL(photoFile);
    }

    const exec = getExecutiveById(executiveId);
    if (!exec) {
        alert("Selected executive not found.");
        return;
    }

    updateExecutiveInStorage(executiveId, {
        name,
        role,
        description,
        imageUrl: newPhoto || exec.imageUrl,
    });

    const card = executiveGrid.querySelector(`.executive-card[data-id="${executiveId}"]`);
    if (card) {
        card.querySelector("h3").innerText = role;
        card.querySelector("p").innerText = name;
        card.querySelectorAll("p")[1].innerText = description || "Information Added By Admin";
        if (newPhoto) {
            card.querySelector("img").src = newPhoto;
        }
    }

    refreshExecutiveSelects();
    manageEmployeeReset();
    alert("Executive updated successfully.");
});

function manageEmployeeReset() {
    manageExecutiveForm.reset();
    if (manageExecutiveSelect && manageExecutiveSelect.options.length > 0) {
        manageExecutiveSelect.selectedIndex = 0;
        populateManageExecutiveForm(manageExecutiveSelect.value);
    }
}

if (deleteExecutiveBtn) {
    deleteExecutiveBtn.addEventListener("click", () => {
        const executiveId = manageExecutiveSelect.value;
        if (!executiveId) {
            alert("Select an executive to delete.");
            return;
        }

        if (!confirm("Delete this executive? This cannot be undone.")) {
            return;
        }

        deleteExecutiveFromStorage(executiveId);
        removeExecutiveCard(executiveId);
        refreshExecutiveSelects();
        updateSummary();
        manageEmployeeReset();
        alert("Executive deleted successfully.");
    });
}

uploadResourceForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const subject = document.getElementById("resourceSubject").value;
    const resourceName = document.getElementById("resourceName").value.trim();
    const pdfFile = resourceFileInput.files[0];

    if (!pdfFile && !resourceName) {
        alert("Upload a PDF or enter a resource name.");
        return;
    }

    let resourceItem;
    if (pdfFile) {
        const pdfUrl = await readFileAsDataURL(pdfFile);
        resourceItem = {
            type: "pdf",
            label: resourceName || pdfFile.name,
            url: pdfUrl,
        };
    } else {
        resourceItem = {
            type: "link",
            label: resourceName,
            url: resourceName,
        };
    }

    resourceData[subject] = resourceData[subject] || [];
    resourceData[subject].push(resourceItem);
    addResourceToStorage(subject, resourceItem);

    if (activeSubject === subject) {
        updateResourceContent(subject);
    }

    uploadResourceForm.reset();
    alert("Resource uploaded successfully.");
    updateSummary();
});

updatePhotoForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const selectedExecId = document.getElementById("executivePhotoSelect").value;
    const photoUrl = document.getElementById("newExecutivePhoto").value.trim();
    const photoFile = newExecutivePhotoFileInput.files[0];

    if (!selectedExecId) {
        alert("Choose an executive to update.");
        return;
    }

    if (!photoUrl && !photoFile) {
        alert("Upload a photo or enter a photo URL.");
        return;
    }

    let newPhoto = photoUrl;
    if (photoFile) {
        newPhoto = await readFileAsDataURL(photoFile);
    }

    const card = executiveGrid.querySelector(`.executive-card[data-id="${selectedExecId}"]`);

    if (card) {
        card.querySelector("img").src = newPhoto;
        updateExecutiveInStorage(selectedExecId, { imageUrl: newPhoto });
        updatePhotoForm.reset();
        alert("Executive photo updated successfully.");
    } else {
        alert("Executive not found.");
    }
});

if (announcementForm) {
    announcementForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("announcementTitle").value.trim();
        const body = document.getElementById("announcementBody").value.trim();

        if (!title || !body) {
            alert("Please provide both title and announcement details.");
            return;
        }

        const announcements = getStoredAnnouncements();
        announcements.unshift({
            id: `announcement-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            title,
            body,
            date: new Date().toLocaleString(),
        });
        saveStoredAnnouncements(announcements);
        refreshAllAdminLists();
        announcementForm.reset();
        alert("Announcement published.");
    });
}

if (committeeForm) {
    committeeForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("committeeName").value.trim();
        const description = document.getElementById("committeeDescription").value.trim();

        if (!name || !description) {
            alert("Please provide both committee name and description.");
            return;
        }

        const committees = getStoredCommittees();
        committees.unshift({
            id: `committee-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            name,
            description,
        });
        saveStoredCommittees(committees);
        refreshAllAdminLists();
        committeeForm.reset();
        alert("Committee saved.");
    });
}

if (saveConstitutionBtn) {
    saveConstitutionBtn.addEventListener("click", function () {
        const constitution = constitutionText.value.trim();
        if (!constitution) {
            alert("Constitution text cannot be empty.");
            return;
        }
        saveStoredConstitution(constitution);
        refreshAllAdminLists();
        alert("Constitution saved.");
    });
}

loadStoredResources();
loadStoredExecutives();
refreshExecutiveSelects();
updateSummary();
renderAdminAccountForm();
updateResourceContent(activeSubject);
refreshAllAdminLists();

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(btn => btn.classList.remove("active"));
        tab.classList.add("active");
        updateResourceContent(tab.innerText);
    });
});


// =========================
// MEMBER SIGNUP + CONTACT HANDLERS
// =========================

if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = memberNameInput.value.trim();
        const matric = memberMatricInput.value.trim();
        const email = memberEmailInput.value.trim();
        const phone = memberPhoneInput.value.trim();
        const password = memberPasswordInput.value.trim();
        const confirmPassword = memberConfirmPasswordInput.value.trim();

        if (!name || !matric || !email || !phone || !password || !confirmPassword) {
            alert("Please complete all registration fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const members = getStoredMembers();
        const existing = members.find(member => member.email.toLowerCase() === email.toLowerCase());
        if (existing) {
            alert("A member with that email already exists.");
            return;
        }

        members.push({
            id: `member-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            name,
            matric,
            email,
            phone,
            password: btoa(password),
        });
        saveStoredMembers(members);
        refreshAllAdminLists();
        signupForm.reset();
        signupModal.style.display = "none";
        alert("Registration successful. Your details are now available to admin.");
    });
}

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = contactNameInput.value.trim();
        const email = contactEmailInput.value.trim();
        const subject = contactSubjectInput.value.trim();
        const message = contactMessageInput.value.trim();

        if (!name || !email || !subject || !message) {
            alert("Please fill all contact fields.");
            return;
        }

        const feedback = getStoredFeedback();
        feedback.push({
            id: `feedback-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            name,
            email,
            subject,
            message,
            date: new Date().toLocaleString(),
        });
        saveStoredFeedback(feedback);
        refreshAllAdminLists();
        contactForm.reset();
        alert("Message sent successfully.");
    });
}


// =========================
// LOGIN FORM VALIDATION
// =========================

const loginForm = document.querySelector("#loginModal form");

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const email =
    loginForm.querySelector('input[type="email"]').value;

    const password =
    loginForm.querySelector('input[type="password"]').value;

    if(email === "" || password === ""){

        alert("Please enter email and password.");

        return;
    }

    alert("Login successful (Demo Mode)");

    loginModal.style.display = "none";

    loginForm.reset();

});


// =========================
// SCROLL ANIMATION
// =========================

const cards = document.querySelectorAll(
'.card, .executive-card, .committee-card, .announcement-card'
);

window.addEventListener('scroll', () => {

    cards.forEach(card => {

        const cardTop =
        card.getBoundingClientRect().top;

        if(cardTop < window.innerHeight - 100){

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }

    });

});


// =========================
// INITIAL ANIMATION STATE
// =========================

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "0.5s ease";

});