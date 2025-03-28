
const jobs = [
    { id: 1, title: "Junior Front-end Developer", field: "Front-end", salary: 800, location: "Baku" },
    { id: 2, title: "Back-end Developer", field: "Back-end", salary: 1200, location: "Ganja" },
    { id: 3, title: "Data Analyst", field: "Data Science", salary: 1000, location: "Baku" },
    { id: 4, title: "ML Engineer", field: "Machine Learning", salary: 1500, location: "Remote" },
    { id: 5, title: "QA Tester", field: "QA", salary: 900, location: "Sumqayit" },
    { id: 6, title: "DevOps Intern", field: "DevOps", salary: 700, location: "Baku" },
    { id: 7, title: "UI/UX Designer", field: "UI/UX", salary: 1100, location: "Baku" },
    { id: 8, title: "Cybersecurity Analyst", field: "Cybersecurity", salary: 1300, location: "Remote" },
    { id: 9, title: "Middle Front-end Developer", field: "Front-end", salary: 1500, location: "Remote" },
    { id: 10, title: "Senior Back-end Developer", field: "Back-end", salary: 2000, location: "Baku" },
    { id: 11, title: "QA Automation Engineer", field: "QA", salary: 1300, location: "Ganja" },{ id: 12, title: "AI Research Intern", field: "Machine Learning", salary: 900, location: "Remote" },
    { id: 13, title: "DevOps Specialist", field: "DevOps", salary: 1600, location: "Sumqayit" },
    { id: 14, title: "UI Designer", field: "UI/UX", salary: 950, location: "Baku" },
    { id: 15, title: "Cybersecurity Engineer", field: "Cybersecurity", salary: 1700, location: "Remote" },
    { id: 16, title: "Junior Data Scientist", field: "Data Science", salary: 1100, location: "Baku" },
    { id: 17, title: "Front-end Intern", field: "Front-end", salary: 500, location: "Baku" },
    { id: 18, title: "Back-end Intern", field: "Back-end", salary: 550, location: "Ganja" },
    { id: 19, title: "Machine Learning Specialist", field: "Machine Learning", salary: 1800, location: "Remote" },
    { id: 20, title: "Data Science Mentor", field: "Data Science", salary: 2000, location: "Remote" },
    { id: 21, title: "Lead QA Engineer", field: "QA", salary: 1600, location: "Sumqayit" },
    { id: 22, title: "UX Researcher", field: "UI/UX", salary: 1250, location: "Baku" },
    { id: 23, title: "DevOps Engineer", field: "DevOps", salary: 1900, location: "Baku" },
    { id: 24, title: "Cybersecurity Consultant", field: "Cybersecurity", salary: 2100, location: "Remote" },
    { id: 25, title: "React Developer", field: "Front-end", salary: 1700, location: "Remote" },
    { id: 26, title: "Node.js Developer", field: "Back-end", salary: 1600, location: "Ganja" },
    { id: 27, title: "Product Designer", field: "UI/UX", salary: 1400, location: "Remote" },
    { id: 28, title: "Senior QA Lead", field: "QA", salary: 1900, location: "Baku" },
    { id: 29, title: "AI Product Manager", field: "Machine Learning", salary: 2200, location: "Remote" },
    { id: 30, title: "Senior Data Scientist", field: "Data Science", salary: 2400, location: "Baku" }
];

//dyna,icallt add options to select
function addOptions() {
    const select = document.querySelector('#field');
    const addedFields = [];

    jobs.forEach(job => {
        if (!addedFields.includes(job.field)) {
            const option = document.createElement('option');
            option.value = job.field;
            option.innerHTML = job.field;
            select.add(option);
            addedFields.push(job.field);
        }
    });
}
addOptions();
//get input values
function getInputValues() {
    const selectedJob = document.querySelector('#field').value;
    const selectedGender = document.querySelector('input[name="radio"]:checked')?.value;
    const minSalary = document.querySelector('#min-salary').value;
    const maxSalary = document.querySelector('#max-salary').value;

    return { selectedJob, selectedGender, minSalary, maxSalary };
}
//filter by the inputs
function filterJobs() {
    const { selectedJob, minSalary, maxSalary } = getInputValues();
    const min = minSalary ? parseInt(minSalary) : 0;
    const max = maxSalary ? parseInt(maxSalary) : Infinity;

    const filteredJobs = jobs.filter(job => {
        return job.field === selectedJob && job.salary >= min && job.salary <= max;
    });

    displayJobs(filteredJobs, minSalary, maxSalary, selectedJob); // Pass values here
}

function displayJobs(filteredJobs, minSalary, maxSalary, selectedJob) {
    const announcementsSection = document.querySelector('#announcements');
    const announcementCards = announcementsSection.querySelector('.announcement-cards');
    announcementCards.innerHTML = ''; // Clear previous cards

    if (filteredJobs.length === 0) {
        const name = document.querySelector('#name').value;
        const surname = document.querySelector('#surname').value;
        const fullName = `${name} ${surname}`;
        const selectedGender = document.querySelector('input[name="radio"]:checked')?.value;
        if (selectedGender === "option2") {
            document.querySelector('.announcements-status').innerHTML = `Dear Mrs. ${fullName}, we have no jobs for you matching your criteria.`;
        } else {
            document.querySelector('.announcements-status').innerHTML = `Dear Mr. ${fullName}, we have no jobs for you matching your criteria.`;
        }
    } else {
        filteredJobs.forEach(job => {
            const card = document.createElement('div');
            card.classList.add('announcement-card');
            card.innerHTML = `
                <h4>Title: ${job.title}</h4>
                <h4>Field: ${job.field}</h4>
                <h4>Salary: ${job.salary}</h4>
            `;
            announcementCards.appendChild(card);
        });

        document.querySelector('.announcements-status').innerHTML = '';    
        generateAnnouncementStatus(filteredJobs, minSalary, maxSalary, selectedJob); // Use passed values here
    }

    announcementsSection.style.display = 'block';
}
function sendData(event) {
    event.preventDefault();

    const modal = document.querySelector('#modal');
    modal.style.display = 'block';

    setTimeout(() => {
        modal.style.display = 'none';
        filterJobs();
        document.querySelector('.jobAppForm').reset(); 
    }, 3000);
}

function generateAnnouncementStatus(filteredJobs, minSalary, maxSalary, selectedJob) {
    const announcementStatus = document.querySelector('.announcements-status');
    const name = document.querySelector('#name').value;
    const surname = document.querySelector('#surname').value;
    const fullName = `${name} ${surname}`;
    const selectedGender = document.querySelector('input[name="radio"]:checked')?.value;

    if (selectedGender === "option2") {
        announcementStatus.innerHTML = `Dear mrs. ${fullName}, here are ${filteredJobs.length} jobs for you with a salary between ${minSalary} and ${maxSalary} in the ${selectedJob} field.`;
    } else {
        announcementStatus.innerHTML = `Dear mr. ${fullName}, here are ${filteredJobs.length} jobs for you with a salary between ${minSalary} and ${maxSalary} in the ${selectedJob} field.`;
    }
}

document.querySelector('.jobAppForm').addEventListener('submit', sendData);


