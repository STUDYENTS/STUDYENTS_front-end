document.getElementById('toggleButton').addEventListener('click', function () {
    var topic = document.querySelector('.topic');
    var button = document.getElementById('toggleButton');
    topic.classList.toggle('hidden');
    button.classList.toggle('hidden');
});

async function getDataModule(rawModule) {
    let res = await fetch('http://127.0.0.1:8000/lessons_for_module/' + rawModule.id + '/');
    const moduleLessons = await res.json();
    let res1={
        name: rawModule.title,
        lessons: moduleLessons
    }
    return (res1)
}

window.addEventListener('load', async function () {
    let res = await fetch('http://127.0.0.1:8000/courses/' + localStorage.getItem('course'));

    const curCourse = await res.json();

    res = await fetch('http://127.0.0.1:8000/modules_for_course/' + curCourse.id + '/');
    const courseModules = await res.json();


    let modulesArray = await Promise.all(courseModules.map(async (rawModule) => {
        return await getDataModule(rawModule);
    }));

    console.log("lessons", modulesArray);

    let data = {
        courseTitle: curCourse.title,
        courseId: curCourse.id,
        courseDesc: curCourse.course_description,
        modules: modulesArray
    };

    // Вставляем название курса и его описание в блок класса 'content'
    let content = document.querySelector('.content');
    content.querySelector('h1').textContent = data.courseTitle;
    content.querySelector('p').textContent = data.courseDesc;

    // Вставляем модули и уроки в блок класса 'container'
    let container = document.querySelector('.container');

    // Очищаем контейнер
    container.innerHTML = '';

    data.modules.forEach((module) => {
        // Создаем новый элемент 'container-item'
        let containerItem = document.createElement('div');
        containerItem.className = 'container-item';

        // Добавляем название модуля
        let h3 = document.createElement('h3');
        h3.textContent = module.name;
        containerItem.appendChild(h3);

        // Добавляем уроки
        module.lessons.forEach((lesson) => {
            let lessonBox = document.createElement('a');
            lessonBox.className = 'lesson-box';
            lessonBox.textContent = lesson.title;
            lessonBox.href = "course_menu.html";
            containerItem.appendChild(lessonBox);
        });

        // Добавляем 'container-item' в 'container'
        container.appendChild(containerItem);
    })
})

	