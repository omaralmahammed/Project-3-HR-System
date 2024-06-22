document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card-container");
  const searchInput = document.getElementById("search-input");
  let allData = [];

  function fetchCardData() {
    fetch("employee.json")
      .then((response) => response.json())
      .then((data) => {
        allData = data;
        buildCards(data);
      });
  }

  function createCard(data) {
    return `
      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div class="single_advisor_profile wow fadeInUp">
          <div class="advisor_thumb">
            <img src="${data.imgSrc}" alt="">
            <div class="social-info">
              <a href="#"><i class="fa fa-facebook"></i></a>
              <a href="#"><i class="fa fa-twitter"></i></a>
              <a href="#"><i class="fa fa-linkedin"></i></a>
            </div>
          </div>
          <div class="single_advisor_details_info">
            <h6>${data.first_name}</h6>
            <p class="designation">${data.position}</p>
          </div>
        </div>
      </div>
    `;
  }

  function buildCards(data) {
    cardContainer.innerHTML = "";

    const managers = data.filter(item => item.position.toLowerCase().includes("manager"));
    const others = data.filter(item => !item.position.toLowerCase().includes("manager"));

    // إنشاء صفوف أفقية لعرض البطاقات
    if (managers.length > 0) {
      const managerRow = document.createElement('div');
      managerRow.classList.add('row', 'mb-4','justify-content-center');
      const managerTitle = document.createElement('h2');
      managerTitle.textContent = '';
      managerRow.appendChild(managerTitle);
      cardContainer.appendChild(managerRow);

      managers.forEach((item) => {
        const cardHTML = createCard(item);
        managerRow.innerHTML += cardHTML;
      });
    }

    if (others.length > 0) {
      const othersRow = document.createElement('div');
      othersRow.classList.add('row');
      const othersTitle = document.createElement('h3');
      othersTitle.textContent = ' ';
      othersRow.appendChild(othersTitle);
      cardContainer.appendChild(othersRow);

      others.forEach((item) => {
        const cardHTML = createCard(item);
        othersRow.innerHTML += cardHTML;
      });
    }
  }

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = allData.filter(
      (item) =>
        item.first_name.toLowerCase().includes(searchTerm) ||
        item.position.toLowerCase().includes(searchTerm)
    );
    buildCards(filteredData);
  });

  fetchCardData();
});
