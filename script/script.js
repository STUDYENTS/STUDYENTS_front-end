let item = data[0];
for (let i = 0; i < 20; i++) {
  data.push(item);
}

// Функция для создания HTML-кода для элемента данных
function createContentItem(data) {
  return `
    <div class="content-item">
      <div>
        <img src="${data.image}">
        <h3>${data.title}</h3>
      </div>
      <div>
        <p class="test">Кол-во уроков: ${data.lessons}</p>
        <p class="task">Кол-во тестов: ${data.tests}</p>
      </div>
      <div class="skill-main">
        <div class="skill-wrrap">
          <div class="skill-name"></div>
          <div class="skill-bar">
            <div class="skill-per" per="${data.skillPer}"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Добавление каждого элемента данных в блок `content`
var content = document.querySelector(".content");
data.forEach(function (item) {
  content.innerHTML += createContentItem(item);
});


// Обновление полос прогресса
function updateProgressBars() {
  var skillPers = document.querySelectorAll(".skill-per");
  skillPers.forEach(function (skillPer) {
    var per = parseFloat(skillPer.getAttribute("per"));

    var animatedValue = 0;
    var startTime = null;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = timestamp - startTime;
      var stepPercentage = progress / 1000; // Dividing by duration in milliseconds (1000ms = 1s)

      if (stepPercentage < 1) {
        animatedValue = per * stepPercentage;
        skillPer.style.width = Math.floor(animatedValue) + "%";
        skillPer.setAttribute("per", Math.floor(animatedValue) + "%");
        requestAnimationFrame(animate);
      } else {
        animatedValue = per;
        skillPer.style.width = Math.floor(animatedValue) + "%";
        skillPer.setAttribute("per", Math.floor(animatedValue) + "%");
      }
    }

    requestAnimationFrame(animate);
  });
}

// Вызовите эту функцию после добавления новых элементов
updateProgressBars();

document.getElementById('toggleButton').addEventListener('click', function() {
  var topic = document.querySelector('.topic');
  var button = document.getElementById('toggleButton');
  topic.classList.toggle('hidden');
  button.classList.toggle('hidden');
});

window.addEventListener('load', async function () {
        const res = await fetch('http://127.0.0.1:8000/courses/');
        const CoursesList = await res.json();
		const res = await fetch('http://127.0.0.1:8000/lessons/');
        const LessonsList = await res.json();
		const res = await fetch('http://127.0.0.1:8000/tests/');
        const TestsList = await res.json();
		let data = 
		  {
			title: null,
			image: 'image/curse_img.jpg',
			lessons: null,
			tests: null,
			skillPer: '49'
		  };
		
        CoursesList.map((item) => {
			data.title = item.title;
			data.lessons = 

        })
})