document.getElementById('toggleButton').addEventListener('click', function() {
    var topic = document.querySelector('.topic');
    var button = document.getElementById('toggleButton');
    topic.classList.toggle('hidden');
    button.classList.toggle('hidden');
});
