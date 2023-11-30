var lessonLinks = document.querySelectorAll('.lesson-link');
var ListCoctails = document.getElementById('coctails')
var toggleButton = document.getElementById('toggle-button');
var lessonsBar = document.querySelector('.lessons-bar');
var mainContent = document.querySelector('.main-content');

for (var i = 0; i < lessonLinks.length; i++) {
    lessonLinks[i].addEventListener('click', function (e) {
        e.preventDefault();
        var videoUrl = this.getAttribute('data-video-url');
        var videoPlayer = document.querySelector('.video-player');
        videoPlayer.src = videoUrl;
        videoPlayer.play();
    });
}

toggleButton.addEventListener('click', function () {
    if (lessonsBar.classList.contains('collapsed')) {
        lessonsBar.classList.remove('collapsed');
        mainContent.classList.remove('expanded');
        toggleButton.textContent = 'Свернуть';
    } else {
        lessonsBar.classList.add('collapsed');
        mainContent.classList.add('expanded');
        toggleButton.textContent = 'Развернуть';
    }
});

toggleButton.addEventListener('click', function () {
    if (lessonsBar.style.display === "none") {
        lessonsBar.style.display = "block";
        mainContent.style.width = "80%";
        toggleButton.textContent = 'Свернуть';
    } else {
        lessonsBar.style.display = "none";
        mainContent.style.width = "100%";
        toggleButton.textContent = 'Развернуть';
    }
});

var lessonCheck = true;

toggleButton.addEventListener('click', async function () {
    if (lessonCheck === true) {
        lessonCheck=false;
        const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
        const ListCoctail = await res.json();
        console.log('12', ListCoctail.drinks)
        ListCoctail.drinks.map((item) => {
            var newListItem = document.createElement('li');
            var newListItemA = document.createElement('a');
            newListItemA.href = '#';
            newListItemA.textContent = item.strDrink;
            newListItem.appendChild(newListItemA);
            ListCoctails.appendChild(newListItem);

        })
    }


})